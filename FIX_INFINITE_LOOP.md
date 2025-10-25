# 🔧 Fix Infinite npm start Loop

## المشكلة:
```
> portfolio-backend-deploy@1.0.0 start
> cd backend && npm start
> portfolio-backend-deploy@1.0.0 start
> cd backend && npm start
==> Out of memory (used over 512Mi)
```

## السبب:
Root package.json يستدعي `cd backend && npm start` والذي يستدعي نفسه مرة أخرى

## الحل:

### **الحل 1: في Render Dashboard (الأفضل)**
```
Root Directory: backend
Build Command: npm install --production
Start Command: npm start
```

### **الحل 2: تحديث Root package.json**
```json
"start": "cd backend && node server.js"
```

## خطوات النشر:

### 1. **ادفع التغييرات:**
```bash
git add .
git commit -m "Fix infinite npm start loop"
git push origin main
```

### 2. **في Render Dashboard:**
```
Root Directory: backend
Build Command: npm install --production
Start Command: npm start
```

## النتيجة المتوقعة:
```
✅ npm install --production
✅ npm start
✅ Server running on port 10000
```

## ملاحظة:
الحل 1 أفضل لأنه يتجنب استخدام Root package.json تماماً.
