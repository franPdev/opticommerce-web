import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from '../ui/Card';

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'stable';
  color: 'primary' | 'success' | 'warning' | 'danger' | 'accent';
  delay?: number;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  trend,
  color,
  delay = 0,
}) => {
  const colorMap = {
    primary: { bg: 'bg-primary-500/10', text: 'text-primary-400', glow: 'shadow-glow-primary' },
    success: { bg: 'bg-success-500/10', text: 'text-success-400', glow: 'shadow-glow-success' },
    warning: { bg: 'bg-warning-500/10', text: 'text-warning-400', glow: '' },
    danger: { bg: 'bg-danger-500/10', text: 'text-danger-400', glow: 'shadow-glow-danger' },
    accent: { bg: 'bg-accent-500/10', text: 'text-accent-400', glow: 'shadow-glow-accent' },
  };

  const trendColors = {
    up: 'text-success-400',
    down: 'text-danger-400',
    stable: 'text-text-muted',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  const colors = colorMap[color];

  return (
    <Card
      variant="glass"
      hover
      className="animate-fade-in"
      padding="lg"
    >
      <div style={{ animationDelay: `${delay}ms` }}>
        <div className="flex items-start justify-between mb-4">
          <div className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center`}>
            <span className={colors.text}>{icon}</span>
          </div>
          <div className={`flex items-center gap-1 text-xs font-medium ${trendColors[trend]}`}>
            <TrendIcon className="w-3.5 h-3.5" />
            <span>{change > 0 ? '+' : ''}{change}%</span>
          </div>
        </div>

        <p className="text-text-muted text-sm mb-1">{title}</p>
        <p className="text-2xl font-bold text-text-primary tracking-tight">{value}</p>
        <p className="text-xs text-text-muted mt-1">{changeLabel}</p>
      </div>
    </Card>
  );
};
