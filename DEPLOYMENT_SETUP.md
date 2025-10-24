# 🚀 Deployment Setup - Frontend & Backend

## الهيكل الحالي:

```
Portfolio2/
├── src/                    ← Frontend (Vercel)
├── backend/                ← Backend (Render)
│   ├── server.js
│   ├── package.json
│   └── ...
├── package.json            ← Frontend package.json
├── vercel.json             ← Vercel config
└── render.yaml             ← Render config
```

## النشر:

### **Frontend على Vercel:**
- **المجلد:** Root directory
- **الملفات:** `src/`, `package.json`, `vercel.json`
- **URL:** https://osamaportfolio.vercel.app

### **Backend على Render:**
- **المجلد:** `backend/`
- **الملفات:** `backend/server.js`, `backend/package.json`
- **URL:** https://portfolio2-eo2q.onrender.com

## خطوات النشر:

### 1. **ادفع التغييرات:**
```bash
git add .
git commit -m "Separate frontend and backend for deployment"
git push origin main
```

### 2. **Vercel (Frontend):**
- سينشر تلقائياً من Root directory
- Environment Variable: `VITE_API_URL = https://portfolio2-eo2q.onrender.com/api`

### 3. **Render (Backend):**
- سينشر تلقائياً من `backend/` directory
- Environment Variables: MongoDB, JWT_SECRET, FRONTEND_URL

## النتيجة:
- ✅ Frontend: https://osamaportfolio.vercel.app
- ✅ Backend: https://portfolio2-eo2q.onrender.com
- ✅ API Connection: Frontend ↔ Backend
