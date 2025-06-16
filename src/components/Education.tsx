import { EDUCATION } from '@/lib/constants';
import { GraduationCap, ChevronRight, Calendar } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import './Education.css';

const Education = () => {
  return (
    <AnimatedSection 
      id="education" 
      className="education-section section-container"
      animation="animate-slide-left"
    >
      <div className="education-header">
        <h2 className="section-title">Education & Qualifications</h2>
        <span className="section-subtitle">My Academic Journey</span>
        <p className="education-description">
          "My educational journey has laid a strong foundation in Information Technology and honed the skills that drive my passion for building impactful software solutions."
        </p>
      </div>
      
      <div className="education-timeline">
        {EDUCATION.map((education, index) => (
          <div 
            key={education.institution} 
            className="timeline-item"
          >
            {/* Education card */}
            <div className="education-card">
              {/* Institution and duration */}
              <div className="education-card-header">
                <div className="education-institution-container">
                  {education.logo ? (
                    <div className="institution-logo-container">
                      <img 
                        src={education.logo} 
                        alt={`${education.institution} logo`}
                        className="institution-logo"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="education-icon-container">
                      <GraduationCap size={20} className="education-icon" />
                    </div>
                  )}
                  <div className="institution-info">
                    <h4 className="education-institution">{education.institution}</h4>
                    <div className="education-meta">
                      <span className="education-period" title="Duration">
                        <Calendar size={14} aria-hidden="true" />
                        {education.period}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Degree */}
              <h3 className="education-degree">
                {education.degree}
              </h3>
              
              {/* Description */}
              <div className="education-content">
                <p className="education-description">{education.description}</p>
                
                {/* Achievements */}
                <div className="education-achievements">
                  <h5 className="education-achievements-title">
                    Achievements
                    <span className="achievements-count">
                      {education.achievements.length}
                    </span>
                  </h5>
                  <ul className="education-achievements-list">
                    {education.achievements.map((achievement, i) => (
                      <li 
                        key={i} 
                        className="education-achievement-item"
                      >
                        <ChevronRight 
                          size={16} 
                          className="education-achievement-icon" 
                          aria-hidden="true"
                        />
                        <span className="education-achievement-text">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default Education;
