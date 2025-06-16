import { PROJECTS } from '@/lib/constants';
import { ExternalLink, Github, Code } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import './Projects.css';

const Projects = () => {
  return (
    <AnimatedSection 
      id="projects" 
      className="projects-section section-container"
      animation="animate-fade-in"
    >
      <div className="projects-background"></div>
      
      <div className="projects-header">
        <span className="section-subtitle">Featured Work</span>
        <h2 className="section-title">My Projects</h2>
        <p className="projects-description">
          A showcase of my most significant projects and creative endeavors.
        </p>
      </div>
      
      <div className="projects-grid">
        {PROJECTS.map((project, index) => (
          <div 
            key={project.title}
            className="project-card"
            role="article"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                window.open(project.links[0].url, '_blank', 'noopener,noreferrer');
              }
            }}
          >
            {/* Project Image */}
            <div className="project-image-container">
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={`${project.title} preview`}
                  className="project-image"
                  loading="lazy"
                />
              ) : (
                <div className="project-image-placeholder">
                  <div className="project-image-placeholder-content">
                    <Code size={48} className="project-image-placeholder-icon" />
                  </div>
                </div>
              )}
              
              {/* Overlay on hover */}
              <div className="project-image-overlay">
                <div className="project-links">
                  {project.links.map((link, i) => {
                    const Icon = link.icon;
                    return (
                      <a 
                        key={i}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <Icon size={20} className="project-link-icon" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Project Info */}
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              {/* Technologies */}
              <div className="project-tech-container">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="project-tech-tag"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* More Projects Button */}
      <div className="projects-more-button-container">
        <a 
          href="https://github.com/Framework12" 
          target="_blank" 
          rel="noopener noreferrer"
          className="portfolio-button-outline projects-more-button"
        >
          <span>More Projects</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </AnimatedSection>
  );
};

export default Projects;
