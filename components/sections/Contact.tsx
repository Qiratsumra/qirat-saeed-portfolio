'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CONTACT_INFO } from '@/lib/data/constants';
import SocialLinks from '@/components/SocialLinks';
import {
  Mail,
  Phone,
  MapPin,
  FileText,
  Globe,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
      color: "text-primary"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: CONTACT_INFO.phone,
      href: `tel:${CONTACT_INFO.phone}`,
      color: "text-blue-500"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: `${CONTACT_INFO.location} 🇵🇰`,
      color: "text-green-500"
    },

  ];

  return (
    <section
      id="contact"
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
              backgroundImage: `radial-gradient(circle at 20% 35%, rgba(120, 119, 198, 0.2) 0%, transparent 50%),
                               radial-gradient(circle at 80% 65%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
                               radial-gradient(circle at 40% 85%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)`
            }}
          />
        </div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
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
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5,
            }}
          />
        ))}
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
              Get In Touch
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
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Let's Build{' '}
            <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Something Exceptional
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Open to opportunities in AI systems development, full-stack engineering, and innovative product development
          </motion.p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-full"
          >
            <Card className="h-full bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-white/10 shadow-xl overflow-hidden hover:shadow-primary/5 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-purple-600/10">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl text-foreground">Contact Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="group"
                    >
                      <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                        <div className={`p-2 rounded-lg bg-white/5 ${info.color}`}>
                          {info.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">{info.label}</p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-lg font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2"
                            >
                              {info.value}
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-foreground" />
                            </a>
                          ) : (
                            <p className="text-lg font-medium text-foreground">{info.value}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Connect With Me Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-full"
          >
            <Card className="h-full bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-white/10 shadow-xl overflow-hidden hover:shadow-primary/5 transition-all duration-300 flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-purple-600/10">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl text-foreground">Connect With Me</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-muted-foreground mb-8 text-lg">
                    Let's connect on professional networks and explore collaboration opportunities. I'm always open to discussing new projects and ideas.
                  </p>
                  <div className="flex justify-center py-4">
                    <SocialLinks />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-8 pt-6 border-t border-white/10"
                >

                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/3 -left-4 w-8 h-8 rounded-full bg-primary/20 blur-sm"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.5, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute bottom-1/3 -right-4 w-6 h-6 rounded-full bg-purple-500/20 blur-sm"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.3, 1]
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