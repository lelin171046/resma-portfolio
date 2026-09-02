import express from 'express';
import { body, param } from 'express-validator';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import Profile from '../models/Profile.js';
import Experience from '../models/Experience.js';
import Training from '../models/Training.js';
import Skill from '../models/Skill.js';
import Education from '../models/Education.js';
import Language from '../models/Language.js';
import Reference from '../models/Reference.js';
import SocialLink from '../models/SocialLink.js';
import ContactMessage from '../models/ContactMessage.js';

const router = express.Router();
router.use(protect);

router.get('/dashboard', async (req, res) => {
  try {
    const [profile, experience, training, skills, education, languages, references, socialLinks, messages] = await Promise.all([
      Profile.findOne(),
      Experience.find().sort({ order: 1 }),
      Training.find().sort({ order: 1 }),
      Skill.find().sort({ category: 1, order: 1 }),
      Education.find().sort({ order: 1 }),
      Language.find(),
      Reference.find().sort({ order: 1 }),
      SocialLink.find().sort({ order: 1 }),
      ContactMessage.find().sort({ createdAt: -1 }).limit(50)
    ]);
    res.json({ profile, experience, training, skills, education, languages, references, socialLinks, messages });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

router.put('/profile', [
  body('name').optional().trim().notEmpty(),
  body('title').optional().trim().notEmpty(),
  body('tagline').optional().trim(),
  body('aboutText').optional().trim()
], validate, async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({});
    
    const { name, title, tagline, aboutText, photoUrl, resumeUrl } = req.body;
    if (name) profile.name = name;
    if (title) profile.title = title;
    if (tagline !== undefined) profile.tagline = tagline;
    if (aboutText !== undefined) profile.aboutText = aboutText;
    if (photoUrl) profile.photoUrl = photoUrl;
    if (resumeUrl) {
      profile.resumeUrl = resumeUrl;
      profile.resumeUpdatedAt = new Date();
    }
    profile.updatedAt = new Date();
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

router.post('/experience', [
  body('title').trim().notEmpty(),
  body('organization').trim().notEmpty(),
  body('startDate').trim().notEmpty()
], validate, async (req, res) => {
  try {
    const maxOrder = await Experience.findOne().sort({ order: -1 }).select('order');
    const order = (maxOrder?.order ?? -1) + 1;
    const experience = await Experience.create({ ...req.body, order });
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create experience' });
  }
});

router.put('/experience/:id', [
  param('id').isMongoId()
], validate, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!experience) return res.status(404).json({ error: 'Not found' });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update experience' });
  }
});

router.delete('/experience/:id', [param('id').isMongoId()], validate, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete experience' });
  }
});

router.post('/training', [
  body('title').trim().notEmpty(),
  body('duration').trim().notEmpty()
], validate, async (req, res) => {
  try {
    const maxOrder = await Training.findOne().sort({ order: -1 }).select('order');
    const order = (maxOrder?.order ?? -1) + 1;
    const training = await Training.create({ ...req.body, order });
    res.status(201).json(training);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create training' });
  }
});

router.put('/training/:id', [param('id').isMongoId()], validate, async (req, res) => {
  try {
    const training = await Training.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!training) return res.status(404).json({ error: 'Not found' });
    res.json(training);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update training' });
  }
});

router.delete('/training/:id', [param('id').isMongoId()], validate, async (req, res) => {
  try {
    await Training.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete training' });
  }
});

router.post('/skills', [
  body('name').trim().notEmpty(),
  body('category').isIn(['clinical', 'it'])
], validate, async (req, res) => {
  try {
    const maxOrder = await Skill.findOne({ category: req.body.category }).sort({ order: -1 }).select('order');
    const order = (maxOrder?.order ?? -1) + 1;
    const skill = await Skill.create({ ...req.body, order });
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create skill' });
  }
});

router.put('/skills/:id', [param('id').isMongoId()], validate, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!skill) return res.status(404).json({ error: 'Not found' });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update skill' });
  }
});

