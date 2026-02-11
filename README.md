# Qirat Saeed - Portfolio

Welcome to my professional portfolio showcasing my work in Agentic AI and Full-Stack Development.

## About

This portfolio highlights my expertise in:
- Agentic AI Systems and Autonomous Agents
- Full-Stack Web Development with Next.js and TypeScript
- Prompt Engineering and LLM Integration
- Modern AI Python Development

## Features

- Fully responsive design
- Dark/light mode toggle
- Interactive project showcase with filtering
- Detailed sections on AI systems and development work
- Contact form with validation
- Modern UI with animations

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theming**: next-themes

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── layout.tsx          # Root layout with metadata & theme provider
├── page.tsx            # Main portfolio page
├── globals.css         # Global styles & Tailwind imports
components/
├── ui/                 # Shadcn UI components
├── sections/           # Portfolio sections
├── ProjectCard.tsx     # Reusable project card component
├── ProjectFilter.tsx   # Filter tabs for projects
├── SkillBadge.tsx      # Skill badge component
├── Header.tsx          # Navigation header with theme toggle
├── Footer.tsx          # Footer with links & copyright
├── ThemeToggle.tsx     # Dark/light mode toggle button
└── SocialLinks.tsx     # Reusable social media links
lib/
├── utils.ts            # Utility functions
├── types.ts            # TypeScript type definitions
└── data/
    ├── projects.ts     # All project data
    ├── skills.ts       # All skills data
    └── constants.ts    # Constants (social links, etc.)
```

## Deployment

This project is ready for deployment on Vercel:
1. Push code to GitHub repository
2. Import repository in Vercel
3. Configure build settings (Framework Preset: Next.js)
4. Deploy

## License

This project is licensed under the MIT License."# qirat-saeed-portfolio" 
