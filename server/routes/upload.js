import express from 'express';
import { protect } from '../middleware/auth.js';
import { uploadImage, uploadPdf, cloudinary } from '../config/cloudinary.js';

const router = express.Router();
router.use(protect);

router.post('/image', uploadImage.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ url: req.file.path, publicId: req.file.filename });
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed' });
  }
});

router.post('/resume', uploadPdf.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ url: req.file.path, publicId: req.file.filename });
  } catch (error) {
    res.status(500).json({ error: 'Resume upload failed' });
  }
});

router.delete('/image/:publicId', async (req, res) => {
  try {
    await cloudinary.uploader.destroy(req.params.publicId);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

router.delete('/resume/:publicId', async (req, res) => {
  try {
    await cloudinary.uploader.destroy(req.params.publicId, { resource_type: 'raw' });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;