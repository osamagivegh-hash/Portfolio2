# 🔧 Fix Vercel Running Backend Instead of Frontend

## المشكلة:
```
ReferenceError: require is not defined in ES module scope
This file is being treated as an ES module because it has a '.js' file extension
```

## السبب:
Vercel يجد `server.js` (Backend) في Root ويحاول تشغيله بدلاً من Frontend

## الحل المطبق:

### 1. **حذف ملفات Backend:**
- ✅ `server.js` - Backend server
- ✅ `render.yaml` - Render deployment config
- ✅ `package-backend.json` - Backend package.json
- ✅ `config/` - Backend config
- ✅ `models/` - Backend models
- ✅ `routes/` - Backend routes
- ✅ `middleware/` - Backend middleware
- ✅ `uploads/` - Backend uploads

### 2. **تحديث vercel.json:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/admin/(.*)",
      "dest": "/index.html"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 3. **package.json للـ Frontend فقط:**
```json
{
  "name": "portfolio-frontend",
  "scripts": {
    "build": "vite build",
    "dev": "vite"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.30.1",
    "vite": "^5.0.8",
    "@vitejs/plugin-react": "^4.2.1",
    "tailwindcss": "^3.3.6",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16"
  }
}
```

## خطوات النشر:

### 1. **ادفع التغييرات:**
```bash
git add .
git commit -m "Remove backend files - frontend only for Vercel"
git push origin main
```

### 2. **في Vercel Dashboard:**
1. اذهب إلى مشروعك
2. اضغط "Redeploy" على آخر deployment
3. أو انتظر النشر التلقائي

## النتيجة المتوقعة:

```
✅ npm install
✅ vite build
✅ Static files generated
✅ Deploy successful
✅ Frontend running on Vercel
```

## إعدادات Vercel:

```
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Environment Variables:
  VITE_API_URL = https://portfolio2-eo2q.onrender.com/api
```

## ملاحظة:
الآن المشروع يحتوي على Frontend فقط، و Backend يعمل منفصل على Render.
