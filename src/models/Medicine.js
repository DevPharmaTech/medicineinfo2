import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true },
  genericName: { type: String },
  manufacturer: { type: String },
  description: { type: String },
  dosages: { type: [String], default: [] },
  sideEffects: { type: [String], default: [] },
  precautions: { type: String },
  imageUrl: { type: String }
}, {
  timestamps: true,
  toJSON: { virtuals: true, versionKey: false, transform: (doc, ret) => { ret.id = ret._id; delete ret._id; } },
  toObject: { virtuals: true, versionKey: false, transform: (doc, ret) => { ret.id = ret._id; delete ret._id; } }
});

// Normalize the ID field so JSON and MongoDB data have matching field structures (.id instead of only ._id)
export default mongoose.models.Medicine || mongoose.model("Medicine", MedicineSchema);
