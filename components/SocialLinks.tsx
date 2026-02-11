import { Github, Linkedin, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/data/constants';

export default function SocialLinks() {
  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'mail':
        return <Mail className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-4">
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary transition-colors"
          aria-label={link.name}
        >
          {getIcon(link.icon)}
        </a>
      ))}
    </div>
  );
}