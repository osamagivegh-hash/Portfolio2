# 🗄️ MongoDB Setup Guide

## المشكلة الحالية
```
❌ Database connection error: Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://"
```

## الحل: إعداد MongoDB Atlas

### 1. إنشاء MongoDB Atlas Account
1. اذهب إلى [MongoDB Atlas](https://www.mongodb.com/atlas)
2. أنشئ حساب جديد أو سجل الدخول
3. أنشئ cluster جديد (اختر Free tier)

### 2. إعداد Database Access
1. في MongoDB Atlas Dashboard
2. اذهب إلى "Database Access"
3. اضغط "Add New Database User"
4. اختر "Password" authentication
5. أنشئ username و password
6. اختر "Read and write to any database"
7. اضغط "Add User"

### 3. إعداد Network Access
1. اذهب إلى "Network Access"
2. اضغط "Add IP Address"
3. اختر "Allow access from anywhere" (0.0.0.0/0)
4. أو أضف IP address الخاص بـ Render

### 4. الحصول على Connection String
1. اذهب إلى "Clusters"
2. اضغط "Connect" على cluster الخاص بك
3. اختر "Connect your application"
4. اختر "Node.js" و version "4.1 or later"
5. انسخ connection string

### 5. تحديث Connection String
استبدل `<password>` بكلمة المرور التي أنشأتها:
```
mongodb+srv://username:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 6. إضافة Environment Variable في Render
1. اذهب إلى Render Dashboard
2. اختر service الخاص بك
3. اذهب إلى "Environment" tab
4. أضف متغير جديد:
   - **Key**: `MONGODB_URI`
   - **Value**: connection string الكامل

### 7. إعادة تشغيل الخدمة
1. في Render Dashboard
2. اضغط "Manual Deploy" أو "Redeploy"

## مثال على Connection String الصحيح:
```
mongodb+srv://admin:password123@cluster0.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
```

## استكشاف الأخطاء:

### إذا استمرت المشكلة:
1. تأكد من أن password لا يحتوي على رموز خاصة
2. تأكد من أن Network Access يسمح بـ 0.0.0.0/0
3. تأكد من أن Database User له صلاحيات Read/Write
4. تحقق من أن connection string صحيح

### اختبار الاتصال:
بعد إعداد MongoDB، يجب أن ترى:
```
🔗 Connecting to MongoDB...
URI format: MongoDB Atlas
📦 MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
```

## مساعدة إضافية:
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Connection String Guide](https://docs.mongodb.com/manual/reference/connection-string/)
