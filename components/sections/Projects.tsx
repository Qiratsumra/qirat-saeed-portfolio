'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { projectsData } from '@/lib/data/projects';
import ProjectCard from '@/components/ProjectCard';
import ProjectFilter from '@/components/ProjectFilter';
import { ArrowRight, Sparkles, Zap, Eye, Code, ExternalLink, Filter, Grid3x3, Brain } from 'lucide-react';
import type { Project } from '@/lib/types';

// Define project category type
type ProjectCategory = 'all' | 'featured' | 'ai' | 'fullstack' | 'streamlit' | string;

interface CategoryStats {
  label: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'detailed'>('grid');

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  // Calculate category statistics
  const categoryStats: CategoryStats[] = useMemo(() => {
    const categories = ['ai', 'fullstack', 'streamlit'];
    const stats = categories.map(category => {
      const count = projectsData.filter(project => project.category === category).length;
      return {
        label: category.charAt(0).toUpperCase() + category.slice(1),
        count,
        color: category === 'ai' ? 'from-primary to-purple-600'
          : category === 'fullstack' ? 'from-blue-500 to-cyan-500'
            : 'from-green-500 to-emerald-500',
        icon: category === 'ai' ? <Brain className="w-4 h-4" />
          : category === 'fullstack' ? <Code className="w-4 h-4" />
            : <Zap className="w-4 h-4" />
      };
    });

    // Add "all" and "featured" categories
    return [
      {
        label: 'All',
        count: projectsData.length,
        color: 'from-gray-500 to-gray-700',
        icon: <Grid3x3 className="w-4 h-4" />
      },
      {
        label: 'Featured',
        count: 3,
        color: 'from-yellow-500 to-orange-500',
        icon: <Sparkles className="w-4 h-4" />
      },
      ...stats
    ];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projectsData;
    if (activeFilter === 'featured') {
      // Return projects marked as featured or first 3
      const featured = projectsData.filter(p => p.featured);
      return featured.length > 0 ? featured : projectsData.slice(0, 3);
    }
    return projectsData.filter(project => project.category === activeFilter);
  }, [activeFilter]);

  // Auto-rotate featured projects on hover
  useEffect(() => {
    if (hoveredProject) {
      const timer = setTimeout(() => {
        setHoveredProject(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hoveredProject]);

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
      ref={containerRef}
    >
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 10% 20%, rgba(120, 119, 198, 0.15) 0%, transparent 40%),
                               radial-gradient(circle at 90% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 40%),
                               radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`
            }}
          />
        </div>

        {/* Animated grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          style={{ opacity, scale }}
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
              Project Portfolio
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
            Featured{' '}
            <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Building cutting-edge AI systems and scalable applications that solve real-world problems
          </motion.p>
        </motion.div>

        {/* Interactive filter and view controls */}
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Category stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categoryStats.map((stat) => (
              <motion.button
                key={stat.label}
                onClick={() => setActiveFilter(stat.label.toLowerCase() as ProjectCategory)}
                className={`group relative px-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 ${activeFilter === stat.label.toLowerCase()
                    ? 'border-primary/50 bg-primary/10'
                    : 'border-white/10 bg-white/5 hover:border-primary/30'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                    {stat.icon}
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold">{stat.count}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
                {activeFilter === stat.label.toLowerCase() && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 border-2 border-primary/30 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Enhanced filter bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-purple-600/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-primary" />
              <span className="font-medium">Filter by:</span>
            </div>

            <ProjectFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

            {/* View mode toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">View:</span>
              <div className="flex bg-white/5 rounded-lg p-1">
                {(['grid', 'detailed'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${viewMode === mode
                        ? 'bg-primary text-white'
                        : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {mode === 'grid' ? 'Grid' : 'Detailed'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Animated project counter */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              Showing <span className="font-bold text-primary">{filteredProjects.length}</span> of{' '}
              <span className="font-bold">{projectsData.length}</span> projects
            </span>
            <motion.div
              className="h-1 bg-gradient-to-r from-primary via-purple-600 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${(filteredProjects.length / projectsData.length) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ maxWidth: '200px' }}
            />
          </div>
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode + activeFilter}
            className={`grid gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
              }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                layout
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  viewMode={viewMode}
                  isHovered={hoveredProject === project.id}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-purple-600/5 border border-white/10 backdrop-blur-sm">
              <Eye className="w-12 h-12 text-primary/50" />
              <h3 className="text-xl font-semibold">No projects found</h3>
              <p className="text-muted-foreground max-w-md">
                No projects match the selected filter. Try a different category or view all projects.
              </p>
              <button
                onClick={() => setActiveFilter('all')}
                className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:shadow-lg transition-shadow"
              >
                View All Projects
              </button>
            </div>
          </motion.div>
        )}


      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/4 -right-4 w-8 h-8 rounded-full bg-primary/20 blur-sm"
        animate={{
          y: [0, -30, 0],
          x: [0, 10, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -left-4 w-6 h-6 rounded-full bg-purple-500/20 blur-sm"
        animate={{
          y: [0, 30, 0],
          x: [0, -10, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
    </section>
  );
}