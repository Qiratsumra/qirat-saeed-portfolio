'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CERTIFICATIONS } from '@/lib/data/constants';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  Brain,
  Code,
  Sparkles,
  Bookmark,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { useRef, useState } from 'react';

import { Certification } from '@/lib/types';

interface TimelineItem {
  title: string;
  subtitle: string;
  description: string;
  date: string;
  icon: React.ReactNode;
  color: string;
  skills: string[];
}

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCert, setActiveCert] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Enhanced certifications data
  const enhancedCerts: Certification[] = CERTIFICATIONS.map(cert => ({
    ...cert,
    issuer: cert.title.includes('AI') ? 'GIAIC' :
      cert.title.includes('Python') ? 'GIAIC' :
        cert.title.includes('Web') ? 'GIAIC' : 'Various',
    completionDate: cert.status === 'completed' ? '2024' : 'Expected 2024'
  }));

  const timelineItems: TimelineItem[] = [
    {
      title: "AI & Web Development",
      subtitle: "Governor Initiative for AI & Computing (GIAIC)",
      description: "Comprehensive program focused on modern AI systems, full-stack development, and agentic AI architecture",
      date: "2023 - Present",
      icon: <Brain className="w-5 h-5" />,
      color: "from-primary to-purple-600",
      skills: ["Agentic AI", "Full-Stack", "Machine Learning", "API Development"]
    },
    {
      title: "Advanced Python Programming",
      subtitle: "Modern AI Python Development",
      description: "Deep dive into Python for AI applications, async programming, and production-ready systems",
      date: "2023 - 2024",
      icon: <Code className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      skills: ["Async Python", "AI Systems", "Pydantic", "Production Code"]
    },
    {
      title: "Full-Stack Development",
      subtitle: "Modern Web Technologies",
      description: "Mastering Next.js, TypeScript, React, and modern web architecture for scalable applications",
      date: "2023 - 2024",
      icon: <Sparkles className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
      skills: ["Next.js", "TypeScript", "React", "System Design"]
    }
  ];

  const progressStats = [
    { label: "Certifications", value: enhancedCerts.length, icon: <Award className="w-4 h-4" /> },
    { label: "Completed", value: enhancedCerts.filter(c => c.status === 'completed').length, icon: <CheckCircle className="w-4 h-4" /> },
    { label: "In Progress", value: enhancedCerts.filter(c => c.status === 'in-progress').length, icon: <Clock className="w-4 h-4" /> },
    { label: "Skills Gained", value: 15, icon: <TrendingUp className="w-4 h-4" /> }
  ];

  return (
    <section
      id="education"
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
              backgroundImage: `radial-gradient(circle at 15% 25%, rgba(120, 119, 198, 0.2) 0%, transparent 50%),
                               radial-gradient(circle at 85% 75%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
                               radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)`
            }}
          />
        </div>

        {/* Animated knowledge nodes */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
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
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Knowledge wave pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-5">
          <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1200 120">
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="fill-primary"
            />
          </svg>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          style={{ opacity }}
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
              Learning Journey
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
            Education &{' '}
            <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Certifications
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Continuous learning and certification in cutting-edge AI and web development technologies
          </motion.p>
        </motion.div>

        {/* Progress stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {progressStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="text-center p-4 rounded-xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-white/10"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3">
                <div className="text-primary">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Education timeline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Decorative line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-purple-600/20 to-transparent" />

            <Card className="h-full bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-white/10 shadow-xl overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-purple-600/10">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Education Journey</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {timelineItems.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="relative pl-12 group"
                    >
                      {/* Timeline node */}
                      <div className="absolute left-0 top-1">
                        <motion.div
                          className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="text-white">
                            {item.icon}
                          </div>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h3 className="text-xl font-semibold">{item.title}</h3>
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 text-sm">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </span>
                        </div>
                        <p className="text-primary font-medium">{item.subtitle}</p>
                        <p className="text-muted-foreground">{item.description}</p>

                        {/* Skills badges */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {item.skills.map((skill, i) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.05 * i }}
                              className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 hover:border-primary/30 transition-colors"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Continuous learning CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-8 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-purple-600/5 border border-primary/10"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Continuous Learning</p>
                      <p className="text-sm text-muted-foreground">Always exploring new AI advancements and web technologies</p>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Card className="h-full bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-white/10 shadow-xl overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-purple-600/10">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Certifications</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AnimatePresence>
                    {enhancedCerts.map((cert, index) => (
                      <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        onMouseEnter={() => setActiveCert(cert.id)}
                        onMouseLeave={() => setActiveCert(null)}
                        className={`relative p-4 rounded-lg border transition-all duration-300 cursor-pointer ${activeCert === cert.id
                            ? 'border-primary/50 bg-primary/5'
                            : 'border-white/10 bg-white/5 hover:border-primary/30'
                          }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-lg ${cert.status === 'completed'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-blue-500/20 text-blue-400'
                            }`}>
                            {cert.status === 'completed' ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <Clock className="w-5 h-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <h3 className="font-semibold">{cert.title}</h3>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${cert.status === 'completed'
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-blue-500/20 text-blue-400'
                                  }`}>
                                  {cert.status === 'completed' ? 'Completed' : 'In Progress'}
                                </span>
                                {cert.completionDate && (
                                  <span className="text-xs text-muted-foreground">
                                    {cert.completionDate}
                                  </span>
                                )}
                              </div>
                            </div>
                            {cert.issuer && (
                              <p className="text-sm text-muted-foreground mt-1">
                                Issued by {cert.issuer}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Expand on hover */}
                        <AnimatePresence>
                          {activeCert === cert.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 pt-3 border-t border-white/10">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">
                                    Skills validated:
                                  </span>
                                  <button className="text-xs text-primary hover:text-purple-400 transition-colors flex items-center gap-1">
                                    View details
                                    <ExternalLink className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Certificate progress */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-8"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Certification Progress</span>
                    <span className="text-sm text-primary">
                      {Math.round((enhancedCerts.filter(c => c.status === 'completed').length / enhancedCerts.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${(enhancedCerts.filter(c => c.status === 'completed').length / enhancedCerts.length) * 100}%`
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
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
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/4 right-8 w-3 h-3 rounded-full bg-primary/20 blur-sm"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-8 w-4 h-4 rounded-full bg-purple-500/20 blur-sm"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.5, 1]
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