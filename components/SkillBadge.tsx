import { Badge } from '@/components/ui/badge';
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  skill: string;
  category?: string;
  className?: string;
}

export default function SkillBadge({ skill, category, className }: SkillBadgeProps) {
  // Define color variants based on category
  const getVariant = () => {
    if (!category) return 'default';

    switch (category.toLowerCase()) {
      case 'ai & machine learning':
        return 'default';
      case 'frontend development':
        return 'secondary';
      case 'backend development':
        return 'outline';
      case 'tools & frameworks':
        return 'destructive';
      case 'databases':
        return 'secondary';
      case 'professional skills':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <Badge variant={getVariant()} className={cn("m-1 text-sm", className)}>
      {skill}
    </Badge>
  );
}