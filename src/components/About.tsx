import { User, MapPin, Calendar, Award } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import './About.css';
import { useEffect, useRef, useState } from 'react';
import profileImg from '../assets/image.jpeg'

const About = () => {
  const [isHovering, setIsHovering] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const infoCardsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!profileRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!profileRef.current || !isHovering) return;

      const { left, top, width, height } = profileRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      setMousePosition({ x, y });

      profileRef.current.style.transform = `
        perspective(1000px)
        rotateY(${x * 10}deg)
        rotateX(${y * -10}deg)
        translateZ(10px)
      `;
    };

    const handleMouseLeave = () => {
      if (!profileRef.current) return;
      profileRef.current.style.transform = `
        perspective(1000px)
        rotateY(0deg)
        rotateX(0deg)
        translateZ(0px)
      `;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  useEffect(() => {
    const handleScroll = () => {
      infoCardsRef.current.forEach((card, index) => {
        if (!card) return;
        const scrollOffset = window.scrollY * 0.05;
        const direction = index % 2 === 0 ? 1 : -1;
        const delay = index * 0.2;
        card.style.transform = `translateY(${Math.sin((scrollOffset + delay) * 0.5) * 10 * direction}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatedSection id="about" className="about-section section-container">
      <div className="about-grid">
        <div className="about-image-container">
          <div
            className="about-profile-image"
            ref={profileRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{ transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out' }}
          >
            <img src={profileImg} alt="Chandan Fulvariya" className="about-profile-photo" />
            <div className={`about-image-shine ${isHovering ? 'about-image-shine-active' : ''}`}></div>
          </div>

          <div 
            className="about-decoration-top"
            style={{ transform: `rotate(12deg) translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)` }}
          ></div>
          <div 
            className="about-decoration-bottom"
            style={{ transform: `rotate(-12deg) translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` }}
          ></div>

          <div className="about-info-card glass animate-float" ref={el => infoCardsRef.current[0] = el}>
            <div className="about-info-content">
              <MapPin className="about-info-icon" size={18} />
              <span>Innovative</span>
            </div>
          </div>
          <div className="about-info-card glass animate-float delay-200" ref={el => infoCardsRef.current[1] = el}>
            <div className="about-info-content">
              <Calendar className="about-info-icon" size={18} />
              <span>Technology</span>
            </div>
          </div>
          <div className="about-info-card glass animate-float delay-300" ref={el => infoCardsRef.current[2] = el}>
            <div className="about-info-content">
              <Award className="about-info-icon" size={18} />
              <span>Problem Solving</span>
            </div>
          </div>
        </div>

        {/* Right Column - Text Content */}
        <div className="about-content">
          <div className="about-title-container">
            <span className="section-subtitle about-subtitle-animated">About Me</span>
            <h2 className="section-title about-title-animated">Creating Innovative Solutions with Code</h2>
          </div>
          <div className="about-text-content">
            <p className="about-text about-text-animated">
             I'm a dedicated full stack developer with hands-on expertise in React.js, Node.js, and machine learning. I specialize in crafting responsive, scalable web applications and integrating intelligent AI-driven solutions to address real-world challenges effectively.
            </p>
            <p className="about-text about-text-animated delay-100">
             My journey in software development began at UIET,Panjab University, where I built a strong foundation in information technology. Since then, I’ve collaborated with diverse organizations, continually sharpening my frontend and backend development skills through real-world projects and challenges.
            </p>
            <p className="about-text about-text-animated delay-200">
            I take pride in building efficient, scalable, and user-centric applications. Whether it’s developing high-performance React interfaces, integrating intelligent AI models, or streamlining backend systems, I’m driven by a commitment to deliver reliable, impactful solutions in every project I undertake.
            </p>
            <div className="about-resume-button about-button-animated delay-300">
              <a 
                href="/resume.jpg" 
                download="chandan_fulvariya_resume.jpg" 
                className="portfolio-button about-download-button"
              >
                Download Resume
                <span className="about-button-icon"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default About;
