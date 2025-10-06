import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (!mountRef.current) return;

    let animationFrameId: number;
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    
    // Lighting with dynamic intensity
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Add a spotlight for dramatic effect
    const spotlight = new THREE.SpotLight(0xE5DEFF, 1);
    spotlight.position.set(15, 20, 15);
    spotlight.angle = Math.PI / 4;
    spotlight.penumbra = 0.1;
    spotlight.decay = 2;
    spotlight.distance = 200;
    scene.add(spotlight);

    // Create particles with more variety
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 7000;
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create a sphere distribution with random distances
      const radius = 25 * Math.random();
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
      
      // Random scales for visual interest
      scaleArray[i / 3] = Math.random() * 2 + 0.1;
    }
    
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );
    
    particlesGeometry.setAttribute(
      'scale',
      new THREE.BufferAttribute(scaleArray, 1)
    );
    
    // Create materials for particles with custom colors and sizes
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      sizeAttenuation: true,
      color: 0xE5DEFF, // Lavender color
      transparent: true,
      opacity: 0.8,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create floating shapes with more variety
    const geometries = [
      new THREE.TorusGeometry(3, 1, 16, 100),
      new THREE.OctahedronGeometry(2),
      new THREE.TetrahedronGeometry(2),
      new THREE.IcosahedronGeometry(2),
      new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16), // Additional interesting shape
      new THREE.DodecahedronGeometry(2), // Additional shape
    ];
    
    const materials = [
      new THREE.MeshPhongMaterial({ color: 0xFDE1D3, wireframe: true }), // Peach
      new THREE.MeshPhongMaterial({ color: 0xD4E5D9, wireframe: true }), // Sage
      new THREE.MeshPhongMaterial({ color: 0xFEF7CD, wireframe: true }), // Cream
      new THREE.MeshPhongMaterial({ color: 0xE5DEFF, wireframe: true }), // Lavender
      new THREE.MeshPhongMaterial({ color: 0xFFAFA3, wireframe: true }), // Coral
      new THREE.MeshPhongMaterial({ color: 0xC9D7F8, wireframe: true }), // Light blue
    ];
    
    const meshes: THREE.Mesh[] = [];
    
    geometries.forEach((geometry, i) => {
      const mesh = new THREE.Mesh(geometry, materials[i]);
      mesh.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25
      );
      // Random initial rotation
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      scene.add(mesh);
      meshes.push(mesh);
    });
    
    // Mouse movement effect with enhanced responsiveness
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    
    const onDocumentMouseMove = (event: MouseEvent) => {
      // Calculate mouse position relative to the center
      targetMouseX = (event.clientX - window.innerWidth / 2) / 100;
      targetMouseY = (event.clientY - window.innerHeight / 2) / 100;
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Handle smooth scrolling interaction
    let scrollY = 0;
    let targetScrollY = 0;

    const onScroll = () => {
      targetScrollY = window.scrollY * 0.002;
    };
    
    window.addEventListener('scroll', onScroll);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Time variables for animation
    let time = 0;
    const clock = new THREE.Clock();
    
    // Animation loop with enhanced effects
    const animate = () => {
      // Update time
      const delta = clock.getDelta();
      time += delta;
      
      // Smooth mouse movement with easing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      
      // Smooth scroll effect
      scrollY += (targetScrollY - scrollY) * 0.05;
      
      // Rotate particle system with varying speed
      particlesMesh.rotation.x += 0.0003 + scrollY * 0.0002;
      particlesMesh.rotation.y += 0.0005 + mouseX * 0.0001;
      
      // Pulsating effect for particles
      const pulseScale = 1 + 0.05 * Math.sin(time * 2);
      particlesMaterial.size = 0.05 * pulseScale;
      
      // Rotate floating shapes with varying speeds and directions
      meshes.forEach((mesh, i) => {
        const speed = 0.1 + i * 0.02;
        // Create varying rotation patterns with sine functions
        mesh.rotation.x += 0.002 * Math.sin(time * speed) * (i % 2 ? 1 : -1);
        mesh.rotation.y += 0.003 * Math.cos(time * speed) * ((i + 1) % 2 ? 1 : -1);
        
        // Add a subtle floating motion
        mesh.position.y += Math.sin(time * speed) * 0.01;
        
        // Make shapes respond slightly to mouse
        mesh.position.x += mouseX * 0.001 * (i % 3 - 1);
        mesh.position.z += mouseY * 0.001 * (i % 3 - 1);
      });
      
      // Dynamic lighting angle based on time
      spotlight.position.x = Math.sin(time * 0.1) * 15;
      spotlight.position.z = Math.cos(time * 0.1) * 15;
      
      // Responsive camera movement based on mouse position + scroll
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.position.z = 20 + scrollY * 2; // Zoom out slightly on scroll
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('scroll', onScroll);
      
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose geometries, materials, and meshes
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);
  
  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default ThreeScene;
