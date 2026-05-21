import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Brain,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/inventario', label: 'Inventario', icon: Package },
  { path: '/ai-insights', label: 'AI Insights', icon: Brain, isAI: true },
  { path: '/configuracion', label: 'Configuración', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();

  return (
    <aside
      className="fixed left-0 top-0 h-screen bg-bg-surface border-r border-border-default flex flex-col z-40 transition-all duration-300"
      style={{ width: collapsed ? '72px' : '260px' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-20 border-b border-border-default">
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-base font-bold gradient-text-primary leading-tight">OptiStock</h1>
            <p className="text-[10px] text-text-muted font-medium tracking-widest uppercase">AI Platform</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? item.isAI
                    ? 'bg-accent-500/10 text-accent-400'
                    : 'bg-primary-500/10 text-primary-400'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${
                isActive && item.isAI ? 'text-accent-400' : ''
              }`} />
              {!collapsed && (
                <span className="animate-fade-in">{item.label}</span>
              )}
              {!collapsed && item.isAI && (
                <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-md gradient-ai text-white">
                  IA
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="px-3 pb-4">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-text-muted hover:text-text-secondary hover:bg-bg-elevated transition-all duration-200 text-sm"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span>Colapsar</span>}
        </button>
      </div>
    </aside>
  );
};
