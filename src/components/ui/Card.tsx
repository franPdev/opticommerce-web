import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient-border';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const paddingStyles = {
  none: { padding: 0 },
  sm: { padding: '1.5rem' },
  md: { padding: '2rem' },
  lg: { padding: '2.5rem' },
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  hover = false,
  padding = 'md',
  onClick,
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';

  const variantClasses = {
    default: 'bg-bg-surface border border-border-default',
    glass: 'glass',
    'gradient-border': 'bg-bg-surface gradient-border',
  };

  const hoverClasses = hover
    ? 'hover:shadow-card-hover hover:border-border-hover hover:-translate-y-0.5 cursor-pointer'
    : '';

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      style={paddingStyles[padding]}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};
