import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'resma-portfolio/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto', fetch_format: 'auto' }]
  }
});

const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'resma-portfolio/resume',
    allowed_formats: ['pdf'],
    resource_type: 'raw'
  }
});

export const uploadImage = multer({ storage: imageStorage });
export const uploadPdf = multer({ storage: pdfStorage });
export { cloudinary };