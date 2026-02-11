// Constants for the portfolio

import { SocialLink, Certification } from '../types';

export const CONTACT_INFO = {
  name: 'Qirat Saeed',
  title: 'Agentic AI Developer & Full-Stack Engineer',
  email: 'saeedqirat43@gmail.com',
  phone: '+92-3002432507',
  location: 'Pakistan',
  github: 'https://github.com/qiratsumra',
  linkedin: 'https://linkedin.com/in/qirat-saeed-8048662b7',
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/qiratsumra',
    icon: 'github'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/qirat-saeed-8048662b7',
    icon: 'linkedin'
  },
  {
    name: 'Email',
    url: 'mailto:saeedqirat43@gmail.com',
    icon: 'mail'
  }
];

export const NAVIGATION_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'AI Systems', href: '#ai-systems' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 1,
    title: 'Advanced Prompt Engineering (Expert Level)',
    status: 'completed'
  },
  {
    id: 2,
    title: 'Fundamentals of Agentic AI (Quiz-Based Evaluation)',
    status: 'completed'
  },
  {
    id: 3,
    title: 'Modern AI Python (Panaverse Curriculum)',
    status: 'completed'
  },
  {
    id: 4,
    title: 'Next.js & TypeScript Development (Hands-on Projects)',
    status: 'completed'
  }
];