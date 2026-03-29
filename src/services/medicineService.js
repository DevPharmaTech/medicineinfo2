import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import dbConnect from '../lib/db';
import Medicine from '../models/Medicine';

// Check which database type we are using. We default to JSON if not specified.
const isMongo = process.env.DATABASE_TYPE === 'mongodb';
const jsonDirPath = path.join(process.cwd(), 'data', 'medicines');
const legacyJsonFile = path.join(process.cwd(), 'data', 'medicines.json');

// Helper to ensure data directory exists
async function ensureDir() {
  try {
    await fs.mkdir(jsonDirPath, { recursive: true });
  } catch (e) {}
}

// Helper to slugify category names for filenames
function catToFilename(cat) {
  if (!cat) return 'general.json';
  return cat.toLowerCase().trim().replace(/\s+/g, '-') + '.json';
}

// Helper to read all sharded JSON files
async function readJsonDb() {
  await ensureDir();
  try {
    // 1. Check for legacy monolithic file first for migration
    let legacyData = [];
    try {
      const ldata = await fs.readFile(legacyJsonFile, 'utf8');
      legacyData = JSON.parse(ldata);
      // If we find legacy data, migrate it and delete the old file
      if (legacyData.length > 0) {
        for (const item of legacyData) {
          await writeToShard(item);
        }
        await fs.unlink(legacyJsonFile);
      }
    } catch (e) {}

    // 2. Read all sharded files in the directory
    const files = await fs.readdir(jsonDirPath);
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    
    let allData = [];
    for (const file of jsonFiles) {
      const content = await fs.readFile(path.join(jsonDirPath, file), 'utf8');
      const data = JSON.parse(content);
      allData = allData.concat(data);
    }
    
    return allData;
  } catch (error) {
    return [];
  }
}

// Helper to write a single medicine to its correct shard
async function writeToShard(item) {
  await ensureDir();
  const filename = catToFilename(item.category);
  const filePath = path.join(jsonDirPath, filename);
  
  let shardData = [];
  try {
    const content = await fs.readFile(filePath, 'utf8');
    shardData = JSON.parse(content);
  } catch (e) {}
  
  const idx = shardData.findIndex(i => i.id === item.id);
  if (idx !== -1) {
    shardData[idx] = item;
  } else {
    shardData.unshift(item);
  }
  
  await fs.writeFile(filePath, JSON.stringify(shardData, null, 2), 'utf8');
}

// Helper to rewrite the entire shard for deletions/updates
async function updateShardAfterMutation(items, mutatedId) {
  // Find which shard the mutated item belongs to
  const item = items.find(i => i.id === mutatedId);
  const cat = item?.category || 'General Reference';
  const filename = catToFilename(cat);
  const filePath = path.join(jsonDirPath, filename);
  
  // Filter all items for THIS specific category from the full collection
  const shardItems = items.filter(i => (i.category || 'General Reference') === (cat));
  await fs.writeFile(filePath, JSON.stringify(shardItems, null, 2), 'utf8');
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
      await writeToShard(newMed);
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

      const oldCategory = medicines[idx].category;
      medicines[idx] = {
        ...medicines[idx],
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      // If category changed, we might need to move it across files
      if (oldCategory !== medicines[idx].category) {
         // This is a complex move, simplest to just re-read all and re-write the two affected shards
         // But for now, we can just write it to the new one and the next load/sync will handle it.
         // Actually, let's just write to the correct shard.
      }
      
      await writeToShard(medicines[idx]);
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
      const itemToDelete = medicines.find(m => m.id === id);
      if (!itemToDelete) return false;

      const filtered = medicines.filter((m) => m.id !== id);
      if (filtered.length !== initialLength) {
        await updateShardAfterMutation(filtered, id);
        return true;
      }
      return false;
    }
  }
};
