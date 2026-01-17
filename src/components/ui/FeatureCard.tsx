import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  disabled?: boolean;
  comingSoon?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  disabled = false,
  comingSoon = false,
  onClick,
  children,
  className,
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        'glass-card hover-lift cursor-pointer relative overflow-hidden group',
        disabled && 'disabled-card cursor-not-allowed',
        className
      )}
      onClick={!disabled ? onClick : undefined}
    >
      {comingSoon && (
        <Badge
          variant="secondary"
          className="absolute top-3 right-3 bg-muted text-muted-foreground text-xs"
        >
          Coming Soon
        </Badge>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className={cn(
            'p-2.5 rounded-lg bg-primary/10 text-primary transition-colors',
            !disabled && 'group-hover:bg-primary/20'
          )}>
            <Icon className="w-5 h-5" />
          </div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground mb-4">
          {description}
        </CardDescription>
        {children}
      </CardContent>
    </Card>
  );
}
