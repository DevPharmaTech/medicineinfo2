import dbConnect from '../lib/db';
import Medicine from '../models/Medicine';

// Slug generator helper
function slugify(text) {
  if (!text) return '';
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-');    // Replace multiple - with single -
}

export const medicineService = {
  async getAllMedicines() {
    await dbConnect();
    return await Medicine.find({}).sort({ createdAt: -1 }).lean();
  },

  async getMedicineById(id) {
    await dbConnect();
    try { 
      return await Medicine.findById(id).lean(); 
    } catch (e) { 
      return null; 
    }
  },

  async getMedicineBySlug(slugOrId) {
    await dbConnect();
    let med = await Medicine.findOne({ slug: slugOrId }).lean();
    if (!med) {
      // Fallback to ID loosely if no slug matched
      try { 
        med = await Medicine.findById(slugOrId).lean(); 
      } catch (e) {}
    }
    return med;
  },

  async createMedicine(data) {
    if (data.name && !data.slug) {
      data.slug = slugify(data.name);
    }

    await dbConnect();
    // Use upsert on slug to avoid duplicate errors and allow updates via import
    const saved = await Medicine.findOneAndUpdate(
      { slug: data.slug },
      data,
      { 
        new: true, 
        upsert: true, 
        runValidators: true,
        setDefaultsOnInsert: true
      }
    );
    return saved.toObject();
  },

  async updateMedicine(id, data) {
    // Regenerate slug if name is updated
    if (data.name && !data.slug) {
      data.slug = slugify(data.name);
    }

    await dbConnect();
    const updated = await Medicine.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    return updated ? updated.toObject() : null;
  },

  async deleteMedicine(id) {
    await dbConnect();
    const result = await Medicine.findByIdAndDelete(id);
    return !!result;
  }
};
