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
      return await Medicine.findById(id).lean();
    } else {
      const medicines = await readJsonDb();
      return medicines.find((m) => m.id === id) || null;
    }
  },

  async createMedicine(data) {
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
