# Portfolio Backend Deployment on Render

## خطوات النشر على Render

### 1. إعداد قاعدة البيانات (MongoDB)

1. اذهب إلى [MongoDB Atlas](https://www.mongodb.com/atlas)
2. أنشئ cluster جديد
3. احصل على connection string
4. استبدل `<password>` بكلمة المرور
5. استبدل `<dbname>` بـ `portfolio`

### 2. إنشاء خدمة على Render

1. اذهب إلى [Render Dashboard](https://dashboard.render.com)
2. اضغط على "New +" ثم "Web Service"
3. اربط repository الخاص بك
4. املأ الإعدادات التالية:

#### Basic Settings:
- **Name**: `portfolio-backend`
- **Environment**: `Node`
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`

#### Environment Variables:
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=https://your-frontend-domain.onrender.com
```

### 3. إعداد قاعدة البيانات على Render (اختياري)

1. في Render Dashboard، اضغط "New +" ثم "PostgreSQL" أو "MongoDB"
2. اختر "Free" plan
3. احصل على connection string
4. استخدمه في متغير `MONGODB_URI`

### 4. إنشاء Admin User

بعد النشر، ستحتاج لإنشاء admin user:

```bash
# في Render Dashboard، اذهب إلى Shell
cd backend
npm run create-admin
```

أو يمكنك إنشاء admin user يدوياً من خلال API:

```bash
curl -X POST https://your-backend-url.onrender.com/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123",
    "name": "Admin User"
  }'
```

### 5. اختبار النشر

1. اذهب إلى URL الخاص بخدمتك
2. اختبر health check: `https://your-backend-url.onrender.com/api/health`
3. اختبر admin login: `https://your-backend-url.onrender.com/api/admin/login`

### 6. تحديث Frontend

تأكد من تحديث `baseURL` في frontend ليشير إلى URL الجديد:

```javascript
// في src/services/api.js
const baseURL = 'https://your-backend-url.onrender.com';
```

## ملاحظات مهمة:

1. **Free Plan Limitations**: 
   - الخدمة ستتوقف بعد 15 دقيقة من عدم الاستخدام
   - قد يستغرق التشغيل 30 ثانية عند الطلب الأول

2. **File Uploads**: 
   - الملفات المرفوعة ستختفي عند إعادة تشغيل الخدمة
   - استخدم خدمة تخزين خارجية مثل AWS S3 أو Cloudinary

3. **Environment Variables**:
   - تأكد من إعداد جميع المتغيرات المطلوبة
   - لا تشارك JWT_SECRET أو كلمات المرور

4. **CORS**: 
   - تأكد من تحديث FRONTEND_URL ليشير إلى domain الصحيح

## استكشاف الأخطاء:

### المشاكل الشائعة:

1. **Build Failed**: تأكد من أن جميع dependencies موجودة في package.json
2. **Database Connection Error**: تحقق من MONGODB_URI
3. **CORS Error**: تأكد من إعداد FRONTEND_URL بشكل صحيح
4. **Admin Login Failed**: تأكد من إنشاء admin user

### Logs:
- اذهب إلى Render Dashboard > Service > Logs لرؤية الأخطاء
