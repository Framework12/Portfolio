import React, { useEffect, useRef, useState } from 'react';

interface SimpleScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SimpleScrollAnimation({ 
  children, 
  className = '',
  delay = 0 
}: SimpleScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(element); // Optimize: only trigger once
        }
      },
      { threshold: 0.05, rootMargin: '50px' } // Trigger earlier for smoother experience
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0px)' : 'translateY(30px)',
        willChange: isVisible ? 'auto' : 'transform, opacity', // Optimize rendering
      }}
    >
      {children}
    </div>
  );
}

export default SimpleScrollAnimation;
