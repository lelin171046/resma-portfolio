# Resma Sultana — Nursing Instructor Portfolio

A modern, fully responsive portfolio website built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring a public site and a private admin panel for content management.

## Features

### Public Site
- **Hero Section** — Animated intro with profile photo, download/view resume buttons
- **About/Career Objective** — Professional summary and key highlights
- **Experience Timeline** — Professional history with timeline layout
- **Training & Certifications** — Cards display for certifications
- **Skills** — Clinical and IT skills with color-coded badges
- **Education** — Academic qualifications with results
- **Languages** — Language proficiencies
- **References** — Professional references with visibility toggle
- **Contact Form** — Functional contact form with email notifications
- **Social Links** — Dynamic social media links from database
- **Responsive Design** — Mobile-first, works on all devices
- **Animations** — Smooth scroll-triggered animations with Framer Motion
- **Dark/Light Mode** — Theme toggle with persistence

### Admin Panel (`/admin`)
- **JWT Authentication** — Secure login with httpOnly cookies
- **Dashboard** — Overview of all content sections
- **Profile Management** — Edit name, title, tagline, about text, photo, resume
- **Experience CRUD** — Add/edit/delete/reorder experience entries
- **Training CRUD** — Manage certifications
- **Skills CRUD** — Manage clinical and IT skills
- **Education CRUD** — Manage academic qualifications
- **Languages CRUD** — Manage language proficiencies
- **References CRUD** — Manage references with public/private toggle
- **Social Links CRUD** — Dynamic social media links
- **Messages** — View contact form submissions
- **Media Upload** — Direct Cloudinary integration for images and PDFs
- **Drag & Drop Reordering** — Reorder items in any section

## Tech Stack

- **Frontend:** React 18, Vite, React Router, Tailwind CSS, Framer Motion, React Icons, React Hot Toast, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Auth:** JWT with httpOnly cookies, bcryptjs
- **Media:** Cloudinary (multer-storage-cloudinary)
- **Email:** Nodemailer
- **Validation:** express-validator
- **Security:** helmet, cors, rate limiting

## Project Structure

```
resma-portfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   │   └── admin/      # Admin panel pages
│   │   ├── hooks/          # Custom hooks
│   │   ├── context/        # React contexts (Auth, Theme)
│   │   ├── utils/          # Utility functions (API)
│   │   ├── App.jsx         # Main app with routing
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Express backend
│   ├── config/             # Configuration (Cloudinary)
│   ├── middleware/         # Express middleware (auth, validation)
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── scripts/            # Utility scripts (seeding)
│   ├── index.js            # Entry point
│   └── package.json
├── .env.example            # Environment variables template
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account
- Email service (Gmail, SendGrid, etc.) for contact form notifications

### Installation

1. **Clone and install dependencies:**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # In server directory
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Configure `.env` (server):**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/resma-portfolio
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   CLIENT_URL=http://localhost:5173
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   # Email (for contact form)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   CONTACT_EMAIL=sultanaresma93@gmail.com
   ```

4. **Seed the database:**
   ```bash
   cd server
   npm run seed
   ```
   This creates the admin user (email: `sultanaresma93@gmail.com`, password: `admin123`) and populates all content with Resma's CV data.

5. **Start development servers:**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev
   
   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

6. **Open the app:**
   - Public site: http://localhost:5173
   - Admin panel: http://localhost:5173/admin/login

## Deployment

### Backend (Node.js/Express)
- Deploy to Render, Railway, Heroku, or any Node.js hosting
- Set environment variables in hosting platform
- Ensure MongoDB URI is accessible (use MongoDB Atlas for production)

### Frontend (React/Vite)
- Build: `npm run build` in client directory
- Deploy `dist` folder to Netlify, Vercel, or any static hosting
- Set `CLIENT_URL` in backend to your frontend domain
- Configure rewrite rules for SPA routing

### Cloudinary
- Create a Cloudinary account
- Add credentials to `.env`
- Images and PDFs will be uploaded to `resma-portfolio/images` and `resma-portfolio/resume` folders

## Default Admin Credentials
- **Email:** sultanaresma93@gmail.com
- **Password:** admin123

**Important:** Change the password after first login via the admin panel.

## Customization

### Colors
Edit `client/tailwind.config.js` to customize the color palette:
- Primary: Teal (`#0d9488`)
- Accent: Coral/Orange (`#ea580c`)

### Fonts
The project uses:
- **Display:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

Change in `client/index.html` and `tailwind.config.js`.

### Content
All content is managed through the admin panel. No code changes needed for content updates.

## API Endpoints

### Public
- `GET /api/public/all` — All public data
- `GET /api/public/profile` — Profile data
- `GET /api/public/experience` — Experience entries
- `GET /api/public/training` — Training entries
- `GET /api/public/skills` — Skills
- `GET /api/public/education` — Education
- `GET /api/public/languages` — Languages
- `GET /api/public/references` — References
- `GET /api/public/social-links` — Social links
- `POST /api/contact` — Submit contact form

### Admin (Protected)
- `GET /api/admin/dashboard` — All admin data
- `PUT /api/admin/profile` — Update profile
- `POST/PUT/DELETE /api/admin/experience` — Experience CRUD
- `POST/PUT/DELETE /api/admin/training` — Training CRUD
- `POST/PUT/DELETE /api/admin/skills` — Skills CRUD
- `POST/PUT/DELETE /api/admin/education` — Education CRUD
- `POST/PUT/DELETE /api/admin/languages` — Languages CRUD
- `POST/PUT/DELETE /api/admin/references` — References CRUD
- `POST/PUT/DELETE /api/admin/social-links` — Social Links CRUD
- `GET /api/admin/messages` — Get messages
- `PUT /api/admin/messages/:id/read` — Mark as read
- `DELETE /api/admin/messages/:id` — Delete message
- `PUT /api/admin/reorder/:collection` — Reorder items
- `POST /api/upload/image` — Upload image
- `POST /api/upload/resume` — Upload resume PDF

## Security Considerations
- JWT stored in httpOnly cookies (not localStorage)
- Passwords hashed with bcrypt (12 rounds)
- Rate limiting on auth endpoints
- Input validation with express-validator
- CORS configured for specific origin
- Helmet.js for security headers

## License
MIT License — feel free to use for your own portfolio!