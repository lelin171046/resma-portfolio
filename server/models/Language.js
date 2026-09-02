import mongoose from 'mongoose';

const languageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  proficiency: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Language || mongoose.model('Language', languageSchema);