
import { ArrowDown } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Multiple texts to cycle through
  const texts = [
    'I build responsive web applications with React.js',
    'I create robust backend systems with Node.js',
  ];
  
  // Ref for the title element to apply parallax
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Mouse movement parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the center of the screen
      const x = (e.clientX - window.innerWidth / 2) / 50;
      const y = (e.clientY - window.innerHeight / 2) / 50;
      
      setMousePosition({ x, y });
      
      // Apply parallax to the title if ref exists
      if (titleRef.current) {
        titleRef.current.style.transform = `translate(${x * -0.5}px, ${y * -0.5}px)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Typing effect logic with multiple text cycling
  useEffect(() => {
    const currentText = texts[currentTextIndex];
    
    const typeText = () => {
      if (!isDeleting) {
        // Typing forward
        if (typedText.length < currentText.length) {
          setTypedText(currentText.substring(0, typedText.length + 1));
        } else {
          // Pause at the end before deleting
          setTypingComplete(true);
          setTimeout(() => {
            setIsDeleting(true);
          }, 2000);
        }
      } else {
        // Deleting
        if (typedText.length > 0) {
          setTypedText(currentText.substring(0, typedText.length - 1));
        } else {
          // Move to next text
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        }
      }
    };
    
    // Variable typing speed: faster when deleting, slower when typing
    const typingSpeed = isDeleting ? 30 : Math.random() * 40 + 50;
    
    // Slight pause at the end of deleting before starting a new word
    if (isDeleting && typedText.length === 0) {
      const timeout = setTimeout(() => {
        typeText();
      }, 500);
      return () => clearTimeout(timeout);
    }
    
    const timeout = setTimeout(typeText, typingSpeed);
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentTextIndex, texts]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Scroll down handler
  const handleScrollDown = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    }
  };
  
  // Smooth scroll handlers
  const handleNavClick = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      window.scrollTo({
        top: section.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-background">
        {/* Background gradient overlay with dynamic mouse movement */}
        <div 
          className="hero-background-overlay"
          style={{
            transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`,
          }}
        ></div>
        
        {/* Floating elements */}
        <div className="hero-floating-elements">
          <div className="hero-floating-circle hero-circle-1"></div>
          <div className="hero-floating-circle hero-circle-2"></div>
          <div className="hero-floating-square"></div>
          <div className="hero-floating-donut"></div>
        </div>
      </div>
      
      <div className="hero-container">
        <div className="hero-content">
          <h1 
            ref={titleRef}
            className="hero-title animate-slide-down"
          >
            Hello, I'm <span className="hero-name">Chandan!</span>
          </h1>
          
          <div className="hero-subtitle-container animate-slide-up delay-200">
            <p className="hero-subtitle">
              <span>{typedText}</span>
              <span className={`hero-typing-cursor ${showCursor ? 'cursor-visible' : 'cursor-hidden'}`}></span>
            </p>
            {typingComplete && !isDeleting && (
              <p className="hero-specialization animate-fade-in">
                Specializing in <span className="hero-specialty">Full-Stack development</span> 
              </p>
            )}
          </div>
          
          <div className="hero-buttons-container animate-fade-in delay-300">
            <button 
              className="portfolio-button hero-button"
              onClick={() => handleNavClick('#projects')}
            >
              <span className="hero-button-content">View My Work</span>
              <span className="hero-button-overlay"></span>
            </button>
            <button 
              className="portfolio-button-outline hero-button"
              onClick={() => handleNavClick('#contact')}
            >
              <span className="hero-button-content">Get in Touch</span>
              <span className="hero-button-overlay hero-button-overlay-dark"></span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator with pulse animation */}
      <div 
        className={`hero-scroll-indicator ${scrolled ? 'hero-scroll-hidden' : ''}`}
        onClick={handleScrollDown}
      >
        <div className="hero-scroll-pulse"></div>
        <ArrowDown className="hero-scroll-icon animate-bounce" size={32} />
      </div>
    </section>
  );
};

export default Hero;
