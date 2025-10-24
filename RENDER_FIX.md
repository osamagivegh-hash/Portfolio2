# 🔧 Fix Render Deployment

## المشكلة:
```
npm error Missing script: "start"
```

## الحلول:

### **الحل 1: في Render Dashboard**
1. اذهب إلى Backend Service
2. **Settings** → **Build & Deploy**
3. **Build Command:** `cd backend && npm install --production`
4. **Start Command:** `cd backend && npm start`
5. **Root Directory:** `./`

### **الحل 2: استخدام package-backend.json**
1. **Build Command:** `npm install --production`
2. **Start Command:** `npm start`
3. **Root Directory:** `./`

### **الحل 3: استخدام Procfile**
1. **Build Command:** `npm install --production`
2. **Start Command:** `npm start`
3. **Root Directory:** `./`

## خطوات سريعة:

### 1. **في Render Dashboard:**
```
Build Command: cd backend && npm install --production
Start Command: cd backend && npm start
```

### 2. **أو:**
```
Build Command: npm install --production
Start Command: npm start
```

### 3. **اضغط "Save Changes"**

### 4. **اضغط "Manual Deploy"**

## النتيجة المتوقعة:
```
✅ cd backend && npm install --production
✅ cd backend && npm start
✅ Server running on port 10000
```
