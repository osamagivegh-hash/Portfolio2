# 🔧 استكشاف أخطاء الاتصال Frontend-Backend

## المشكلة: Frontend على Vercel لا يتصل مع Backend على Render

### **1. تحقق من Environment Variables:**

#### **في Vercel Dashboard:**
1. اذهب إلى **Project Settings**
2. اضغط **"Environment Variables"**
3. تأكد من وجود:
   ```
   VITE_API_URL = https://portfolio2-eo2q.onrender.com/api
   ```

#### **إذا لم يكن موجود:**
1. اضغط **"Add New"**
2. **Name:** `VITE_API_URL`
3. **Value:** `https://portfolio2-eo2q.onrender.com/api`
4. **Environment:** Production (و Preview)
5. اضغط **"Save"**

### **2. إعادة نشر Frontend:**

#### **بعد إضافة Environment Variable:**
1. اذهب إلى **"Deployments"**
2. اضغط **"Redeploy"** على آخر deployment
3. أو ادفع تغيير جديد:
   ```bash
   git add .
   git commit -m "Update CORS settings"
   git push origin main
   ```

### **3. تحقق من Backend:**

#### **اختبر Backend مباشرة:**
```bash
curl https://portfolio2-eo2q.onrender.com/api/health
```

#### **النتيجة المتوقعة:**
```json
{
  "status": "success",
  "message": "Portfolio API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### **4. تحقق من CORS:**

#### **في Render Dashboard:**
1. اذهب إلى backend service
2. **Environment Variables**
3. أضف:
   ```
   FRONTEND_URL = https://osamaportfolio.vercel.app
   ```

### **5. اختبار الاتصال:**

#### **في Frontend (Vercel):**
1. افتح **Developer Tools** (F12)
2. اذهب إلى **Console** tab
3. ابحث عن أخطاء مثل:
   ```
   CORS error
   Network error
   Failed to fetch
   ```

#### **في Network tab:**
1. اذهب إلى **Network** tab
2. أعد تحميل الصفحة
3. ابحث عن API calls
4. تحقق من Status Code:
   - ✅ **200** = نجح
   - ❌ **404** = مسار غير موجود
   - ❌ **500** = خطأ في server
   - ❌ **CORS error** = مشكلة CORS

### **6. حلول المشاكل الشائعة:**

#### **مشكلة 1: CORS Error**
```
Access to fetch at 'https://portfolio2-eo2q.onrender.com/api/portfolio' 
from origin 'https://osamaportfolio.vercel.app' has been blocked by CORS policy
```

**الحل:**
1. أضف Vercel URL في Backend CORS
2. أعد نشر Backend

#### **مشكلة 2: 404 Error**
```
GET https://portfolio2-eo2q.onrender.com/api/portfolio 404
```

**الحل:**
1. تأكد من أن Backend يعمل
2. اختبر API مباشرة

#### **مشكلة 3: Environment Variable لا يعمل**
```
API calls still go to localhost:5000
```

**الحل:**
1. تأكد من إعادة نشر Frontend
2. تأكد من أن Environment Variable صحيح

### **7. خطوات التشخيص:**

#### **الخطوة 1: اختبر Backend**
```bash
curl https://portfolio2-eo2q.onrender.com/api/health
```

#### **الخطوة 2: اختبر Frontend**
1. افتح Vercel URL
2. افتح Developer Tools
3. ابحث عن أخطاء

#### **الخطوة 3: اختبر API Connection**
1. في Console اكتب:
   ```javascript
   console.log(import.meta.env.VITE_API_URL)
   ```
2. يجب أن يظهر:
   ```
   https://portfolio2-eo2q.onrender.com/api
   ```

### **8. إذا استمرت المشكلة:**

#### **جرب هذا الحل:**
1. **احذف Environment Variable** من Vercel
2. **أضف Environment Variable جديد**
3. **أعد نشر Frontend**

#### **أو جرب:**
1. **أنشئ مشروع Vercel جديد**
2. **استخدم نفس الإعدادات**
3. **أضف Environment Variable**

### **9. النتيجة المتوقعة:**

#### **عندما يعمل كل شيء:**
- ✅ Frontend يعمل على Vercel
- ✅ Backend يعمل على Render
- ✅ API calls تنجح
- ✅ لا توجد أخطاء CORS
- ✅ البيانات تظهر في Frontend

### **10. روابط مفيدة:**

- **Frontend:** https://osamaportfolio.vercel.app
- **Backend:** https://portfolio2-eo2q.onrender.com
- **API Health:** https://portfolio2-eo2q.onrender.com/api/health
