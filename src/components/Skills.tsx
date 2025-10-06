
import { SKILLS } from '@/lib/constants';
import AnimatedSection from './AnimatedSection';
import SimpleScrollAnimation from './SimpleScrollAnimation';
import { SimpleParticles } from './ui/simple-particles';
import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import './Skills.css';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <AnimatedSection 
      id="skills" 
      className="skills-section section-container"
      animation="animate-fade-in"
    >
      <div className="skills-background"></div>
      
      {/* Interactive Particles for Skills Section */}
      <SimpleParticles
        className=""
        quantity={25}
        color="#10b981"
        size={2}
      />
      
      <SimpleScrollAnimation className="skills-header" delay={200}>
        <span className="skills-subtitle animate-slide-down">My Expertise</span>
        <h2 className="skills-title animate-slide-up delay-100">Skills & Technologies</h2>
        <p className="skills-description animate-fade-in delay-200">
          Here are the technologies and tools I've mastered throughout my journey as a software developer.
        </p>
      </SimpleScrollAnimation>
      
      <div className="skills-grid">
        {SKILLS.map((skill, index) => {
          const Icon = skill.icon;
          const isHovered = hoveredSkill === skill.category;
          
          return (
            <AnimatedSection
              key={skill.category}
              animation="animate-scale-in"
              delay={`delay-${index * 100}`}
              once={true}
              className="h-full"
            >
              <div 
                className="skill-card glass"
                style={{
                  backgroundColor: `${skill.color}30`,
                }}
                onMouseEnter={() => setHoveredSkill(skill.category)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Background decoration */}
                <div 
                  className="skill-decoration"
                  style={{ backgroundColor: skill.color }}
                ></div>
                
                <div className="skill-content">
                  {/* Header */}
                  <div className="skill-header">
                    <div 
                      className="skill-icon-container"
                      style={{ backgroundColor: skill.color }}
                    >
                      <Icon size={24} className="skill-icon" />
                    </div>
                    <h3 className="skill-category">{skill.category}</h3>
                  </div>
                  
                  {/* Skills List with Icons */}
                  <ul className="skill-list">
                    {skill.skills.map((item, skillIndex) => {
                      // Try to find an appropriate icon from Lucide
                      const skillNameLower = item.toLowerCase();
                      let SkillIcon;
                      
            
                      if (skillNameLower.includes('react')) {
                        SkillIcon = LucideIcons.Atom;
                      } else if (skillNameLower.includes('node')) {
                        SkillIcon = LucideIcons.Server;
                      } else if (skillNameLower.includes('javascript') || skillNameLower.includes('typescript')) {
                        SkillIcon = LucideIcons.FileCode;
                      } else if (skillNameLower.includes('html') || skillNameLower.includes('css')) {
                        SkillIcon = LucideIcons.Code;
                      } else if (skillNameLower.includes('mongo')) {
                        SkillIcon = LucideIcons.Database;
                      } else if (skillNameLower.includes('sql') || skillNameLower.includes('postgres')) {
                        SkillIcon = LucideIcons.Database;
                      } else if (skillNameLower.includes('docker')) {
                        SkillIcon = LucideIcons.Container;
                      } else if (skillNameLower.includes('git')) {
                        SkillIcon = LucideIcons.GitBranch;
                      } else if (skillNameLower.includes('python')) {
                        SkillIcon = LucideIcons.Terminal;
                      } else if (skillNameLower.includes('supabase')) {
                        SkillIcon = LucideIcons.Database;
                      } else if (skillNameLower.includes('aws') || skillNameLower.includes('cloud')) {
                        SkillIcon = LucideIcons.Cloud;
                      } else if (skillNameLower.includes('linux')) {
                        SkillIcon = LucideIcons.Terminal;
                      } else if (skillNameLower.includes('rest') || skillNameLower.includes('api')) {
                        SkillIcon = LucideIcons.Webhook;
                      } else if (skillNameLower.includes('ai') || skillNameLower.includes('ml') || 
                                skillNameLower.includes('tensor') || skillNameLower.includes('pytorch')) {
                        SkillIcon = LucideIcons.BrainCircuit;
                      } else {
                        // Fallback icon when no specific match is found
                        SkillIcon = LucideIcons.CircleDot;
                      }
                      
                      return (
                        <li 
                          key={item} 
                          className="skill-item"
                          style={{
                            transitionDelay: isHovered ? `${skillIndex * 50}ms` : '0ms'
                          }}
                        >
                          <div 
                            className="skill-item-icon"
                            style={{ color: isHovered ? skill.color : '' }}
                          >
                            <SkillIcon size={16} />
                          </div>
                          <span>{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </AnimatedSection>
  );
};

export default Skills;
