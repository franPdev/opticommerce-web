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
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/inventario', label: 'Inventario', icon: Package },
  { path: '/ai-insights', label: 'AI Insights', icon: Brain, isAI: true },
  { path: '/configuracion', label: 'Configuración', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggle,
  mobileOpen = false,
  onMobileClose,
}) => {
  const location = useLocation();


  return (
    <aside
      className={`fixed md:sticky top-0 left-0 h-screen bg-bg-surface border-r border-border-default flex flex-col transition-all duration-300 ${
        mobileOpen ? 'translate-x-0 z-50' : '-translate-x-full z-50'
      } md:translate-x-0 md:z-10 ${collapsed ? 'md:w-[72px]' : 'md:w-64'} w-64 flex-shrink-0`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-20 border-b border-border-default">
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className={`animate-fade-in ${collapsed ? 'md:hidden' : 'block'}`}>
          <h1 className="text-base font-bold gradient-text-primary leading-tight">OptiStock</h1>
          <p className="text-[10px] text-text-muted font-medium tracking-widest uppercase">AI Platform</p>
        </div>
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
              onClick={onMobileClose}
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
              <span className={`animate-fade-in ${collapsed ? 'md:hidden' : 'block'}`}>
                {item.label}
              </span>
              {item.isAI && (
                <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-md gradient-ai text-white ${collapsed ? 'md:hidden' : 'block'}`}>
                  IA
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="px-3 pb-4 hidden md:block">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center py-2.5 rounded-xl text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-all duration-200"
          aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  );
};
