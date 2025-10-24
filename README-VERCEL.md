# 🚀 Quick Vercel Deployment

## خطوات سريعة:

### 1. **ادفع الكود:**
```bash
git add .
git commit -m "Add Vercel configuration for frontend deployment"
git push origin main
```

### 2. **في Vercel:**
1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط "New Project"
3. اختر repository الخاص بك
4. اضغط "Import"

### 3. **إعدادات Build:**
- **Framework**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 4. **Environment Variables:**
```
VITE_API_URL = https://your-render-backend-url.onrender.com/api
```

### 5. **Deploy:**
- اضغط "Deploy"
- انتظر حتى يكتمل النشر

## النتيجة:
```
Frontend: https://your-portfolio.vercel.app
Backend: https://your-backend.onrender.com
```

## ملاحظة:
تأكد من تحديث `VITE_API_URL` في Vercel Environment Variables ليشير إلى Render backend URL الخاص بك.
