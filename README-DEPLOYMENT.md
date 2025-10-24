# 🚀 Portfolio Backend Deployment Guide

## ⚠️ Important: Memory Issue Fix

This repository has been optimized for Render deployment to avoid memory issues.

## 📁 File Structure for Deployment

- `package.json` - **Backend deployment package** (minimal dependencies)
- `package-frontend.json` - Frontend package (for local development)
- `backend/` - Backend Node.js application
- `src/` - Frontend React application (not used in deployment)

## 🔧 Render Deployment Settings

### Required Settings:
- **Name**: `portfolio-backend`
- **Environment**: `Node`
- **Build Command**: `npm install --production`
- **Start Command**: `npm start`

### Environment Variables:
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=https://your-frontend-domain.onrender.com
```

## 🛠️ Local Development

### For Frontend Development:
```bash
# Rename package files
mv package.json package-backend.json
mv package-frontend.json package.json

# Install frontend dependencies
npm install

# Start frontend
npm run dev
```

### For Backend Development:
```bash
cd backend
npm install
npm run dev
```

## 🔄 Switching Between Frontend/Backend

### To work on Frontend:
```bash
mv package.json package-backend.json
mv package-frontend.json package.json
npm install
```

### To deploy Backend:
```bash
mv package.json package-frontend.json
mv package-backend.json package.json
git add .
git commit -m "Switch to backend deployment"
git push
```

## 📋 Deployment Checklist

- [ ] `package.json` contains only backend deployment config
- [ ] `package-frontend.json` contains frontend config
- [ ] Build Command: `cd backend && npm install --production`
- [ ] Start Command: `npm start`
- [ ] Environment variables set in Render
- [ ] MongoDB Atlas database configured

## 🚨 Troubleshooting

### Memory Issues:
- Ensure `package.json` only has backend deployment config
- Use `--production` flag in build command
- Don't install frontend dependencies

### Build Failures:
- Check that backend dependencies are in `backend/package.json`
- Verify MongoDB connection string
- Check environment variables

## 📞 Support

If you encounter issues:
1. Check Render logs
2. Verify environment variables
3. Test MongoDB connection
4. Check backend dependencies
