'use client';

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Button } from '@/components/ui/button';
import SocialLinks from '@/components/SocialLinks';
import { CONTACT_INFO } from '@/lib/data/constants';
import { ArrowDown, Sparkles, Cpu, Globe, Zap, LucideIcon } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

// Define interface for FloatingElement props
interface FloatingElementProps {
  icon: LucideIcon;
  delay: number;
  position: string;
}

// Floating element component
const FloatingElement: React.FC<FloatingElementProps> = ({ icon: Icon, delay, position }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -20, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      className={`absolute ${position} w-12 h-12 flex items-center justify-center`}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-full blur-xl"></div>
        <div className="relative bg-background/80 backdrop-blur-sm border border-primary/20 rounded-full p-3 shadow-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </motion.div>
  );
};

// Animated gradient background component
const GradientBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Animated gradient mesh */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 20% 30%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)`
          }}
        ></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            initial={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              scale: 0,
            }}
            animate={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      ></div>
    </div>
  );
};

// Typewriter effect component props
interface TypewriterTextProps {
  text: string | string[];
  delay?: number;
}

// Typewriter effect component
const TypewriterText: React.FC<TypewriterTextProps> = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [loopNum, setLoopNum] = useState<number>(0);

  const texts = Array.isArray(text) ? text : [text];

  useEffect(() => {
    const currentText = texts[loopNum % texts.length];
    
    const handleTyping = () => {
      if (isDeleting) {
        setDisplayText(currentText.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else {
        setDisplayText(currentText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }

      if (!isDeleting && currentIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, loopNum, texts]);

  return (
    <span className="inline-block">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="ml-1"
      >
        ▋
      </motion.span>
    </span>
  );
};

// Define interface for mouse position
interface MousePosition {
  x: number;
  y: number;
}

// Define interface for floating element config
interface FloatingElementConfig {
  icon: LucideIcon;
  delay: number;
  position: string;
}

export default function Hero() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const mouseX = useSpring(useMotionValue(0), { stiffness: 500, damping: 100 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Floating elements positions with type safety
  const floatingElements: FloatingElementConfig[] = [
    { icon: Cpu, delay: 0.5, position: 'top-20 left-10 lg:left-20' },
    { icon: Sparkles, delay: 0.8, position: 'top-1/3 right-10 lg:right-20' },
    { icon: Globe, delay: 1.1, position: 'bottom-1/3 left-1/4' },
    { icon: Zap, delay: 1.4, position: 'bottom-20 right-1/4' },
  ];

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-purple-950/20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <GradientBackground />
      
      {/* Floating elements */}
      {floatingElements.map((element, index) => (
        <FloatingElement 
          key={index} 
          icon={element.icon} 
          delay={element.delay} 
          position={element.position} 
        />
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="flex flex-col items-center text-center max-w-6xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >

          </motion.div>

          {/* Main title with gradient and typing effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-6"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight">
              <span className="block">
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  Hi, I'm Qirat Saeed
                </span>
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl mt-4 text-muted-foreground">
                <TypewriterText 
                  text={[
                    "I build Autonomous AI Systems",
                    "I create Scalable Full-Stack Applications",
                    "I specialize in Agentic AI",
                    "I excel at Prompt Engineering"
                  ]} 
                />
              </span>
            </h1>
          </motion.div>

          {/* Description with staggered animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-10"
          >
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Bridging the gap between cutting-edge AI research and production-ready applications.
              Specializing in <span className="text-primary font-semibold">Agentic AI</span>,{' '}
              <span className="text-primary font-semibold">LLM Integration</span>, and{' '}
              <span className="text-primary font-semibold">Modern Web Architecture</span>.
            </p>
          </motion.div>

          {/* CTA Buttons with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="#projects">
                <Button 
                  size="lg" 
                  className="rounded-full px-8 py-6 text-lg font-semibold group relative overflow-hidden"
                >
                  <span className="relative z-10">Explore My Work</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600"
                    initial={false}
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'loop',
                      ease: 'linear'
                    }}
                  />
                </Button>
              </a>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="#contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-8 py-6 text-lg font-semibold group border-2"
                >
                  <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent group-hover:text-transparent transition-all duration-300">
                    Let's Collaborate
                  </span>
                  <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Social links with enhanced animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-16"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-xl"></div>
              <div className="relative backdrop-blur-sm bg-background/30 rounded-2xl p-6 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
                <SocialLinks />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            const projectsSection = document.querySelector('#projects');
            projectsSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          whileHover={{ y: 5 }}
        >
          <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
          <div className="relative">
            <motion.div
              className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center overflow-hidden"
              animate={{ 
                borderColor: ['rgba(var(--primary), 0.5)', 'rgba(var(--primary), 1)', 'rgba(var(--primary), 0.5)']
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <motion.div
                className="w-1 h-3 bg-gradient-to-b from-primary to-purple-600 rounded-full mt-2"
                animate={{ y: [0, 16, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent rounded-full"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Mouse follower effect */}
      <motion.div
        className="fixed w-96 h-96 rounded-full bg-gradient-to-r from-primary/10 via-purple-600/10 to-pink-500/10 blur-3xl pointer-events-none z-0"
        style={{
          x: mousePosition.x * 100,
          y: mousePosition.y * 100,
          left: '50%',
          top: '50%',
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </section>
  );
}