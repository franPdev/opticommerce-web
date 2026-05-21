import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { StatusIndicator } from '../ui/StatusIndicator';

interface HeaderProps {
  title: string;
  subtitle?: string;
  unreadAlerts: number;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, unreadAlerts }) => {
  return (
    <header 
      className="h-20 border-b border-border-default bg-bg-surface/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-30"
      style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
    >
      {/* Left: Title */}
      <div>
        <h1 className="text-xl font-bold text-text-primary">{title}</h1>
        {subtitle && <p className="text-sm text-text-muted mt-1">{subtitle}</p>}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-8">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-bg-elevated rounded-xl px-3 py-2 border border-border-default focus-within:border-primary-500/50 transition-colors">
          <Search className="w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Buscar productos..."
            className="bg-transparent text-sm text-text-primary placeholder-text-muted outline-none w-48"
          />
          <kbd className="hidden lg:inline-flex text-[10px] text-text-muted bg-bg-primary px-1.5 py-0.5 rounded border border-border-default">
            ⌘K
          </kbd>
        </div>

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
