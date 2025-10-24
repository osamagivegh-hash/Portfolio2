const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    // Get token from localStorage for authenticated requests
    const token = localStorage.getItem('adminToken');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Portfolio endpoints
  async getPortfolio() {
    return this.request('/portfolio');
  }

  async updatePortfolio(data) {
    return this.request('/portfolio', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async downloadCV() {
    return this.request('/portfolio/cv');
  }

  // Contact endpoints
  async submitContact(data) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getContacts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/contact${queryString ? `?${queryString}` : ''}`);
  }

  // Project endpoints
  async getProjects(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/projects${queryString ? `?${queryString}` : ''}`);
  }

  async getFeaturedProjects() {
    return this.request('/projects/featured');
  }

  async getProject(id) {
    return this.request(`/projects/${id}`);
  }

  async createProject(data) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProject(id, data) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Skills endpoints
  async getSkills(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/skills${queryString ? `?${queryString}` : ''}`);
  }

  async getSkillsByCategory() {
    return this.request('/skills/categories');
  }

  async createSkill(data) {
    return this.request('/skills', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSkill(id, data) {
    return this.request(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSkill(id) {
    return this.request(`/skills/${id}`, {
      method: 'DELETE',
    });
  }

  // Testimonial endpoints
  async getTestimonials(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/testimonials${queryString ? `?${queryString}` : ''}`);
  }

  async getFeaturedTestimonials() {
    return this.request('/testimonials/featured');
  }

  async getTestimonial(id) {
    return this.request(`/testimonials/${id}`);
  }

  async createTestimonial(data) {
    return this.request('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTestimonial(id, data) {
    return this.request(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTestimonial(id) {
    return this.request(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Admin endpoints
  async adminLogin(credentials) {
    return this.request('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getAdminProfile() {
    return this.request('/admin/profile');
  }

  async updateAdminProfile(data) {
    return this.request('/admin/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async changeAdminPassword(data) {
    return this.request('/admin/change-password', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getAdminStats() {
    return this.request('/admin/stats');
  }

  async getAllAdmins() {
    return this.request('/admin/admins');
  }

  async toggleAdminStatus(id, isActive) {
    return this.request(`/admin/admins/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ isActive }),
    });
  }

  async updateContactStatus(id, status) {
    return this.request(`/contact/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Upload endpoints
  async uploadProfileImage(file) {
    console.log('Uploading profile image:', file);
    const formData = new FormData();
    formData.append('profileImage', file);
    
    const token = localStorage.getItem('adminToken');
    console.log('Token:', token ? 'Present' : 'Missing');
    
    const response = await fetch(`${this.baseURL}/upload/profile-image`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: formData,
    });

    console.log('Upload response status:', response.status);
    const data = await response.json();
    console.log('Upload response data:', data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }
    return data;
  }

  async uploadProjectImage(file) {
    const formData = new FormData();
    formData.append('projectImage', file);
    
    const token = localStorage.getItem('adminToken');
    
    const response = await fetch(`${this.baseURL}/upload/project-image`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }
    return data;
  }

  async uploadTestimonialAvatar(file) {
    const formData = new FormData();
    formData.append('testimonialAvatar', file);
    
    const token = localStorage.getItem('adminToken');
    
    const response = await fetch(`${this.baseURL}/upload/testimonial-avatar`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }
    return data;
  }
}

export default new ApiService();
