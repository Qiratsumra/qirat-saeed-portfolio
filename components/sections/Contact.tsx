'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CONTACT_INFO } from '@/lib/data/constants';
import SocialLinks from '@/components/SocialLinks';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  MessageSquare, 
  User, 
  Sparkles,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  SendHorizonal,
  Globe,
  Clock
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [activeField, setActiveField] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Auto-dismiss success message
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 20) {
      newErrors.message = 'Message should be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        setSubmitSuccess(true);
        setSubmitError('');
      } else {
        setSubmitError(result.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Form glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-purple-600/10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

            <Card className="relative h-full bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-white/10 shadow-xl overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-purple-600/10">
                    <SendHorizonal className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-foreground">Send a Message</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      I'll respond within 24 hours
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {/* Name field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Your Name
                      </label>
                    </div>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setActiveField('name')}
                      onBlur={() => setActiveField(null)}
                      className={`bg-background text-foreground placeholder:text-muted-foreground transition-all duration-300 ${
                        errors.name ? 'border-red-500' : 
                        activeField === 'name' ? 'border-primary ring-2 ring-primary/20' : ''
                      }`}
                    />
                    {errors.name && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-500 text-sm mt-2"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Email field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email Address
                      </label>
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setActiveField('email')}
                      onBlur={() => setActiveField(null)}
                      className={`bg-background text-foreground placeholder:text-muted-foreground transition-all duration-300 ${
                        errors.email ? 'border-red-500' : 
                        activeField === 'email' ? 'border-primary ring-2 ring-primary/20' : ''
                      }`}
                    />
                    {errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-500 text-sm mt-2"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Subject field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <label htmlFor="subject" className="text-sm font-medium text-foreground">
                        Subject
                      </label>
                    </div>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Project Inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setActiveField('subject')}
                      onBlur={() => setActiveField(null)}
                      className={`bg-background text-foreground placeholder:text-muted-foreground transition-all duration-300 ${
                        errors.subject ? 'border-red-500' : 
                        activeField === 'subject' ? 'border-primary ring-2 ring-primary/20' : ''
                      }`}
                    />
                    {errors.subject && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-500 text-sm mt-2"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.subject}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Message field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        Message
                      </label>
                    </div>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project, collaboration idea, or opportunity..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setActiveField('message')}
                      onBlur={() => setActiveField(null)}
                      className={`bg-background text-foreground placeholder:text-muted-foreground resize-none transition-all duration-300 ${
                        errors.message ? 'border-red-500' : 
                        activeField === 'message' ? 'border-primary ring-2 ring-primary/20' : ''
                      }`}
                    />
                    <div className="flex justify-between items-center mt-2">
                      {errors.message ? (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-500 text-sm"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.message}
                        </motion.p>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Minimum 20 characters
                        </span>
                      )}
                      <span className={`text-xs ${
                        formData.message.length < 20 ? 'text-muted-foreground' : 'text-green-500'
                      }`}>
                        {formData.message.length}/20
                      </span>
                    </div>
                  </motion.div>

                  {/* Status messages */}
                  <AnimatePresence>
                    {submitSuccess && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 rounded-lg bg-green-500/10 border border-green-500/20"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="font-medium text-green-500">Message Sent!</p>
                            <p className="text-sm text-green-500/80 dark:text-green-400/80">
                              Thank you! I'll get back to you within 24 hours.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 rounded-lg bg-red-500/10 border border-red-500/20"
                      >
                        <div className="flex items-center gap-3">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          <div>
                            <p className="font-medium text-red-500">Error</p>
                            <p className="text-sm text-red-500/80 dark:text-red-400/80">{submitError}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full group relative overflow-hidden"
                      disabled={isSubmitting}
                      size="lg"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-pink-500"
                        initial={false}
                        animate={{ x: ['100%', '-100%'] }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: 'loop',
                          ease: 'linear'
                        }}
                      />
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-6"
          >
            <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-white/10 shadow-xl">
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
                      <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
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

            {/* Social Links Card */}
            <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-white/10 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-purple-600/10">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl text-foreground">Connect With Me</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <p className="text-muted-foreground mb-4">
                      Let's connect on professional networks and explore collaboration opportunities
                    </p>
                    <div className="flex justify-center">
                      <SocialLinks />
                    </div>
                  </div>
                 
                </div>
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