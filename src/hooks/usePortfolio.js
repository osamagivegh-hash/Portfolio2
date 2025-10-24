import { useState, useEffect } from 'react';
import apiService from '../services/api';

export const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await apiService.getPortfolio();
        setPortfolio(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch portfolio:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  return { portfolio, loading, error };
};

export const useProjects = (params = {}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await apiService.getProjects(params);
        setProjects(response.data.projects);
        setPagination(response.data.pagination);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [JSON.stringify(params)]);

  return { projects, loading, error, pagination };
};

export const useFeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeaturedProjects = async () => {
    try {
      setLoading(true);
      const response = await apiService.getFeaturedProjects();
      console.log('Featured projects response:', response);
      setProjects(response.data.projects || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch featured projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  return { projects, loading, error, refetch: fetchFeaturedProjects };
};

export const useSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await apiService.getSkillsByCategory();
        // Convert object format to array format for frontend
        const skillsData = response.data;
        if (Array.isArray(skillsData)) {
          setSkills(skillsData);
        } else {
          // Convert object to array format
          const skillsArray = Object.keys(skillsData).map(category => ({
            category,
            skills: skillsData[category]
          }));
          setSkills(skillsArray);
        }
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch skills:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { skills, loading, error };
};

export const useTestimonials = (params = {}) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await apiService.getTestimonials(params);
        setTestimonials(response.data.testimonials);
        setPagination(response.data.pagination);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch testimonials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [JSON.stringify(params)]);

  return { testimonials, loading, error, pagination };
};

export const useFeaturedTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeaturedTestimonials = async () => {
    try {
      setLoading(true);
      const response = await apiService.getFeaturedTestimonials();
      console.log('Featured testimonials response:', response);
      setTestimonials(response.data.testimonials || response.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch featured testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedTestimonials();
  }, []);

  return { testimonials, loading, error, refetch: fetchFeaturedTestimonials };
};

