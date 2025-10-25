# 🚀 Full Stack Portfolio - React + Express + Render

A complete full-stack portfolio application that combines a React frontend with an Express backend, designed for unified deployment on Render.

## 📁 Project Structure

```
/
├── backend/                 # Express.js Backend
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   ├── routes/             # API routes
│   ├── models/             # Database models
│   ├── middleware/         # Custom middleware
│   └── config/             # Configuration files
├── frontend/               # React Frontend
│   ├── src/                # React source code
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
├── package.json            # Root package.json for deployment
├── render.yaml             # Render deployment configuration
└── README.md               # This file
```

## ✨ Features

### Frontend (React + Vite + Tailwind)
- ⚡ **Vite** for fast development and building
- 🎨 **Tailwind CSS** for modern styling
- 🧭 **React Router** for client-side routing
- 📱 **Responsive design** for all devices
- 🔄 **Real-time API status** checking

### Backend (Express + Node.js)
- 🚀 **Express.js** server with security middleware
- 🔒 **JWT authentication** for admin routes
- 📊 **MongoDB** integration with Mongoose
- 📁 **File upload** support with Multer
- 🛡️ **CORS, Helmet, Rate Limiting** for security
- 📧 **Email service** for contact forms

### Deployment
- 🌐 **Unified deployment** on Render
- 📦 **Single repository** for frontend and backend
- 🔄 **Automatic builds** and deployments
- 🚀 **Production-ready** configuration

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm run install:all
   ```

2. **Build frontend:**
   ```bash
   cd frontend && npm run build
   ```

3. **Start backend:**
   ```bash
   cd backend && npm start
   ```

4. **Access the application:**
   - Frontend: http://localhost:5000
   - API: http://localhost:5000/api/test

### Development Mode

1. **Start backend in dev mode:**
   ```bash
   cd backend && npm run dev
   ```

2. **Start frontend in dev mode (separate terminal):**
   ```bash
   cd frontend && npm run dev
   ```

## 🌐 Deployment on Render

### 1. Repository Setup
- Push your code to GitHub
- Connect your repository to Render

### 2. Render Configuration
The `render.yaml` file is already configured:

```yaml
services:
  - type: web
    name: portfolio-fullstack
    env: node
    plan: free
    buildCommand: npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: MONGODB_URI
        value: your-mongodb-connection-string
      - key: JWT_SECRET
        generateValue: true
      - key: FRONTEND_URL
        value: https://your-app.onrender.com
```

### 3. Environment Variables
Set these in Render Dashboard:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret for JWT tokens (auto-generated)
- `FRONTEND_URL`: Your Render app URL

### 4. Deploy
- Render will automatically build and deploy
- Frontend will be served by the Express server
- No CORS issues in production

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/test` - Test API connection
- `GET /api/health` - Health check
- `GET /api/portfolio` - Get portfolio data
- `GET /api/projects` - Get projects
- `GET /api/skills` - Get skills
- `GET /api/testimonials` - Get testimonials
- `POST /api/contact` - Submit contact form

### Admin Endpoints (Protected)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/profile` - Get admin profile
- `PUT /api/admin/profile` - Update admin profile
- `POST /api/admin/change-password` - Change password
- `GET /api/admin/stats` - Get dashboard stats

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Multer** - File uploads
- **Nodemailer** - Email service

### Deployment
- **Render** - Cloud hosting platform
- **MongoDB Atlas** - Cloud database

## 📝 Scripts

### Root Package.json
- `npm start` - Start the application
- `npm run build` - Build frontend and prepare for deployment
- `npm run dev` - Start backend in development mode
- `npm run install:all` - Install all dependencies

### Backend Package.json
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build frontend
- `npm run create-admin` - Create default admin user

### Frontend Package.json
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔒 Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection
- **JWT Authentication** - Secure admin access
- **Input Validation** - Data sanitization
- **File Upload Security** - Type and size restrictions

## 📊 Environment Variables

### Required
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens

### Optional
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `FRONTEND_URL` - Frontend URL for CORS
- `EMAIL_HOST` - SMTP host for emails
- `EMAIL_PORT` - SMTP port
- `EMAIL_USER` - SMTP username
- `EMAIL_PASS` - SMTP password

## 🎯 Key Benefits

1. **Unified Deployment** - Single repository, single deployment
2. **No CORS Issues** - Frontend served by backend in production
3. **Cost Effective** - Single Render service instead of two
4. **Easy Maintenance** - All code in one place
5. **Production Ready** - Optimized for performance and security

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm run install:all`
3. Set up environment variables
4. Build frontend: `cd frontend && npm run build`
5. Start backend: `cd backend && npm start`
6. Visit http://localhost:5000

## 📞 Support

For issues and questions, please check the documentation or create an issue in the repository.

---

**Built with ❤️ for unified full-stack deployment**