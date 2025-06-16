
import { ReactNode, useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: string;
  delay?: string;
  threshold?: number;
  id?: string;
  once?: boolean;
  duration?: string;
  easing?: string;
  staggerChildren?: boolean;
}

const AnimatedSection = ({
  children,
  className = '',
  animation = 'animate-fade-in',
  delay = '',
  threshold = 0.1,
  id,
  once = true,
  duration = '',
  easing = '',
  staggerChildren = false,
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // IntersectionObserver for scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Trigger earlier
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold, once]);
  
  // Mouse movement tracking for subtle parallax effects
  useEffect(() => {
    if (!sectionRef.current || !isHovering) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovering]);
  
  // Apply staggered animation to children
  useEffect(() => {
    if (!staggerChildren || !isVisible || !sectionRef.current) return;
    
    const children = Array.from(sectionRef.current.children);
    
    children.forEach((child, index) => {
      const element = child as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = `opacity 0.5s ease-out, transform 0.5s ease-out`;
      element.style.transitionDelay = `${index * 0.1}s`;
      
      // Trigger animation after a small delay
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 50);
    });
  }, [isVisible, staggerChildren]);

  // Create dynamic style based on props
  const dynamicStyle: React.CSSProperties = {
    ...(duration ? { animationDuration: duration } : {}),
    ...(easing ? { animationTimingFunction: easing } : {}),
    ...(isHovering ? { transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)` } : {}),
    transition: 'transform 0.2s ease-out',
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${className} ${isVisible ? animation : 'opacity-0'} ${delay}`}
      style={dynamicStyle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;
