
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import ThreeScene from '@/components/ThreeScene';

// Create sample images for the resume and project previews
const createPlaceholderImages = () => {
  const baseUrl = window.location.origin;

  // Create sample project images
  const projectImages = [
    { name: 'smartbook-preview.jpg', color: '#FDE1D3' },
    { name: 'devconnect-preview.jpg', color: '#D4E5D9' },
    { name: 'ecotrack-preview.jpg', color: '#FEF7CD' },
    { name: 'codementor-preview.jpg', color: '#E5DEFF' },
  ];

  // Create resume placeholder
  const resumeImage = new Image();
  resumeImage.src = `${baseUrl}/resume.jpg`;
  
  // Create a canvas for the resume
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Fill the background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add resume header
    ctx.fillStyle = '#2A3950';
    ctx.fillRect(0, 0, canvas.width, 120);
    
    // Add name
    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Chandan Fulvariya', 50, 70);
    
    // Add sections
    const sections = ['EXPERIENCE', 'EDUCATION', 'SKILLS', 'PROJECTS', 'CONTACT'];
    let yPos = 170;
    
    sections.forEach(section => {
      // Section title
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = '#2A3950';
      ctx.fillText(section, 50, yPos);
      
      // Section underline
      ctx.fillRect(50, yPos + 10, 700, 2);
      
      // Add some dummy content
      yPos += 40;
      ctx.font = '18px Arial';
      ctx.fillStyle = '#333333';
      
      for (let i = 0; i < 3; i++) {
        ctx.fillText(`• Sample ${section.toLowerCase()} information item ${i + 1}`, 70, yPos);
        yPos += 30;
      }
      
      yPos += 30;
    });
    
    // Convert canvas to blob and create a URL
    canvas.toBlob(blob => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = 'image';
        document.head.appendChild(link);
        
        // Also create a download link
        const downloadLink = document.createElement('a');
        downloadLink.download = 'resume.jpg';
        downloadLink.href = url;
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
      }
    });
  }

  // Create project preview images
  projectImages.forEach(img => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Fill with the color
      ctx.fillStyle = img.color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add a pattern
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 50 + 10,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
      
      // Add project name
      const projectName = img.name.split('-')[0].toUpperCase();
      ctx.font = 'bold 40px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(projectName, canvas.width / 2, canvas.height / 2);
      
      // Convert canvas to blob and create a URL
      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = url;
          link.as = 'image';
          document.head.appendChild(link);
          
          // Create an actual image for the project
          const img = document.createElement('img');
          img.src = url;
          img.style.display = 'none';
          document.body.appendChild(img);
        }
      });
    }
  });
};

const Index = () => {
  useEffect(() => {
    // Create placeholder images on mount
    createPlaceholderImages();
    
    // Clean up function
    return () => {
      // Nothing to clean up for now
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Three.js Background */}
      <ThreeScene />
      
      {/* Content */}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="bg-background py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} Chandan Fulvariya. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
