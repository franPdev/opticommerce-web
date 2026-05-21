import React from 'react';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'violet' | 'neutral';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  dot = false,
}) => {
  const variantClasses = {
    success: 'bg-success-500/15 text-success-400 border-success-500/20',
    warning: 'bg-warning-500/15 text-warning-400 border-warning-500/20',
    danger: 'bg-danger-500/15 text-danger-400 border-danger-500/20',
    info: 'bg-accent-500/15 text-accent-400 border-accent-500/20',
    primary: 'bg-primary-500/15 text-primary-400 border-primary-500/20',
    violet: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
    neutral: 'bg-bg-elevated text-text-secondary border-border-default',
  };

  const dotColors = {
    success: 'bg-success-400',
    warning: 'bg-warning-400',
    danger: 'bg-danger-400',
    info: 'bg-accent-400',
    primary: 'bg-primary-400',
    violet: 'bg-violet-400',
    neutral: 'bg-text-muted',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-lg border ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};
