import { EXPERIENCES } from '@/lib/constants';
import { ChevronRight, MapPin, Calendar } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { useState } from 'react';
import './Experience.css';

const Experience = () => {
  const [expandedAchievements, setExpandedAchievements] = useState<number | null>(null);

  return (
    <AnimatedSection 
      id="experience" 
      className="experience-section section-container"
      animation="animate-slide-right"
    >
      <div className="experience-header">
        <span className="section-subtitle" role="text">My Journey</span>
        <h2 className="section-title">Professional Experience</h2>
        <p className="experience-description">
        "I've grown professionally by working exclusively as a full stack developer with the MERN stack, gaining hands-on experience across both frontend and backend development."
        </p>
      </div>
      
      <div className="experience-timeline">
        {EXPERIENCES.map((experience, index) => {
          const isExpanded = expandedAchievements === index;
          
          return (
            <div 
              key={experience.company} 
              className={`timeline-item ${isExpanded ? 'expanded' : ''}`}
              tabIndex={0}
              role="article"
              aria-label={`${experience.title} at ${experience.company}`}
            >
              {/* Timeline dot */}
              <div className="timeline-dot" aria-hidden="true"></div>
              
              {/* Experience card */}
              <div 
                className="experience-card"
                onClick={() => setExpandedAchievements(isExpanded ? null : index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setExpandedAchievements(isExpanded ? null : index);
                  }
                }}
              >
                {/* Company and duration */}
                <div className="experience-card-header">
                  <div className="experience-company-container">
                    {experience.logo && (
                      <div className="company-logo-container">
                        <img 
                          src={experience.logo} 
                          alt={`${experience.company} logo`}
                          className="company-logo"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="company-info">
                      <h4 className="experience-company">{experience.company}</h4>
                      <div className="company-meta">
                        {experience.location && (
                          <span className="company-location" title="Location">
                            <MapPin size={14} aria-hidden="true" />
                            {experience.location}
                          </span>
                        )}
                        <span className="experience-period" title="Duration">
                          <Calendar size={14} aria-hidden="true" />
                          {experience.period}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Job title */}
                <h3 className="experience-title">{experience.title}</h3>
                
                {/* Description */}
                <p className="experience-description">{experience.description}</p>
                
                {/* Achievements */}
                <div className={`achievements-container ${isExpanded ? 'expanded' : ''}`}>
                  <h5 className="experience-achievements-title">
                    Key Achievements
                    <span className="achievements-count">
                      {experience.achievements.length}
                    </span>
                  </h5>
                  <ul 
                    className="experience-achievements-list"
                    role="list"
                  >
                    {experience.achievements.map((achievement, i) => (
                      <li 
                        key={i} 
                        className="experience-achievement-item"
                        style={{
                          transitionDelay: `${i * 50}ms`
                        }}
                      >
                        <ChevronRight 
                          size={16} 
                          className="experience-achievement-icon"
                          aria-hidden="true" 
                        />
                        <span className="experience-achievement-text">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AnimatedSection>
  );
};

export default Experience;
