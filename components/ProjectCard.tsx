'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/lib/types';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  index: number;
  viewMode?: 'grid' | 'detailed';
  isHovered?: boolean;
}

export default function ProjectCard({ project, index, viewMode = 'grid', isHovered = false }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="h-full flex flex-col bg-card border-border overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/30">
        <CardContent className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {project.category.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>

          <p className="text-muted-foreground mb-4 text-sm">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 3).map((tech, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{project.techStack.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
            >
              <Github className="h-4 w-4" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}