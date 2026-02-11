// Types for the portfolio

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'agentic-ai' | 'full-stack' | 'streamlit' | 'featured';
  techStack: string[];
  featured?: boolean;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Certification {
  id: number;
  title: string;
  status: 'completed' | 'in-progress';
  description?: string;
  completionDate?: string;
  issuer?: string;
}