router.delete('/skills/:id', [param('id').isMongoId()], validate, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete skill' });
  }
});

router.post('/education', [
  body('degree').trim().notEmpty(),
  body('institution').trim().notEmpty(),
  body('year').trim().notEmpty()
], validate, async (req, res) => {
  try {
    const maxOrder = await Education.findOne().sort({ order: -1 }).select('order');
    const order = (maxOrder?.order ?? -1) + 1;
    const education = await Education.create({ ...req.body, order });
    res.status(201).json(education);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create education' });
  }
});

router.put('/education/:id', [param('id').isMongoId()], validate, async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!education) return res.status(404).json({ error: 'Not found' });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update education' });
  }
});

router.delete('/education/:id', [param('id').isMongoId()], validate, async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete education' });
  }
});

router.post('/languages', [
  body('name').trim().notEmpty(),
  body('proficiency').trim().notEmpty()
], validate, async (req, res) => {
  try {
    const language = await Language.create(req.body);
    res.status(201).json(language);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create language' });
  }
});

router.put('/languages/:id', [param('id').isMongoId()], validate, async (req, res) => {
  try {
    const language = await Language.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!language) return res.status(404).json({ error: 'Not found' });
    res.json(language);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update language' });
  }
});

router.delete('/languages/:id', [param('id').isMongoId()], validate, async (req, res) => {
  try {
    await Language.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete language' });
  }
});

router.post('/references', [
  body('name').trim().notEmpty(),
  body('title').trim().notEmpty(),
  body('institution').trim().notEmpty()
], validate, async (req, res) => {
  try {
    const maxOrder = await Reference.findOne().sort({ order: -1 }).select('order');
    const order = (maxOrder?.order ?? -1) + 1;
    const reference = await Reference.create({ ...req.body, order });
    res.status(201).json(reference);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reference' });
  }
});

router.put('/references/:id', [param('id').isMongoId()], validate, async (req, res) => {
  try {
    const reference = await Reference.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!reference) return res.status(404).json({ error: 'Not found' });
    res.json(reference);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update reference' });
  }
});

router.delete('/references/:id', [param('id').isMongoId()], validate, async (req, res) => {
  try {
    await Reference.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete reference' });
  }
});

router.post('/social-links', [
  body('platform').trim().notEmpty(),
  body('url').trim().notEmpty(),
  body('icon').trim().notEmpty()
], validate, async (req, res) => {
  try {
    const maxOrder = await SocialLink.findOne().sort({ order: -1 }).select('order');
    const order = (maxOrder?.order ?? -1) + 1;
    const link = await SocialLink.create({ ...req.body, order });
    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create social link' });
  }
});

router.put('/social-links/:id', [param('id').isMongoId()], validate, async (req, res) => {
  try {
    const link = await SocialLink.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!link) return res.status(404).json({ error: 'Not found' });
    res.json(link);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update social link' });
  }
});

router.delete('/social-links/:id', [param('id').isMongoId()], validate, async (req, res) => {
  try {
    await SocialLink.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete social link' });
  }
});

router.get('/messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

router.put('/messages/:id/read', [param('id').isMongoId()], validate, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!message) return res.status(404).json({ error: 'Not found' });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update message' });
  }
});

router.delete('/messages/:id', [param('id').isMongoId()], validate, async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

router.put('/reorder/:collection', [
  param('collection').isIn(['experience', 'training', 'skills', 'education', 'references', 'socialLinks']),
  body('items').isArray()
], validate, async (req, res) => {
  try {
    const { collection, items } = req.body;
    const Model = {
      experience: Experience,
      training: Training,
      skills: Skill,
      education: Education,
      references: Reference,
      socialLinks: SocialLink
    }[collection];
    
    const bulkOps = items.map((item, index) => ({
      updateOne: { filter: { _id: item.id }, update: { order: index } }
    }));
    
    await Model.bulkWrite(bulkOps);
    res.json({ message: 'Reordered' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder' });
  }
});

export default router;