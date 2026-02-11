import { Project } from '@/lib/types';
// Project data for the portfolio

export const projectsData: Project[] = [
 
  {
    id: 1,
    title: 'AI Employee System (Autonomous FTE)',
    description: 'Multi-agent autonomous system designed to act as a full-time employee, handling complex workflows and tasks autonomously.',
    tags: ['Agentic AI', 'Autonomous Systems', 'LLM', 'Multi-Agent'],
    githubUrl: 'https://github.com/Qiratsumra/Hackathon_0_FTEs',
    category: 'agentic-ai',
    techStack: ['Python', 'OpenAI SDK', 'Async Programming', 'Agent Orchestration']
  },
  {
    id: 2,
    title: 'CLI Inventory Agent',
    description: 'Command-line inventory management agent with natural language processing capabilities for intelligent inventory tracking and automation.',
    tags: ['Agentic AI', 'CLI', 'Python', 'Natural Language Processing'],
    githubUrl: 'https://github.com/Qiratsumra/inventory_agent',
    category: 'agentic-ai',
    techStack: ['Python', 'CLI Development', 'Agent Systems']
  },
  {
    id: 3,
    title: 'E-Commerce Web Application',
    description: 'Full-stack e-commerce platform with product listings, wishlist functionality, shopping cart, and detailed product pages. Implemented dynamic routing, optimized image loading, and smooth animations for enhanced user experience.',
    tags: ['Full-Stack', 'Next.js', 'TypeScript', 'E-Commerce'],
    githubUrl: 'https://github.com/Qiratsumra/sanity-ecommerce',
    liveUrl: 'https://sanity-ecommerce-qs.vercel.app/',
    category: 'full-stack',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity CMS', 'REST APIs']
  },
  {
    id: 4,
    title: 'TODO App (Full-Stack)',
    description: 'Production-ready task management application with async operations, user authentication, and real-time updates.',
    tags: ['Full-Stack', 'Next.js', 'TypeScript', 'Task Management'],
    githubUrl: 'https://github.com/Qiratsumra/todo-phase-5',
    liveUrl: 'https://todo-phase-3-frontend.vercel.app/',
    category: 'full-stack',
    techStack: ['Next.js', 'TypeScript', 'REST APIs', 'Database Integration']
  },
  {
    id: 5,
    title: 'Book App (AI & Robotics)',
    description: 'Interactive book platform focused on AI and humanoid robotics, featuring responsive design and engaging content delivery.',
    tags: ['Next.js', 'AI Content', 'Full-Stack', 'Educational'],
    githubUrl: 'https://github.com/Qiratsumra/physical-ai-humanoid-robotics-book',
    liveUrl: 'https://ai-robot-book.vercel.app/',
    category: 'full-stack',
    techStack: ['Next.js', 'React', 'TypeScript', 'Content Management']
  },
  {
    id: 6,
    title: 'Food Blog App',
    description: 'Content-driven blog platform with headless CMS integration for seamless content management.',
    tags: ['Full-Stack', 'Next.js', 'Sanity CMS', 'Content Platform'],
    githubUrl: 'https://github.com/Qiratsumra/sanity-food-blog',
    liveUrl: 'https://sanity-food-blog.vercel.app/',
    category: 'full-stack',
    techStack: ['Next.js', 'Sanity CMS', 'TypeScript', 'Responsive Design']
  },
  {
    id: 7,
    title: 'Chatbot (LiteLLM Integration)',
    description: 'Multi-model chatbot using LiteLLM for unified access to multiple LLM providers.',
    tags: ['AI', 'LLM', 'Streamlit', 'Chatbot'],
    githubUrl: 'https://github.com/Qiratsumra/litellm_chatbot',
    liveUrl: 'https://litellmchatbot-qs.streamlit.app/',
    category: 'streamlit',
    techStack: ['Python', 'Streamlit', 'LiteLLM', 'API Integration']
  },
  {
    id: 8,
    title: 'Secure Multi-User Data System',
    description: 'Multi-user data management system with encryption capabilities for secure data handling.',
    tags: ['Python', 'Security', 'Encryption', 'Multi-User'],
    githubUrl: 'https://github.com/Qiratsumra/streamlit_data_encryption',
    liveUrl: 'https://appdataencryption-qs.streamlit.app/',
    category: 'streamlit',
    techStack: ['Python', 'Streamlit', 'Encryption', 'Security Protocols']
  },
  {
    id: 9,
    title: 'Password Security Checker',
    description: 'Real-time password strength analyzer with comprehensive security feedback.',
    tags: ['Python', 'Security', 'Streamlit', 'Validation'],
    githubUrl: 'https://github.com/Qiratsumra/streamlit_password_security_checker',
    liveUrl: 'https://password-security-checker-qs.streamlit.app/',
    category: 'streamlit',
    techStack: ['Python', 'Streamlit', 'Security Analysis']
  },
  {
    id: 10,
    title: 'Text Analyzer App',
    description: 'Comprehensive text analysis tool providing statistics, sentiment analysis, and insights.',
    tags: ['Python', 'NLP', 'Streamlit', 'Analytics'],
    githubUrl: 'https://github.com/Qiratsumra/streamlit_text_analyzer',
    liveUrl: 'https://textanalyzer-qs.streamlit.app/',
    category: 'streamlit',
    techStack: ['Python', 'Streamlit', 'Text Processing']
  },
  {
    id: 11,
    title: 'BMI Calculator',
    description: 'Health metrics calculator with BMI computation and health recommendations.',
    tags: ['Python', 'Health Tech', 'Streamlit', 'Calculator'],
    githubUrl: 'https://github.com/Qiratsumra/streamlit_bmi',
    liveUrl: 'https://bmi-qs.streamlit.app/',
    category: 'streamlit',
    techStack: ['Python', 'Streamlit', 'Data Visualization']
  },
  {
    id: 12,
    title: 'Unit Converter',
    description: 'Multi-unit conversion tool supporting various measurement systems.',
    tags: ['Python', 'Utility', 'Streamlit', 'Converter'],
    githubUrl: 'https://github.com/Qiratsumra/streamlit_unit_converter',
    liveUrl: 'https://unit-converter-qs.streamlit.app/',
    category: 'streamlit',
    techStack: ['Python', 'Streamlit', 'Mathematical Processing']
  },
  {
    id: 13,
    title: 'Number Guessing Game',
    description: 'Interactive number guessing game with AI-powered hints and difficulty levels.',
    tags: ['Python', 'Interactive', 'Streamlit', 'Game'],
    githubUrl: 'https://github.com/Qiratsumra/streamlit_number_guessing',
    liveUrl: 'https://appnumberguessing-qs.streamlit.app/',
    category: 'streamlit',
    techStack: ['Python', 'Streamlit', 'Game Logic']
  },
  {
    id: 14,
    title: 'Portfolio (Previous Version)',
    description: 'Previous portfolio iteration showcasing earlier projects and skills.',
    tags: ['Next.js', 'Portfolio', 'Web Development'],
    githubUrl: 'https://github.com/Qiratsumra/final-portfolio',
    liveUrl: 'https://final-portfolio-qs.vercel.app/',
    category: 'full-stack',
    techStack: ['Next.js', 'React', 'CSS']
  }
];