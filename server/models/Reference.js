import mongoose from 'mongoose';

const referenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  institution: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  isPublic: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Reference || mongoose.model('Reference', referenceSchema);