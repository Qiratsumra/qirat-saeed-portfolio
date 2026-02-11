'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Code, Cpu, Globe, Zap, GraduationCap, Rocket, Target } from 'lucide-react';
import { useRef } from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  gradient: string;
  icon: React.ReactNode;
  delay: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description, gradient, icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative group"
    >
      <div className={`absolute inset-0 ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300`}></div>
      <Card className="relative bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-white/10 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 -translate-y-16 translate-x-16 bg-white/5 rounded-full"></div>
        <CardContent className="p-6 sm:p-8 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              {icon}
            </div>
            <motion.div
              className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: delay + 0.2 }}
            >
              {value}
            </motion.div>
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm sm:text-base">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const skills = [
    { name: "Agentic AI", level: 95, color: "from-primary to-purple-600" },
    { name: "Next.js/React", level: 90, color: "from-blue-500 to-cyan-500" },
    { name: "TypeScript", level: 88, color: "from-blue-600 to-indigo-500" },
    { name: "LLM Integration", level: 85, color: "from-purple-500 to-pink-500" },
    { name: "Python", level: 82, color: "from-green-500 to-emerald-500" },
    { name: "System Design", level: 80, color: "from-orange-500 to-red-500" },
  ];

  const statsCards = [
    {
      title: "Projects Built",
      value: "15+",
      description: "From AI agents to full-stack applications",
      gradient: "bg-gradient-to-r from-primary/30 to-purple-600/30",
      icon: <Rocket className="w-6 h-6 text-primary" />,
      delay: 0.1
    },
    {
      title: "Certifications",
      value: "4+",
      description: "AI & Full-Stack Development",
      gradient: "bg-gradient-to-r from-blue-500/30 to-cyan-500/30",
      icon: <GraduationCap className="w-6 h-6 text-blue-500" />,
      delay: 0.2
    },
    {
      title: "AI Specialist",
      value: "Agentic",
      description: "Autonomous AI Systems",
      gradient: "bg-gradient-to-r from-purple-500/30 to-pink-500/30",
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      delay: 0.3
    },
    {
      title: "Full-Stack",
      value: "Expert",
      description: "Modern Web Development",
      gradient: "bg-gradient-to-r from-green-500/30 to-emerald-500/30",
      icon: <Code className="w-6 h-6 text-green-500" />,
      delay: 0.4
    },
  ];

  return (
    <section 
      id="about" 
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
      ref={containerRef}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background"></div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Section title with decorative elements */}
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="w-12 h-0.5 bg-gradient-to-r from-primary to-purple-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                  About Me
                </span>
              </div>

              <motion.h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Building the Future with{' '}
                <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  AI
                </span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I'm <span className="font-semibold text-primary">Qirat Saeed</span>, a Computer Science student from Pakistan specializing in <span className="font-semibold text-primary">Agentic AI</span> and <span className="font-semibold text-primary">Full-Stack Development</span> through the Governor Initiative for Artificial Intelligence & Computing (GIAIC).
                </p>

                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  My expertise lies in building <span className="font-semibold text-primary">autonomous AI agent systems</span> and intelligent automation tools that bridge the gap between cutting-edge AI research and production-ready applications.
                </p>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Core Expertise
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <Cpu className="w-5 h-5 text-primary" />
                      <span>Agentic AI Systems</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <Globe className="w-5 h-5 text-blue-500" />
                      <span>Full-Stack Development</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <Brain className="w-5 h-5 text-purple-500" />
                      <span>LLM Integration</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <Zap className="w-5 h-5 text-green-500" />
                      <span>System Architecture</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Currently advancing my skills in <span className="font-semibold text-primary">multi-agent orchestration</span> and building innovative AI-powered applications that push the boundaries of autonomous systems.
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Stats cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {statsCards.map((card, index) => (
                <StatsCard key={index} {...card} />
              ))}
            </div>

            {/* Skills progress bars */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-6">
                Technical <span className="text-primary">Expertise</span>
              </h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm font-semibold text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 * index, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
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
                ))}
              </div>
            </motion.div>

            {/* Floating element */}
            <motion.div
              className="absolute -right-4 -bottom-4 w-24 h-24 z-0"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-full blur-xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative bg-background/80 backdrop-blur-sm border border-primary/20 rounded-full p-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative floating elements */}
        <motion.div
          className="absolute top-1/4 right-10 w-8 h-8 rounded-full bg-primary/20 blur-sm"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-10 w-6 h-6 rounded-full bg-purple-500/20 blur-sm"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </div>
    </section>
  );
}