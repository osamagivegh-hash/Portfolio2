# 🎛️ Admin Dashboard - Portfolio Management System

A comprehensive admin dashboard for managing your portfolio website with full CRUD operations, authentication, and real-time updates.

## 🚀 Features

### 🔐 **Authentication & Security**
- **Secure Login System** with JWT tokens
- **Password Protection** with bcrypt hashing
- **Account Lockout** after failed attempts
- **Role-based Access** (Admin/Super Admin)
- **Session Management** with automatic logout

### 📊 **Dashboard Overview**
- **Real-time Statistics** - contacts, projects, skills, testimonials
- **Quick Actions** - fast access to common tasks
- **Activity Monitoring** - track recent changes
- **Visual Analytics** with charts and metrics

### 👤 **Portfolio Management**
- **Personal Information** - name, title, about, contact details
- **Statistics Display** - projects completed, experience, satisfaction
- **Social Media Links** - LinkedIn, GitHub, Twitter, Website
- **Feature Cards** - customizable service highlights
- **Profile Image** and CV management

### 💼 **Projects Management**
- **Add/Edit/Delete Projects** with full details
- **Technology Tags** - categorize by tech stack
- **Featured Projects** - highlight best work
- **Live & GitHub Links** - direct project access
- **Status Tracking** - completed, in-progress, planned
- **Category Organization** - web, mobile, desktop, other

### 🛠️ **Skills Management**
- **Categorized Skills** - Frontend, Backend, Database, Tools
- **Proficiency Levels** - visual progress bars
- **Custom Icons** - emoji or image support
- **Color Coding** - personalized skill colors
- **Drag & Drop** - reorder skills easily

### 💬 **Testimonials Management**
- **Client Reviews** - add/edit testimonials
- **Star Ratings** - 1-5 star system
- **Featured Testimonials** - highlight best reviews
- **Author Information** - name, role, company
- **Avatar Support** - emoji or image avatars

### 📧 **Contact Management**
- **Message Inbox** - view all contact form submissions
- **Status Tracking** - new, read, replied
- **Quick Reply** - direct email integration
- **Message Filtering** - by status or date
- **Contact Details** - name, email, timestamp

## 🛠️ Setup Instructions

### 1. **Backend Setup**
```bash
cd backend
npm install
cp env.example .env
# Edit .env with your database and email settings
```

### 2. **Create Admin User**
```bash
npm run create-admin
```
This creates a default admin user:
- **Username**: `admin`
- **Email**: `admin@portfolio.com`
- **Password**: `admin123`

⚠️ **Important**: Change the password after first login!

### 3. **Start Backend Server**
```bash
npm run dev
```

### 4. **Frontend Setup**
```bash
# In the main directory
npm install
npm run dev
```

### 5. **Access Admin Dashboard**
- Visit: `http://localhost:5173/admin/login`
- Login with the credentials above
- Start managing your portfolio!

## 📱 **Admin Dashboard Interface**

### **Navigation Sidebar**
- 📊 **Overview** - Dashboard statistics and quick actions
- 👤 **Portfolio** - Personal information and settings
- 💼 **Projects** - Project management and editing
- 🛠️ **Skills** - Skills and technologies management
- 💬 **Testimonials** - Client reviews and testimonials
- 📧 **Contacts** - Contact form messages and replies

### **Dashboard Overview**
- **Statistics Cards** - Total contacts, projects, skills, testimonials
- **Quick Actions** - One-click access to common tasks
- **Recent Activity** - Track changes and updates
- **System Status** - Monitor portfolio health

### **Portfolio Editor**
- **Basic Information** - Name, title, email, phone, location
- **About Section** - Detailed description and bio
- **Statistics** - Projects completed, years experience, satisfaction
- **Social Links** - All social media and website links
- **Features** - Customizable service highlights with icons

### **Projects Manager**
- **Project Cards** - Visual project display with status
- **Add/Edit Modal** - Comprehensive project form
- **Technology Tags** - Easy tech stack management
- **Featured Toggle** - Highlight best projects
- **Live Links** - Direct access to project demos

### **Skills Manager**
- **Category Organization** - Grouped by Frontend, Backend, etc.
- **Proficiency Bars** - Visual skill level indicators
- **Color Customization** - Personalize skill colors
- **Icon Support** - Emoji or image icons
- **Drag & Drop** - Reorder skills easily

### **Testimonials Manager**
- **Review Cards** - Beautiful testimonial display
- **Star Ratings** - 1-5 star rating system
- **Author Details** - Name, role, company information
- **Featured System** - Highlight best testimonials
- **Avatar Support** - Emoji or image avatars

