import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import dbConnect from '../lib/db';
import Medicine from '../models/Medicine';

// Check which database type we are using. We default to JSON if not specified.
const isMongo = process.env.DATABASE_TYPE === 'mongodb';
const jsonFilePath = path.join(process.cwd(), 'data', 'medicines.json');

// Helper to read JSON
async function readJsonDb() {
  try {
    const data = await fs.readFile(jsonFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeJsonDb([]);
      return [];
    }
    throw error;
  }
}

// Helper to write JSON
async function writeJsonDb(data) {
  await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// Slug generator
function slugify(text) {
  if (!text) return '';
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-');    // Replace multiple - with single -
}

export const medicineService = {
  async getAllMedicines() {
    if (isMongo) {
      await dbConnect();
      return await Medicine.find({}).sort({ createdAt: -1 }).lean();
    } else {
      return await readJsonDb();
    }
  },

  async getMedicineById(id) {
    if (isMongo) {
      await dbConnect();
      try { return await Medicine.findById(id).lean(); } catch (e) { return null; }
    } else {
      const medicines = await readJsonDb();
      return medicines.find((m) => m.id === id) || null;
    }
  },

  async getMedicineBySlug(slugOrId) {
    if (isMongo) {
      await dbConnect();
      let med = await Medicine.findOne({ slug: slugOrId }).lean();
      if (!med) {
        // Fallback to ID loosely if no slug matched
        try { med = await Medicine.findById(slugOrId).lean(); } catch (e) {}
      }
      return med;
    } else {
      const medicines = await readJsonDb();
      let med = medicines.find((m) => m.slug === slugOrId);
      if (!med) med = medicines.find((m) => m.id === slugOrId) || null;
      return med;
    }
  },

  async createMedicine(data) {
    // Generate slug from name automatically
    if (data.name && !data.slug) {
      data.slug = slugify(data.name);
    }

    if (isMongo) {
      await dbConnect();
      const newMed = new Medicine(data);
      const saved = await newMed.save();
      return saved.toObject();
    } else {
      const medicines = await readJsonDb();
      const newMed = {
        ...data,
        id: uuidv4(),
        dosages: data.dosages || [],
        sideEffects: data.sideEffects || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      // Put at the start so newest is first
      medicines.unshift(newMed);
      await writeJsonDb(medicines);
      return newMed;
    }
  },

  async updateMedicine(id, data) {
    // Regenerate slug if name is updated
    if (data.name && !data.slug) {
      data.slug = slugify(data.name);
    }

    if (isMongo) {
      await dbConnect();
      const updated = await Medicine.findByIdAndUpdate(id, data, { new: true, runValidators: true });
      return updated ? updated.toObject() : null;
    } else {
      const medicines = await readJsonDb();
      const idx = medicines.findIndex((m) => m.id === id);
      if (idx === -1) return null;

      medicines[idx] = {
        ...medicines[idx],
        ...data,
        updatedAt: new Date().toISOString()
      };
      await writeJsonDb(medicines);
      return medicines[idx];
    }
  },

  async deleteMedicine(id) {
    if (isMongo) {
      await dbConnect();
      const result = await Medicine.findByIdAndDelete(id);
      return !!result;
    } else {
      const medicines = await readJsonDb();
      const initialLength = medicines.length;
      const filtered = medicines.filter((m) => m.id !== id);
      if (filtered.length !== initialLength) {
        await writeJsonDb(filtered);
        return true;
      }
      return false;
    }
  }
};
