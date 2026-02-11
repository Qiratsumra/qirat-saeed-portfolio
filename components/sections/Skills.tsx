'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { skillsData } from '@/lib/data/skills';
import SkillBadge from '@/components/SkillBadge';
import { Code, Cpu, Brain, Database, Palette, Server, Zap, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';

// Icon mapping for categories
const categoryIcons: Record<string, React.ReactNode> = {
  "Languages": <Code className="w-5 h-5" />,
  "AI/ML": <Brain className="w-5 h-5" />,
  "Frontend": <Palette className="w-5 h-5" />,
  "Backend": <Server className="w-5 h-5" />,
  "Databases": <Database className="w-5 h-5" />,
  "DevOps": <Cpu className="w-5 h-5" />,
  "Tools": <Zap className="w-5 h-5" />,
  "Frameworks": <Sparkles className="w-5 h-5" />
};

interface SkillCategory {
  name: string;
  skills: string[];
  icon?: React.ReactNode;
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

  // Calculate total skills count
  const totalSkills = skillsData.reduce((acc, category) => acc + category.skills.length, 0);

  // Enhanced skills data with icons
  const enhancedSkillsData: SkillCategory[] = skillsData.map(category => ({
    ...category,
    icon: categoryIcons[category.name] || <Code className="w-5 h-5" />
  }));

  return (
    <section 
      id="skills" 
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
      ref={containerRef}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 35%, rgba(120, 119, 198, 0.2) 0%, transparent 50%),
                               radial-gradient(circle at 80% 65%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
                               radial-gradient(circle at 40% 85%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)`
            }}
          />
        </div>

        {/* Floating skill particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
              scale: 0,
            }}
            animate={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header with animated counter */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          style={{ scale, opacity }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="w-12 h-0.5 bg-gradient-to-r from-primary to-purple-600"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <span className="text-sm font-semibold text-primary tracking-wider uppercase">
              Technical Expertise
            </span>
            <motion.div
              className="w-12 h-0.5 bg-gradient-to-r from-purple-600 to-primary"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Skills &{' '}
            <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Technologies
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Mastering the tools and technologies that power modern AI systems and web applications
          </motion.p>

          {/* Animated skills counter */}
          <motion.div
            className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="font-bold text-primary"
              >
                {totalSkills}+
              </motion.span>{' '}
              Skills across {skillsData.length} domains
            </span>
          </motion.div>
        </motion.div>

        {/* Interactive skills grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {enhancedSkillsData.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              className="relative group"
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Category card */}
              <div className="relative h-full">
                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-600/5 rounded-2xl blur-xl transition-all duration-300 ${
                  hoveredCategory === category.name ? 'opacity-100' : 'opacity-0'
                }`} />

                {/* Main card */}
                <div className="relative h-full bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl overflow-hidden">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-tr-2xl" />

                  {/* Category header */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-purple-600/10"
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-primary">
                        {category.icon}
                      </div>
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                      <motion.div
                        className="h-1 w-12 bg-gradient-to-r from-primary to-purple-600 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: 48 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      />
                    </div>
                  </div>

                  {/* Skills grid with staggered animation */}
                  <div className="flex flex-wrap gap-3">
                    <AnimatePresence>
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.3, 
                            delay: 0.05 * skillIndex 
                          }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="relative"
                        >
                          {/* Skill badge with enhanced styling */}
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <SkillBadge 
                              skill={skill} 
                              category={category.name}
                              className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Progress indicator */}
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Mastery Level</span>
                      <motion.span 
                        className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                      >
                        Expert
                      </motion.span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(100, category.skills.length * 15)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                      >
                        <motion.div
                          className="h-full w-full"
                          animate={{
                            backgroundPosition: ["0% 0%", "100% 0%"]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          style={{
                            backgroundImage: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info section */}
        <motion.div
          className="mt-16 sm:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-purple-600/5 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-primary flex-shrink-0" />
            <p className="text-lg text-muted-foreground">
              Continuously expanding my skillset to stay at the forefront of{' '}
              <span className="font-semibold text-primary">AI innovation</span> and{' '}
              <span className="font-semibold text-primary">web development</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Floating animated elements */}
      <motion.div
        className="absolute top-1/4 left-4 w-4 h-4 rounded-full bg-primary/30 blur-sm"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.5, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-8 w-3 h-3 rounded-full bg-purple-500/30 blur-sm"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
    </section>
  );
}