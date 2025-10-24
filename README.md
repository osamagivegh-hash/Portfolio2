# Portfolio Website - Full Stack Application

A modern, responsive portfolio website built with React frontend and Node.js backend, featuring an admin dashboard for content management.

## 🚀 Features

### Frontend
- **Modern React 18** with Vite for fast development
- **Responsive Design** with Tailwind CSS
- **Dynamic Content** fetched from backend API
- **Contact Form** with validation
- **Image Upload** for profile, projects, and testimonials
- **Admin Dashboard** for content management

### Backend
- **Node.js & Express** REST API
- **MongoDB** with Mongoose ODM
- **JWT Authentication** for admin access
- **File Upload** with Multer
- **Email Service** with Nodemailer
- **CORS & Security** with Helmet

### Admin Dashboard
- **Portfolio Management** - Edit personal information
- **Projects Management** - Add/edit/delete projects
- **Skills Management** - Organize skills by categories
- **Testimonials Management** - Manage client testimonials
- **Contact Messages** - View and manage contact form submissions
- **Image Upload** - Upload profile, project, and testimonial images

## 📁 Project Structure

```
Portfolio2/
├── src/                          # Frontend React app
│   ├── components/               # React components
│   │   ├── AdminSidebar.jsx
│   │   ├── DashboardOverview.jsx
│   │   ├── PortfolioEditor.jsx
│   │   ├── ProjectsManager.jsx
│   │   ├── SkillsManager.jsx
│   │   ├── TestimonialsManager.jsx
│   │   └── ContactsManager.jsx
│   ├── pages/                    # Page components
│   │   ├── AdminLogin.jsx
│   │   └── AdminDashboard.jsx
│   ├── hooks/                    # Custom React hooks
│   │   └── usePortfolio.js
│   ├── services/                 # API services
│   │   └── api.js
│   ├── Portfolio.jsx             # Main portfolio page
│   └── main.jsx                  # App entry point
├── backend/                      # Backend Node.js app
│   ├── config/                   # Configuration files
│   │   ├── database.js
│   │   └── upload.js
│   ├── middleware/               # Express middleware
│   │   └── auth.js
│   ├── models/                   # Mongoose models
│   │   ├── Admin.js
│   │   ├── Contact.js
│   │   ├── Portfolio.js
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   └── Testimonial.js
│   ├── routes/                   # API routes
│   │   ├── admin.js
│   │   ├── contact.js
│   │   ├── portfolio.js
│   │   ├── projects.js
│   │   ├── skills.js
│   │   ├── testimonials.js
│   │   └── upload.js
│   ├── scripts/                  # Utility scripts
│   │   ├── createAdmin.js
│   │   └── createProductionAdmin.js
│   ├── uploads/                  # Uploaded files
│   ├── server.js                 # Main server file
│   └── package.json
├── render.yaml                   # Render deployment config
├── DEPLOYMENT.md                 # Deployment guide
└── README.md                     # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/osamagivegh-hash/Portfolio2.git
cd Portfolio2
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup
```bash
cd .. # Go back to root directory
npm install
```

### 4. Create Admin User
```bash
cd backend
npm run create-admin
```

### 5. Start Development Servers

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
npm run dev
```

## 🌐 Access Points

- **Portfolio Website**: http://localhost:5173
- **Admin Dashboard**: http://localhost:5173/admin/login
- **API Health Check**: http://localhost:5000/api/health

## 🔐 Default Admin Credentials

- **Email**: admin@example.com
- **Password**: admin123

⚠️ **Important**: Change the default password after first login!

## 📱 API Endpoints

### Public Endpoints
- `GET /api/portfolio` - Get portfolio information
- `GET /api/projects/featured` - Get featured projects
- `GET /api/skills/categories` - Get skills by categories
- `GET /api/testimonials/featured` - Get featured testimonials
- `POST /api/contact` - Submit contact form

### Admin Endpoints (Requires Authentication)
- `POST /api/admin/login` - Admin login
- `PUT /api/portfolio` - Update portfolio
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/skills` - Create skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill
- `POST /api/testimonials` - Create testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial
- `GET /api/contact` - Get all contact messages
- `PUT /api/contact/:id/status` - Update message status

### Upload Endpoints (Requires Authentication)
- `POST /api/upload/profile-image` - Upload profile image
- `POST /api/upload/project-image` - Upload project image
- `POST /api/upload/testimonial-avatar` - Upload testimonial avatar

## 🚀 Deployment

### Deploy to Render

1. **Create MongoDB Atlas Database**
2. **Create Render Web Service**
3. **Set Environment Variables**
4. **Deploy and Create Admin User**

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## 🛡️ Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Rate limiting
- Input validation
- File upload restrictions
- Helmet security headers

## 📸 Image Upload

The application supports image uploads for:
- **Profile Images** - Personal photos
- **Project Images** - Project screenshots/demos
- **Testimonial Avatars** - Client photos

**Supported formats**: JPG, PNG, GIF, WebP
**Max file size**: 5MB

## 🔧 Technologies Used

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios (via custom API service)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Multer
- Nodemailer
- Helmet
- CORS

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Osama Md. Mousa**
- GitHub: [@osamagivegh-hash](https://github.com/osamagivegh-hash)
- LinkedIn: [Osama Alshaer](http://www.linkedin.com/in/osama-alshaer-b7059b382)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](https://github.com/osamagivegh-hash/Portfolio2/issues) page
2. Create a new issue if your problem isn't already reported
3. Contact the author via LinkedIn or email

---

⭐ **Star this repository if you found it helpful!**