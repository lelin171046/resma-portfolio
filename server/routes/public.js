import express from 'express';
import Profile from '../models/Profile.js';
import Experience from '../models/Experience.js';
import Training from '../models/Training.js';
import Skill from '../models/Skill.js';
import Education from '../models/Education.js';
import Language from '../models/Language.js';
import Reference from '../models/Reference.js';
import SocialLink from '../models/SocialLink.js';

const router = express.Router();

router.get('/profile', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

router.get('/experience', async (req, res) => {
  try {
    const experience = await Experience.find().sort({ order: 1, startDate: -1 });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch experience' });
  }
});

router.get('/training', async (req, res) => {
  try {
    const training = await Training.find().sort({ order: 1 });
    res.json(training);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch training' });
  }
});

router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

router.get('/education', async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1 });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch education' });
  }
});

router.get('/languages', async (req, res) => {
  try {
    const languages = await Language.find();
    res.json(languages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch languages' });
  }
});

router.get('/references', async (req, res) => {
  try {
    const references = await Reference.find().sort({ order: 1 });
    res.json(references);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch references' });
  }
});

router.get('/social-links', async (req, res) => {
  try {
    const links = await SocialLink.find().sort({ order: 1 });
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch social links' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const [profile, experience, training, skills, education, languages, references, socialLinks] = await Promise.all([
      Profile.findOne(),
      Experience.find().sort({ order: 1, startDate: -1 }),
      Training.find().sort({ order: 1 }),
      Skill.find().sort({ category: 1, order: 1 }),
      Education.find().sort({ order: 1 }),
      Language.find(),
      Reference.find().sort({ order: 1 }),
      SocialLink.find().sort({ order: 1 })
    ]);
    
    res.json({ profile, experience, training, skills, education, languages, references, socialLinks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

export default router;