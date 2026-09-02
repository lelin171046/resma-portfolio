import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Resma Sultana' },
  title: { type: String, required: true, default: 'Nursing Instructor' },
  tagline: { type: String, default: 'Compassionate and motivated BSc Nursing graduate with strong clinical training and hands-on internship experience, seeking to apply her knowledge as a Nursing Instructor to support student learning and maintain high standards in nursing education and patient care.' },
  aboutText: { type: String, default: '' },
  photoUrl: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  resumeUpdatedAt: { type: Date },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Profile || mongoose.model('Profile', profileSchema);