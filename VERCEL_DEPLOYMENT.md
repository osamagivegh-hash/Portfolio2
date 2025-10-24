# 🚀 Vercel Frontend Deployment Guide

## المتطلبات:
- ✅ Backend يعمل على Render
- ✅ Frontend جاهز للنشر
- ✅ حساب Vercel

## خطوات النشر:

### 1. **إعداد Vercel:**

#### أ) إنشاء حساب Vercel:
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل دخول بحساب GitHub
3. اضغط "New Project"

#### ب) ربط Repository:
1. اختر repository الخاص بك
2. اضغط "Import"

### 2. **إعدادات Build:**

#### Build Settings:
- **Framework Preset**: `Vite`
- **Root Directory**: `./` (root)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. **Environment Variables:**

#### في Vercel Dashboard:
1. اذهب إلى Project Settings
2. اضغط "Environment Variables"
3. أضف المتغيرات التالية:

```
VITE_API_URL = https://your-render-backend-url.onrender.com/api
```

**مثال:**
```
VITE_API_URL = https://portfolio-backend-abc123.onrender.com/api
```

### 4. **إعدادات Domain:**

#### Custom Domain (اختياري):
1. اذهب إلى "Domains" tab
2. أضف domain مخصص
3. اتبع تعليمات DNS

### 5. **Deploy:**

#### Automatic Deploy:
- Vercel سينشر تلقائياً عند push إلى main branch

#### Manual Deploy:
1. اضغط "Deploy" في Vercel Dashboard
2. أو استخدم Vercel CLI:
```bash
npm i -g vercel
vercel --prod
```

## ملفات الإعداد:

### 1. **package.json:**
```json
{
  "name": "portfolio-frontend",
  "scripts": {
    "build": "vite build",
    "dev": "vite"
  }
}
```

### 2. **vite.config.js:**
```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})
```



## اختبار النشر:

### 1. **فحص الصفحة الرئيسية:**
```
https://your-vercel-app.vercel.app/
```

### 2. **فحص Admin Dashboard:**
```
https://your-vercel-app.vercel.app/admin/login
```

### 3. **فحص API Connection:**
- افتح Developer Tools
- اذهب إلى Network tab
- تأكد من أن API calls تذهب إلى Render backend

## استكشاف الأخطاء:

### 1. **Build Failed:**
- تحقق من `package.json`
- تأكد من أن جميع dependencies مثبتة
- راجع Build Logs في Vercel

### 2. **API Connection Failed:**
- تحقق من `VITE_API_URL` في Environment Variables
- تأكد من أن Render backend يعمل
- تحقق من CORS settings في backend

### 3. **Routing Issues:**
- تأكد من `vercel.json` routes
- تحقق من React Router setup

## النتيجة المتوقعة:

### ✅ **Frontend URL:**
```
https://your-portfolio.vercel.app
```

### ✅ **Admin Dashboard:**
```
https://your-portfolio.vercel.app/admin/login
```

### ✅ **API Connection:**
- Frontend → Vercel
- API Calls → Render Backend
- Database → MongoDB Atlas

## ملاحظات مهمة:

1. **Environment Variables** يجب أن تبدأ بـ `VITE_`
2. **CORS** يجب أن يكون مُعد في backend للسماح بـ Vercel domain
3. **Build Command** يجب أن يكون `npm run build`
4. **Output Directory** يجب أن يكون `dist`

## تحديث Backend CORS:

في `server.js` على Render، تأكد من إضافة Vercel domain:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-portfolio.vercel.app'
];
```
