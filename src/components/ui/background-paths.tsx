'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BackgroundPathsProps {
  title?: string;
  className?: string;
}

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-slate-950 dark:text-white"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path, index) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ 
              pathLength: 0.3, 
              opacity: 0.1,
              y: -20 
            }}
            animate={{
              pathLength: 1,
              y: [-20, 20, -20], // Vertical floating
              opacity: [0.1, 0.8, 0.1], // Synchronized opacity cycling
            }}
            transition={{
              duration: 8 + Math.random() * 7, // 8-15s variable timing
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.1, // Staggered timing
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// Simplified background-only version for Hero integration
export function BackgroundPathsOnly({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none background-paths-only", className)}>
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 800"
        fill="none"
        style={{ 
          color: 'hsl(var(--primary))',
        }}
      >
        <defs>
          {/* Gradient definitions for more sophisticated waves */}
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.7" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Wave 1 - Top fast flowing wave */}
        <motion.path
          d="M-200,120 Q100,50 400,120 Q700,190 1000,120 Q1300,50 1600,120"
          stroke="url(#waveGradient1)"
          strokeWidth="2.2"
          fill="none"
          strokeDasharray="25 15"
          initial={{ 
            pathLength: 0, 
            strokeDashoffset: 0,
            x: -200
          }}
          animate={{ 
            pathLength: 1,
            strokeDashoffset: [0, -100],
            x: [-200, 0, -200],
            opacity: [0.5, 0.9, 0.5]
          }}
          transition={{
            pathLength: { duration: 2, ease: "easeInOut" },
            strokeDashoffset: { duration: 6, repeat: Infinity, ease: "linear" },
            x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Wave 2 - Upper middle wave */}
        <motion.path
          d="M-180,200 Q120,130 420,200 Q720,270 1020,200 Q1320,130 1620,200"
          stroke="url(#waveGradient2)"
          strokeWidth="1.9"
          fill="none"
          strokeDasharray="22 10"
          initial={{ 
            pathLength: 0, 
            strokeDashoffset: 0,
            x: -50
          }}
          animate={{ 
            pathLength: 1,
            strokeDashoffset: [0, 70],
            x: [-50, -150, -50],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            pathLength: { duration: 2.5, ease: "easeInOut", delay: 0.3 },
            strokeDashoffset: { duration: 7, repeat: Infinity, ease: "linear", delay: 0.3 },
            x: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
            opacity: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
          }}
        />

        {/* Wave 3 - Middle wave */}
        <motion.path
          d="M-150,300 Q150,200 450,300 Q750,400 1050,300 Q1350,200 1650,300"
          stroke="url(#waveGradient3)"
          strokeWidth="1.7"
          fill="none"
          strokeDasharray="20 12"
          initial={{ 
            pathLength: 0, 
            strokeDashoffset: 0,
            x: 0
          }}
          animate={{ 
            pathLength: 1,
            strokeDashoffset: [0, 60],
            x: [0, -100, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            pathLength: { duration: 3, ease: "easeInOut", delay: 0.6 },
            strokeDashoffset: { duration: 8, repeat: Infinity, ease: "linear", delay: 0.6 },
            x: { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
            opacity: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
          }}
        />

        {/* Wave 4 - Lower middle wave */}
        <motion.path
          d="M-120,400 Q180,320 480,400 Q780,480 1080,400 Q1380,320 1680,400"
          stroke="url(#waveGradient1)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="18 8"
          initial={{ 
            pathLength: 0, 
            strokeDashoffset: 0,
            x: 50
          }}
          animate={{ 
            pathLength: 1,
            strokeDashoffset: [0, -50],
            x: [50, -80, 50],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            pathLength: { duration: 3.5, ease: "easeInOut", delay: 0.9 },
            strokeDashoffset: { duration: 9, repeat: Infinity, ease: "linear", delay: 0.9 },
            x: { duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
            opacity: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.9 }
          }}
        />

        {/* Wave 5 - Bottom complex wave */}
        <motion.path
          d="M-100,500 Q200,400 500,500 Q800,600 1100,500 Q1400,400 1700,500"
          stroke="url(#waveGradient2)"
          strokeWidth="1.4"
          fill="none"
          strokeDasharray="16 10"
          initial={{ 
            pathLength: 0, 
            strokeDashoffset: 0,
            x: 100
          }}
          animate={{ 
            pathLength: 1,
            strokeDashoffset: [0, -45],
            x: [100, -50, 100],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            pathLength: { duration: 4, ease: "easeInOut", delay: 1.2 },
            strokeDashoffset: { duration: 10, repeat: Infinity, ease: "linear", delay: 1.2 },
            x: { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
            opacity: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
          }}
        />

        {/* Wave 6 - Deep wave */}
        <motion.path
          d="M-80,600 Q220,520 520,600 Q820,680 1120,600 Q1420,520 1720,600"
          stroke="url(#waveGradient3)"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="14 6"
          initial={{ 
            pathLength: 0, 
            strokeDashoffset: 0,
            x: -30
          }}
          animate={{ 
            pathLength: 1,
            strokeDashoffset: [0, 35],
            x: [-30, -120, -30],
            opacity: [0.15, 0.5, 0.15]
          }}
          transition={{
            pathLength: { duration: 4.5, ease: "easeInOut", delay: 1.5 },
            strokeDashoffset: { duration: 11, repeat: Infinity, ease: "linear", delay: 1.5 },
            x: { duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
            opacity: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
          }}
        />

        {/* Wave 7 - Bottom subtle wave */}
        <motion.path
          d="M0,700 Q300,630 600,700 Q900,770 1200,700"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          strokeDasharray="12 8"
          strokeOpacity="0.4"
          initial={{ 
            pathLength: 0, 
            strokeDashoffset: 0
          }}
          animate={{ 
            pathLength: 1,
            strokeDashoffset: [0, 40],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            pathLength: { duration: 5, ease: "easeInOut", delay: 1.8 },
            strokeDashoffset: { duration: 12, repeat: Infinity, ease: "linear", delay: 1.8 },
            opacity: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.8 }
          }}
        />

        {/* Wave 8 - Surface ripple */}
        <motion.path
          d="M-250,80 Q50,20 350,80 Q650,140 950,80 Q1250,20 1550,80"
          stroke="url(#waveGradient1)"
          strokeWidth="1.8"
          fill="none"
          strokeDasharray="30 20"
          initial={{ 
            pathLength: 0, 
            strokeDashoffset: 0,
            x: -250
          }}
          animate={{ 
            pathLength: 1,
            strokeDashoffset: [0, -120],
            x: [-250, 50, -250],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            pathLength: { duration: 1.5, ease: "easeInOut", delay: 0.1 },
            strokeDashoffset: { duration: 5, repeat: Infinity, ease: "linear", delay: 0.1 },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.1 },
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.1 }
          }}
        />

        {/* Fast pulsing nodes */}
        <motion.circle
          cx="350"
          cy="120"
          r="2.5"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.9, 0],
            scale: [0, 1.8, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
        />
        
        <motion.circle
          cx="720"
          cy="200"
          r="2"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.8, 0],
            scale: [0, 1.6, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        <motion.circle
          cx="450"
          cy="300"
          r="1.8"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.7, 0],
            scale: [0, 1.4, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
        />
        
        <motion.circle
          cx="800"
          cy="400"
          r="2.2"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.1
          }}
        />
        
        <motion.circle
          cx="520"
          cy="500"
          r="1.9"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.7, 0],
            scale: [0, 1.3, 0]
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.4
          }}
        />
        
        <motion.circle
          cx="280"
          cy="600"
          r="2.1"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.6, 0],
            scale: [0, 1.2, 0]
          }}
          transition={{
            duration: 2.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.7
          }}
        />
        
        <motion.circle
          cx="900"
          cy="700"
          r="1.7"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            scale: [0, 1.1, 0]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <motion.circle
          cx="150"
          cy="80"
          r="2.3"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.9, 0],
            scale: [0, 1.7, 0]
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.1
          }}
        />
      </svg>
    </div>
  );
}

// Full component with content overlay
export function BackgroundPaths({ 
  title = 'Creative Studio',
  className 
}: BackgroundPathsProps) {
  const words = title.split(' ');

  return (
    <div className={cn("relative h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950", className)}>
      {/* Background Paths */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Animated Title */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
            {words.map((word, wordIndex) => (
              <span
                key={wordIndex}
                className="inline-block mr-4 last:mr-0"
              >
                {word.split('').map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 100,
                      delay: wordIndex * 0.1 + letterIndex * 0.1, // Staggered timing
                    }}
                    className="inline-block text-transparent bg-clip-text
                       bg-gradient-to-r from-neutral-900 to-neutral-700/80
                       dark:from-white dark:to-white/80"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
          
          {/* Animated Button */}
          <div
            className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10
               dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg
               overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Button
              variant="ghost"
              className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md
                 bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100
                 text-black dark:text-white transition-all duration-300
                 group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                hover:shadow-md dark:hover:shadow-neutral-800/50"
            >
              <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                Discover Excellence
              </span>
              <span
                className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5
                   transition-all duration-300"
              >
                →
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default BackgroundPaths;
