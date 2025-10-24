import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

export default function DashboardOverview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiService.getAdminStats();
        setStats(response.data);
      } catch (error) {
        setError('Failed to fetch dashboard statistics');
        console.error('Dashboard stats error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Contacts',
      value: stats?.contacts?.total || 0,
      icon: '📧',
      color: 'blue',
      description: 'Contact form submissions'
    },
    {
      title: 'New Messages',
      value: stats?.contacts?.new || 0,
      icon: '🆕',
      color: 'green',
      description: 'Unread messages'
    },
    {
      title: 'Total Projects',
      value: stats?.projects?.total || 0,
      icon: '💼',
      color: 'purple',
      description: 'Portfolio projects'
    },
    {
      title: 'Featured Projects',
      value: stats?.projects?.featured || 0,
      icon: '⭐',
      color: 'yellow',
      description: 'Featured on homepage'
    },
    {
      title: 'Skills',
      value: stats?.skills?.total || 0,
      icon: '🛠️',
      color: 'indigo',
      description: 'Technical skills'
    },
    {
      title: 'Testimonials',
      value: stats?.testimonials?.total || 0,
      icon: '💬',
      color: 'pink',
      description: 'Client testimonials'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to your Admin Dashboard</h2>
        <p className="text-gray-600">
          Manage your portfolio content, view contact messages, and update your information from this central location.
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">➕</div>
            <div className="text-sm font-medium text-gray-900">Add Project</div>
            <div className="text-xs text-gray-500">Create new project</div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">🛠️</div>
            <div className="text-sm font-medium text-gray-900">Add Skill</div>
            <div className="text-xs text-gray-500">Add new skill</div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">💬</div>
            <div className="text-sm font-medium text-gray-900">Add Testimonial</div>
            <div className="text-xs text-gray-500">Add client review</div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">👤</div>
            <div className="text-sm font-medium text-gray-900">Edit Profile</div>
            <div className="text-xs text-gray-500">Update portfolio info</div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
            Dashboard loaded successfully
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
            Statistics updated
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
            Ready to manage your portfolio
          </div>
        </div>
      </div>
    </div>
  );
}

