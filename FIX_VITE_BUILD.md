# 🔧 Fix Vite Build Error

## المشكلة:
```
sh: 1: vite: not found
==> Build failed 😞
```

## السبب:
Vite في `devDependencies` لكن Vercel يحتاجها في `dependencies`

## الحل المطبق:

### 1. **تحديث package.json:**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.30.1",
    "vite": "^5.0.8",
    "@vitejs/plugin-react": "^4.2.1"
  }
}
```

### 2. **إضافة vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

## خطوات النشر:

### 1. **ادفع التغييرات:**
```bash
git add .
git commit -m "Fix vite build error - move vite to dependencies"
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
✅ Build successful
✅ Deploy successful
```

## إذا استمرت المشكلة:

### جرب إعدادات Vercel:
```
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

## ملاحظة:
Vite يجب أن يكون في `dependencies` وليس `devDependencies` للنشر على Vercel.
