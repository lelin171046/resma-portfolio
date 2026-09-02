import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Profile from '../models/Profile.js';
import Experience from '../models/Experience.js';
import Training from '../models/Training.js';
import Skill from '../models/Skill.js';
import Education from '../models/Education.js';
import Language from '../models/Language.js';
import Reference from '../models/Reference.js';
import SocialLink from '../models/SocialLink.js';
import Admin from '../models/Admin.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Promise.all([
      Profile.deleteMany({}),
      Experience.deleteMany({}),
      Training.deleteMany({}),
      Skill.deleteMany({}),
      Education.deleteMany({}),
      Language.deleteMany({}),
      Reference.deleteMany({}),
      SocialLink.deleteMany({}),
      Admin.deleteMany({})
    ]);
    console.log('Cleared existing data');

    await Profile.create({
      name: 'Resma Sultana',
      title: 'Nursing Instructor',
      tagline: 'Compassionate and motivated BSc Nursing graduate with strong clinical training and hands-on internship experience, seeking to apply her knowledge as a Nursing Instructor to support student learning and maintain high standards in nursing education and patient care.',
      aboutText: 'I am a dedicated Nursing Instructor with a strong academic background and diverse clinical experience. My passion lies in educating the next generation of nurses while maintaining excellence in patient care standards.',
      photoUrl: '',
      resumeUrl: ''
    });
    console.log('Created profile');

    await Experience.create([
      {
        title: 'Nursing Instructor',
        organization: 'Dr. Hassan Chowdhury Nursing College',
        location: 'Rampura, Dhaka',
        startDate: 'April 2026',
        endDate: 'Present',
        current: true,
        description: 'Teaching nursing students theoretical and practical aspects of nursing care, supervising clinical rotations, and maintaining academic standards.',
        order: 0
      },
      {
        title: 'Nursing Internship',
        organization: 'Shaheed Suhrawardy Medical College Hospital',
        location: 'Dhaka',
        startDate: '2024',
        endDate: '2025',
        current: false,
        description: '6-month clinical internship covering ICU, CCU/NICU, Pediatric, Endocrinology, Cardiac Care, Dialysis, Emergency, Medicine, Surgery, OT, Gynae, Labour and Vaccination units.',
        order: 1
      },
      {
        title: 'Admission Coaching Instructor',
        organization: 'Cornea Admission Centre',
        location: 'Dhaka',
        startDate: '2021',
        endDate: '2023',
        current: false,
        description: 'Taught and mentored students preparing for nursing and medical college admission exams for 2 years.',
        order: 2
      },
      {
        title: 'Kids Spoken English Instructor',
        organization: 'Nirjhar Education',
        location: 'Dhaka',
        startDate: '2019',
        endDate: '2021',
        current: false,
        description: 'Taught spoken English to children for 2 years, focusing on communication skills and confidence building.',
        order: 3
      }
    ]);
    console.log('Created experience');

    await Training.create([
      { title: 'CPR (BLS & ACLS)', duration: '3 days', order: 0 },
      { title: 'RC Basic & First Aid', duration: '6 months', order: 1 },
      { title: 'Front Desk Management', duration: '1 month', order: 2 },
      { title: 'Basic Computer Course', duration: '6 months', order: 3 },
      { title: 'Database Management', duration: '3 months', order: 4 }
    ]);
    console.log('Created training');

    await Skill.create([
      { name: 'ICU', category: 'clinical', order: 0 },
      { name: 'CCU/NICU Nursing', category: 'clinical', order: 1 },
      { name: 'Pediatric Nursing', category: 'clinical', order: 2 },
      { name: 'Endocrinology Nursing', category: 'clinical', order: 3 },
      { name: 'Cardiac Care', category: 'clinical', order: 4 },
      { name: 'Dialysis', category: 'clinical', order: 5 },
      { name: 'Emergency Management', category: 'clinical', order: 6 },
      { name: 'Medicine Unit', category: 'clinical', order: 7 },
      { name: 'Surgery Unit', category: 'clinical', order: 8 },
      { name: 'OT Assessment', category: 'clinical', order: 9 },
      { name: 'Surgery Post-Operative', category: 'clinical', order: 10 },
      { name: 'Gynae Post-Operative', category: 'clinical', order: 11 },
      { name: 'Labour and Vaccination', category: 'clinical', order: 12 },
      { name: 'MS Word', category: 'it', order: 0 },
      { name: 'PowerPoint', category: 'it', order: 1 },
      { name: 'MS Excel', category: 'it', order: 2 },
      { name: 'Photoshop', category: 'it', order: 3 },
      { name: 'Illustrator', category: 'it', order: 4 },
      { name: 'Canva', category: 'it', order: 5 },
      { name: 'SQL', category: 'it', order: 6 }
    ]);
    console.log('Created skills');

    await Education.create([
      {
        degree: 'BSc in Nursing',
        institution: 'College of Nursing, Sher-E-Bangla Nagar, Dhaka-1207',
        year: '2025',
        result: 'PASS',
        order: 0
      },
      {
        degree: 'HSC',
        institution: 'Govt. Girls College, Khulna',
        year: '2019',
        result: 'GPA 5.00',
        order: 1
      },
      {
        degree: 'SSC',
        institution: 'Mahmudun Nabi High School, Beleswar',
        year: '2017',
        result: 'GPA 5.00',
        order: 2
      }
    ]);
    console.log('Created education');

    await Language.create([
      { name: 'English', proficiency: 'Fluent' },
      { name: 'Bengali', proficiency: 'Native' }
    ]);
    console.log('Created languages');

    await Reference.create([
      {
        name: 'Mst Shahelia Khatun',
        title: 'Principal',
        institution: 'College of Nursing, Sher-E-Bangla Nagar, Dhaka',
        phone: '01715381713',
        email: 'mshahelia@gmail.com',
        isPublic: true,
        order: 0
      },
      {
        name: 'Minoti Rani Saha',
        title: 'Lecturer',
        institution: 'College of Nursing, Sher-E-Bangla Nagar, Dhaka',
        phone: '01715-199480',
        email: 'minotiranisaha@gmail.com',
        isPublic: true,
        order: 1
      }
    ]);
    console.log('Created references');

    await SocialLink.create([
      { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin', order: 0 },
      { platform: 'Facebook', url: 'https://facebook.com', icon: 'facebook', order: 1 },
      { platform: 'Instagram', url: 'https://instagram.com', icon: 'instagram', order: 2 },
      { platform: 'WhatsApp', url: 'https://wa.me/8801839290152', icon: 'whatsapp', order: 3 }
    ]);
    console.log('Created social links');

    const hashedPassword = await bcrypt.hash('admin123', 12);
    await Admin.create({
      email: 'sultanaresma93@gmail.com',
      password: hashedPassword
    });
    console.log('Created admin user (email: sultanaresma93@gmail.com, password: admin123)');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();