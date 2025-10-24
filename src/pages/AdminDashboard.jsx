import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import AdminSidebar from '../components/AdminSidebar';
import DashboardOverview from '../components/DashboardOverview';
import PortfolioEditor from '../components/PortfolioEditor';
import ProjectsManager from '../components/ProjectsManager';
import SkillsManager from '../components/SkillsManager';
import TestimonialsManager from '../components/TestimonialsManager';
import ContactsManager from '../components/ContactsManager';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const admin = localStorage.getItem('adminData');
    
    if (!token || !admin) {
      navigate('/admin/login');
      return;
    }

    setAdminData(JSON.parse(admin));
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'portfolio':
        return <PortfolioEditor />;
      case 'projects':
        return <ProjectsManager />;
      case 'skills':
        return <SkillsManager />;
      case 'testimonials':
        return <TestimonialsManager />;
      case 'contacts':
        return <ContactsManager />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          adminData={adminData}
          onLogout={handleLogout}
        />
        
        <div className="flex-1 ml-64">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 capitalize">
                {activeTab === 'overview' ? 'Dashboard Overview' : 
                 activeTab === 'portfolio' ? 'Portfolio Settings' :
                 activeTab === 'projects' ? 'Projects Management' :
                 activeTab === 'skills' ? 'Skills Management' :
                 activeTab === 'testimonials' ? 'Testimonials Management' :
                 activeTab === 'contacts' ? 'Contact Messages' : 'Dashboard'}
              </h1>
              <p className="text-gray-600 mt-2">
                {activeTab === 'overview' ? 'Welcome to your portfolio admin dashboard' :
                 activeTab === 'portfolio' ? 'Manage your personal information and portfolio settings' :
                 activeTab === 'projects' ? 'Add, edit, and manage your projects' :
                 activeTab === 'skills' ? 'Manage your skills and technologies' :
                 activeTab === 'testimonials' ? 'Manage client testimonials' :
                 activeTab === 'contacts' ? 'View and manage contact form submissions' : ''}
              </p>
            </div>
            
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

