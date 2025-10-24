import React, { useState } from "react";
import { usePortfolio, useFeaturedProjects, useSkills, useFeaturedTestimonials } from "./hooks/usePortfolio";
import apiService from "./services/api";

export default function PortfolioPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Fetch data from backend
  const { portfolio, loading: portfolioLoading } = usePortfolio();
  const { projects, loading: projectsLoading, refetch: refetchProjects } = useFeaturedProjects();
  const { skills, loading: skillsLoading } = useSkills();
  const { testimonials, loading: testimonialsLoading, refetch: refetchTestimonials } = useFeaturedTestimonials();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Basic frontend validation
    if (formData.name.trim().length < 2) {
      setSubmitMessage('Name must be at least 2 characters long.');
      setIsSubmitting(false);
      return;
    }
    
    if (formData.message.trim().length < 10) {
      setSubmitMessage('Message must be at least 10 characters long.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await apiService.submitContact(formData);
      setSubmitMessage(response.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      // Handle validation errors
      if (error.message.includes('Validation failed')) {
        setSubmitMessage('Please check your input and try again.');
      } else {
        setSubmitMessage('Failed to send message. Please try again later.');
      }
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadCV = async () => {
    try {
      const response = await apiService.downloadCV();
      // In a real app, you would trigger the actual file download
      window.open('/api/portfolio/cv/download', '_blank');
    } catch (error) {
      console.error('CV download error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 text-neutral-900 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-neutral-200 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">{portfolio?.name || 'Osama Md. Mousa'}</div>
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="hover:text-neutral-600 transition-colors">About</a>
            <a href="#projects" className="hover:text-neutral-600 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-neutral-600 transition-colors">Skills</a>
            <a href="#contact" className="hover:text-neutral-600 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{portfolio?.name || 'Osama Md. Mousa'}</span>
            </h1>
            <p className="text-2xl mb-6 text-neutral-600">{portfolio?.title || 'Full Stack Developer'}</p>
            <p className="text-lg mb-8 text-neutral-700 max-w-2xl">
              {portfolio?.about || 'I create beautiful, functional web applications that solve real-world problems. Passionate about clean code and user experience.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                View My Work
              </button>
              <button 
                onClick={handleDownloadCV}
                className="px-8 py-3 border-2 border-neutral-800 rounded-lg hover:bg-neutral-800 hover:text-white transition-all duration-300"
              >
                Download CV
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <img
                  src={portfolio?.profileImage ? 
                    (portfolio.profileImage.startsWith('http') ? 
                      portfolio.profileImage : 
                      `http://localhost:5000${portfolio.profileImage}`) : 
                    "https://via.placeholder.com/300x300/4F46E5/FFFFFF?text=OM"}
                  alt={portfolio?.name || "Osama Md. Mousa"}
                  className="w-72 h-72 rounded-full object-cover border-4 border-white shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">
                💻
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* About Me */}
      <section id="about" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-6 text-neutral-700 leading-relaxed">
                {portfolio?.about || 'I am a passionate full stack developer with over 3 years of experience in building scalable web applications. I specialize in modern JavaScript frameworks and have a strong background in both frontend and backend development.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{portfolio?.stats?.projectsCompleted || 50}+</div>
                  <div className="text-sm text-neutral-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{portfolio?.stats?.yearsExperience || 3}+</div>
                  <div className="text-sm text-neutral-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{portfolio?.stats?.clientSatisfaction || 100}%</div>
                  <div className="text-sm text-neutral-600">Client Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(portfolio?.features || [
                { icon: "🎯", title: "Problem Solving", description: "Creative solutions for complex challenges" },
                { icon: "⚡", title: "Fast Delivery", description: "Quick turnaround without compromising quality" },
                { icon: "🔧", title: "Maintenance", description: "Ongoing support and updates" },
                { icon: "📱", title: "Responsive", description: "Works perfectly on all devices" }
              ]).map((feature, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-neutral-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl font-bold">Featured Projects</h2>
            <button
              onClick={() => {
                refetchProjects();
                refetchTestimonials();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              🔄 Refresh
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsLoading ? (
              <div className="col-span-full text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-neutral-600">Loading projects...</p>
              </div>
            ) : projects && projects.length > 0 ? projects.map((project, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-6xl overflow-hidden">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl.startsWith('http') ? 
                        project.imageUrl : 
                        `http://localhost:5000${project.imageUrl}`}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{project.image}</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3">{project.title}</h3>
                  <p className="text-neutral-600 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.technologies || project.tech || []).map((tech, techIdx) => (
                      <span key={techIdx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => project.liveUrl && window.open(project.liveUrl, '_blank')}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Live Demo
                    </button>
                    <button 
                      onClick={() => project.githubUrl && window.open(project.githubUrl, '_blank')}
                      className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      GitHub
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Projects Yet</h3>
                <p className="text-gray-500">Projects will appear here once they're added through the admin dashboard.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillsLoading ? (
              <div className="col-span-full text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-neutral-600">Loading skills...</p>
              </div>
            ) : skills && skills.length > 0 ? skills.map((category, idx) => (
              <div key={idx} className="bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-4 text-center">{category.category}</h3>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIdx) => (
                    <div key={skillIdx} className="flex items-center justify-between">
                      <span className="text-neutral-700">{typeof skill === 'string' ? skill : skill.name}</span>
                      <div className="w-16 bg-neutral-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                          style={{width: `${typeof skill === 'object' ? skill.proficiency : 85 + Math.random() * 15}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🛠️</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Skills Yet</h3>
                <p className="text-gray-500">Skills will appear here once they're added through the admin dashboard.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">What Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonialsLoading ? (
              <div className="col-span-full text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-neutral-600">Loading testimonials...</p>
              </div>
            ) : testimonials && testimonials.length > 0 ? testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-4xl mb-4 text-center">
                  {testimonial.avatarUrl ? (
                    <img
                      src={testimonial.avatarUrl.startsWith('http') ? 
                        testimonial.avatarUrl : 
                        `http://localhost:5000${testimonial.avatarUrl}`}
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full mx-auto object-cover"
                    />
                  ) : (
                    <span>{testimonial.avatar}</span>
                  )}
                </div>
                <blockquote className="text-neutral-700 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-center">
                  <div className="font-semibold text-lg">{testimonial.author}</div>
                  <div className="text-sm text-neutral-600">{testimonial.role}</div>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Testimonials Yet</h3>
                <p className="text-gray-500">Testimonials will appear here once they're added through the admin dashboard.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's work together!</h3>
              <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    📧
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-neutral-600">{portfolio?.email || 'osama@example.com'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    📱
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-neutral-600">{portfolio?.phone || '+1 (555) 123-4567'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    📍
                  </div>
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className="text-neutral-600">{portfolio?.location || 'New York, NY'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitMessage && (
                  <div className={`p-4 rounded-lg ${submitMessage.includes('Thank you') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {submitMessage}
                  </div>
                )}
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4">{portfolio?.name || 'Osama Md. Mousa'}</div>
          <p className="text-neutral-400 mb-8">{portfolio?.title || 'Full Stack Developer'}</p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href={portfolio?.socialLinks?.linkedin || '#'} className="text-neutral-400 hover:text-white transition-colors">LinkedIn</a>
            <a href={portfolio?.socialLinks?.github || '#'} className="text-neutral-400 hover:text-white transition-colors">GitHub</a>
            <a href={portfolio?.socialLinks?.twitter || '#'} className="text-neutral-400 hover:text-white transition-colors">Twitter</a>
            <a href={`mailto:${portfolio?.email || 'osama@example.com'}`} className="text-neutral-400 hover:text-white transition-colors">Email</a>
          </div>
          <div className="border-t border-neutral-800 pt-8 text-neutral-400">
            <p>&copy; 2024 {portfolio?.name || 'Osama Md. Mousa'}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
