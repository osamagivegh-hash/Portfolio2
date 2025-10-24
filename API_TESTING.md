# 🧪 API Testing Guide

## المسارات المتاحة:

### 1. **Root Endpoint:**
```
GET /
```
**Response:**
```json
{
  "status": "success",
  "message": "Portfolio API is running",
  "version": "1.0.0",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "endpoints": {
    "health": "/api/health",
    "portfolio": "/api/portfolio",
    "contact": "/api/contact",
    "projects": "/api/projects",
    "skills": "/api/skills",
    "testimonials": "/api/testimonials",
    "admin": "/api/admin",
    "upload": "/api/upload"
  }
}
```

### 2. **Health Check:**
```
GET /api/health
```

### 3. **Portfolio Data:**
```
GET /api/portfolio
```

### 4. **Contact Form:**
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, this is a test message."
}
```

### 5. **Projects:**
```
GET /api/projects
GET /api/projects/featured
```

### 6. **Skills:**
```
GET /api/skills
GET /api/skills/categories
```

### 7. **Testimonials:**
```
GET /api/testimonials
GET /api/testimonials/featured
```

### 8. **Admin Login:**
```
POST /api/admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

## اختبار API:

### 1. **اختبار المسار الجذر:**
```bash
curl https://your-render-url.onrender.com/
```

### 2. **اختبار Health Check:**
```bash
curl https://your-render-url.onrender.com/api/health
```

### 3. **اختبار Portfolio:**
```bash
curl https://your-render-url.onrender.com/api/portfolio
```

## إذا حصلت على "Route not found":

### 1. **تحقق من URL:**
- تأكد من أن URL صحيح
- تأكد من أن المسار يبدأ بـ `/api/`

### 2. **تحقق من Method:**
- GET للبيانات
- POST للإرسال

### 3. **تحقق من Headers:**
```json
{
  "Content-Type": "application/json"
}
```

## رسائل الخطأ المحسنة:

### 404 Error:
```json
{
  "status": "error",
  "message": "Route not found",
  "requestedPath": "/api/wrong-path",
  "method": "GET",
  "availableEndpoints": {
    "root": "GET /",
    "health": "GET /api/health",
    "portfolio": "GET /api/portfolio",
    "contact": "POST /api/contact",
    "projects": "GET /api/projects",
    "skills": "GET /api/skills",
    "testimonials": "GET /api/testimonials",
    "admin": "POST /api/admin/login",
    "upload": "POST /api/upload/*"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## ملاحظات:
- جميع المسارات تبدأ بـ `/api/`
- المسار الجذر `/` يعطي معلومات عن API
- رسائل الخطأ محسنة لتوضيح المسارات المتاحة
