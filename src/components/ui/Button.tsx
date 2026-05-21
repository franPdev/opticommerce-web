import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'ai';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'gradient-primary text-white hover:opacity-90 focus:ring-primary-500 shadow-lg hover:shadow-glow-primary',
    secondary: 'bg-bg-elevated text-text-primary border border-border-default hover:border-border-hover hover:bg-bg-hover focus:ring-primary-500',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated focus:ring-primary-500',
    danger: 'bg-danger-600 text-white hover:bg-danger-500 focus:ring-danger-500 shadow-lg hover:shadow-glow-danger',
    ai: 'gradient-ai text-white hover:opacity-90 focus:ring-accent-500 shadow-lg hover:shadow-glow-accent',
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-base px-6 py-3',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
      {children}
    </button>
  );
};
