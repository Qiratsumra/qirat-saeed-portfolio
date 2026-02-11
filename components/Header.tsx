'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { NAVIGATION_LINKS } from '@/lib/data/constants';
import ThemeToggle from '@/components/ThemeToggle';
import SocialLinks from '@/components/SocialLinks';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, Menu } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      // Update active link based on scroll position
      const sections = document.querySelectorAll<HTMLElement>('section[id]');
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id') || '';

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveLink(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleLinkClick = (href: string) => {
    setActiveLink(href.replace('#', ''));
    setIsMenuOpen(false);
    
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const linkVariants: Variants = {
    hover: {
      scale: 1.05,
      color: 'var(--primary)',
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const logoVariants: Variants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-background/95 backdrop-blur-xl py-3 shadow-lg border-b border-border/30' 
            : 'bg-transparent py-5'
        }`}
        style={{
          background: scrolled 
            ? 'linear-gradient(135deg, rgba(var(--background-rgb), 0.97) 0%, rgba(var(--background-rgb), 0.95) 100%)'
            : 'transparent'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div 
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Qirat Saeed
              </div>
              <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-300 ease-out"></div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAVIGATION_LINKS.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover="hover"
                  whileTap="tap"
                  variants={linkVariants}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                      activeLink === link.href.replace('#', '')
                        ? 'text-primary'
                        : 'text-foreground/90 hover:text-primary'
                    }`}
                  >
                    {link.name}
                    {activeLink === link.href.replace('#', '') && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-full"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <ThemeToggle />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <SocialLinks />
              </motion.div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              <ThemeToggle />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative p-2 rounded-lg hover:bg-accent transition-colors"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              ref={menuRef}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed right-0 top-0 h-full w-80 max-w-full bg-background/95 backdrop-blur-xl border-l border-border/30 shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-8">
                {/* Mobile Logo */}
                <div className="mb-12">
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                    Qirat Saeed
                  </div>
                  <div className="h-0.5 w-24 bg-gradient-to-r from-primary to-purple-600 rounded-full"></div>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="space-y-6">
                  {NAVIGATION_LINKS.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link.href);
                        }}
                        className={`flex items-center text-lg font-medium py-3 transition-colors ${
                          activeLink === link.href.replace('#', '')
                            ? 'text-primary'
                            : 'text-foreground/90 hover:text-primary'
                        }`}
                      >
                        {activeLink === link.href.replace('#', '') && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="w-2 h-2 bg-gradient-to-r from-primary to-purple-600 rounded-full mr-4"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className={activeLink === link.href.replace('#', '') ? 'ml-6' : 'ml-10'}>
                          {link.name}
                        </span>
                      </a>
                    </motion.div>
                  ))}
                </nav>

                {/* Social Links in Mobile Menu */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="mt-12 pt-8 border-t border-border/30"
                >
                  <p className="text-sm text-foreground/70 mb-4">Connect with me</p>
                  <SocialLinks />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}