### **Contacts Manager**
- **Message Inbox** - All contact form submissions
- **Status Management** - New, Read, Replied status
- **Quick Reply** - Direct email integration
- **Filtering** - Filter by status or date
- **Contact Details** - Full contact information

## 🔧 **API Endpoints**

### **Authentication**
- `POST /api/admin/login` - Admin login
- `GET /api/admin/profile` - Get admin profile
- `PUT /api/admin/profile` - Update admin profile
- `PUT /api/admin/change-password` - Change password

### **Dashboard**
- `GET /api/admin/stats` - Get dashboard statistics

### **Portfolio Management**
- `GET /api/portfolio` - Get portfolio data
- `PUT /api/portfolio` - Update portfolio (admin only)

### **Projects Management**
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

### **Skills Management**
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create skill (admin only)
- `PUT /api/skills/:id` - Update skill (admin only)
- `DELETE /api/skills/:id` - Delete skill (admin only)

### **Testimonials Management**
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create testimonial (admin only)
- `PUT /api/testimonials/:id` - Update testimonial (admin only)
- `DELETE /api/testimonials/:id` - Delete testimonial (admin only)

### **Contact Management**
- `GET /api/contact` - Get contact messages (admin only)
- `PUT /api/contact/:id/status` - Update message status (admin only)

## 🎨 **Customization**

### **Colors & Styling**
- **Tailwind CSS** - Easy color and style customization
- **Component-based** - Modular design for easy updates
- **Responsive Design** - Works on all devices
- **Dark Mode Ready** - Easy theme switching

### **Content Management**
- **Real-time Updates** - Changes reflect immediately
- **Image Upload** - Support for profile and project images
- **Rich Text** - Enhanced text editing capabilities
- **SEO Optimization** - Meta tags and descriptions

## 🔒 **Security Features**

### **Authentication**
- **JWT Tokens** - Secure session management
- **Password Hashing** - bcrypt with salt rounds
- **Account Lockout** - Protection against brute force
- **Session Timeout** - Automatic logout for security

### **Authorization**
- **Role-based Access** - Admin and Super Admin roles
- **Route Protection** - Secure admin-only endpoints
- **Input Validation** - Server-side validation
- **Rate Limiting** - Protection against abuse

### **Data Protection**
- **CORS Configuration** - Secure cross-origin requests
- **Helmet Security** - Security headers
- **Input Sanitization** - XSS protection
- **SQL Injection Protection** - Mongoose ODM security

## 📊 **Analytics & Monitoring**

### **Dashboard Metrics**
- **Contact Statistics** - Total and new messages
- **Project Analytics** - Featured and total projects
- **Skill Distribution** - Skills by category
- **Testimonial Stats** - Total and featured reviews

### **Activity Tracking**
- **Login History** - Track admin access
- **Content Changes** - Monitor updates
- **System Health** - Monitor API status
- **Error Logging** - Track and debug issues

## 🚀 **Deployment**

### **Production Setup**
1. **Environment Variables** - Configure production settings
2. **Database** - Set up production MongoDB
3. **Email Service** - Configure SMTP settings
4. **Security** - Update JWT secrets and passwords
5. **SSL Certificate** - Enable HTTPS
6. **Domain Configuration** - Set up custom domain

### **Recommended Hosting**
- **Backend**: Heroku, Vercel, DigitalOcean
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Database**: MongoDB Atlas, AWS DocumentDB
- **Email**: SendGrid, Mailgun, AWS SES

## 🆘 **Troubleshooting**

### **Common Issues**
1. **Login Problems** - Check credentials and database connection
2. **API Errors** - Verify backend server is running
3. **Permission Issues** - Check admin role and authentication
4. **Data Not Loading** - Verify database connection and models

### **Support**
- Check the console for error messages
- Verify all environment variables are set
- Ensure MongoDB is running and accessible
- Check network connectivity between frontend and backend

## 🎯 **Best Practices**

### **Security**
- Change default admin password immediately
- Use strong, unique passwords
- Enable HTTPS in production
- Regular security updates
- Monitor login attempts

### **Content Management**
- Regular backups of portfolio data
- Test changes in development first
- Keep content fresh and updated
- Optimize images for web
- Monitor contact form submissions

### **Performance**
- Optimize images and assets
- Use CDN for static files
- Monitor API response times
- Regular database maintenance
- Cache frequently accessed data

---

## 🎉 **You're All Set!**

Your admin dashboard is now ready to use! Start by:

1. **Login** to the admin panel
2. **Update your portfolio** information
3. **Add your projects** and skills
4. **Manage testimonials** and contacts
5. **Customize** the design and content

Happy portfolio managing! 🚀

