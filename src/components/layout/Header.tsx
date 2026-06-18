import React from 'react';
import { Bell, User, Menu } from 'lucide-react';
import { StatusIndicator } from '../ui/StatusIndicator';

interface HeaderProps {
  title: string;
  subtitle?: string;
  unreadAlerts: number;
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, unreadAlerts, onMenuToggle }) => {
  return (
    <header 
      className="h-20 border-b border-border-default bg-bg-surface/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-30 px-4 sm:px-6 md:px-10"
    >
      {/* Left: Title & Mobile menu button */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 -ml-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors flex-shrink-0"
          aria-label="Abrir menú"
        >
          <Menu className="w-5.5 h-5.5" />
        </button>
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg md:text-xl font-bold text-text-primary truncate">{title}</h1>
          {subtitle && <p className="text-xs md:text-sm text-text-muted mt-0.5 md:mt-1 truncate hidden sm:block">{subtitle}</p>}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 sm:gap-6 md:gap-8 flex-shrink-0">

        {/* Status */}
        <StatusIndicator status="online" label="Sistema activo" />

        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors">
          <Bell className="w-5 h-5" />
          {unreadAlerts > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-danger-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
              {unreadAlerts}
            </span>
          )}
        </button>

        {/* User avatar */}
        <button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-bg-elevated transition-colors">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </button>
      </div>
    </header>
  );
};
