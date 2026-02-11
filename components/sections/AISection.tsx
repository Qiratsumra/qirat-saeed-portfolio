'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  Cpu, 
  Network, 
  GitBranch, 
  Shield, 
  Zap, 
  Code, 
  MessageSquare,
  Workflow,
  Bot,
  Sparkles,
  ArrowRight,
  Target,
  Cog,
  Lightbulb
} from 'lucide-react';
import { useRef, useState } from 'react';

interface AICapability {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
}

interface AIProject {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  gradient: string;
  tech: string[];
}

export default function AISystems() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCapability, setHoveredCapability] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const capabilities: AICapability[] = [
    {
      title: "Multi-Agent Systems",
      description: "Designing distributed agent architectures with communication protocols and coordinated workflows",
      icon: <Network className="w-6 h-6" />,
      color: "from-primary to-purple-600",
      delay: 0.1
    },
    {
      title: "Autonomous Decision Making",
      description: "Implementing intelligent decision-making with fallback mechanisms and error recovery",
      icon: <Brain className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      delay: 0.2
    },
    {
      title: "State Management",
      description: "Managing agent state across interactions to maintain context and continuity",
      icon: <GitBranch className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      delay: 0.3
    },
    {
      title: "Workflow Automation",
      description: "Creating automated workflows for independent execution with minimal intervention",
      icon: <Workflow className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      delay: 0.4
    }
  ];

  const projects: AIProject[] = [
    {
      title: "RefactorPro: AI-Driven Code Quality",
      description: "AI-powered code refactoring tool analyzing Python code for quality improvements using advanced prompt engineering",
      features: [
        "Visual feedback systems for code quality metrics",
        "Structured AI outputs for actionable insights",
        "Intelligent feedback mechanisms for developers",
        "Real-time code analysis and suggestions"
      ],
      icon: <Code className="w-6 h-6" />,
      gradient: "from-primary/20 to-purple-600/20",
      tech: ["Python", "OpenAI", "Streamlit", "Pydantic"]
    },
    {
      title: "AI Employee System",
      description: "Multi-agent system functioning as a full-time employee, handling complex workflows autonomously",
      features: [
        "Collaborative multi-agent architecture",
        "FTE-level workflow automation",
        "Autonomous task execution mechanisms",
        "Intelligent task delegation and coordination"
      ],
      icon: <Bot className="w-6 h-6" />,
      gradient: "from-blue-500/20 to-cyan-500/20",
      tech: ["Python Async", "OpenAI SDK", "Multi-Agent", "LangChain"]
    },
    {
      title: "CLI Inventory Agent",
      description: "Command-line inventory management with natural language processing for intuitive tracking",
      features: [
        "NLP for natural command interpretation",
        "Intelligent inventory tracking algorithms",
        "Automated decision-making for stock management",
        "Real-time inventory optimization"
      ],
      icon: <MessageSquare className="w-6 h-6" />,
      gradient: "from-green-500/20 to-emerald-500/20",
      tech: ["Python", "NLP", "CLI Tools", "Data Processing"]
    }
  ];

  const technicalApproaches = [
    {
      title: "LLM Integration",
      description: "Expertise in OpenAI Agents SDK with reliable API integration and error handling",
      icon: <Zap className="w-5 h-5" />,
      color: "text-yellow-500"
    },
    {
      title: "Prompt Engineering",
      description: "Advanced techniques for consistent and reliable AI outputs in production systems",
      icon: <Sparkles className="w-5 h-5" />,
      color: "text-purple-500"
    },
    {
      title: "Async Python",
      description: "Leveraging asynchronous programming for high-performance AI agent systems",
      icon: <Cpu className="w-5 h-5" />,
      color: "text-blue-500"
    },
    {
      title: "Data Validation",
      description: "Using Pydantic for robust data validation and serialization",
      icon: <Shield className="w-5 h-5" />,
      color: "text-green-500"
    }
  ];

  return (
    <section 
      id="ai-systems" 
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
              backgroundImage: `radial-gradient(circle at 20% 35%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                               radial-gradient(circle at 80% 65%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
                               radial-gradient(circle at 40% 85%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)`
            }}
          />
        </div>

        {/* Animated neural network pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(120, 119, 198, 0.3)" />
                <stop offset="50%" stopColor="rgba(99, 102, 241, 0.3)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0.3)" />
              </linearGradient>
            </defs>
            {[...Array(20)].map((_, i) => (
              <motion.circle
                key={i}
                cx={`${Math.random() * 100}%`}
                cy={`${Math.random() * 100}%`}
                r="2"
                fill="url(#neural-gradient)"
                animate={{ 
                  r: [2, 3, 2],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
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
              AI & Autonomous Systems
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
            Building{' '}
            <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Autonomous AI Systems
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Specializing in agentic AI systems that enable autonomous decision-making, intelligent automation, 
            and multi-agent orchestration for solving complex real-world problems.
          </motion.p>
        </motion.div>

        {/* AI Capabilities */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Lightbulb className="w-6 h-6 text-primary" />
            <h3 className="text-2xl sm:text-3xl font-bold">
              AI Agent <span className="text-primary">Architecture</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((capability) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: capability.delay }}
                whileHover={{ y: -10 }}
                onMouseEnter={() => setHoveredCapability(capability.title)}
                onMouseLeave={() => setHoveredCapability(null)}
                className="relative group cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${capability.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                <Card className="relative h-full bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-white/10 shadow-xl">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${capability.color} bg-opacity-20`}>
                        <div className="text-primary">
                          {capability.icon}
                        </div>
                      </div>
                      <motion.div
                        className="w-8 h-1 rounded-full bg-gradient-to-r from-primary to-purple-600"
                        initial={{ width: 0 }}
                        whileInView={{ width: 32 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: capability.delay + 0.2 }}
                      />
                    </div>
                    <CardTitle className="text-xl">{capability.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{capability.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Projects */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Target className="w-6 h-6 text-primary" />
            <h3 className="text-2xl sm:text-3xl font-bold">
              Featured <span className="text-primary">AI Projects</span>
            </h3>
          </div>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative group"
              >
                <div className={`absolute inset-0 ${project.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                <Card className="relative bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-white/10 shadow-xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 -translate-y-16 translate-x-16 bg-white/5 rounded-full" />
                  
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${project.gradient} bg-opacity-20`}>
                          {project.icon}
                        </div>
                        <div>
                          <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                          <p className="text-muted-foreground">{project.description}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 text-primary" />
                          Key Features
                        </h4>
                        <ul className="space-y-3">
                          {project.features.map((feature, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.05 * i }}
                              className="flex items-start gap-3"
                            >
                              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                          <Cog className="w-4 h-4 text-primary" />
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, i) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.1 * i }}
                              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm hover:border-primary/30 transition-colors"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Approach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Brain className="w-6 h-6 text-primary" />
            <h3 className="text-2xl sm:text-3xl font-bold">
              Technical <span className="text-primary">Approach</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalApproaches.map((approach, index) => (
              <motion.div
                key={approach.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="h-full bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${approach.color} bg-opacity-20`}>
                        {approach.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-lg">{approach.title}</h4>
                        <p className="text-muted-foreground text-sm">{approach.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Floating neural network nodes */}
      <motion.div
        className="absolute top-1/3 left-10 w-4 h-4 rounded-full bg-primary/20 blur-sm"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.5, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-10 w-3 h-3 rounded-full bg-purple-500/20 blur-sm"
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
    </section>
  );
}