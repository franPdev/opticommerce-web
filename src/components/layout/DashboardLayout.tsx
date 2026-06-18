import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useInventoryContext } from '../../context/InventoryContext';

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Vista general de tu inventario' },
  '/inventario': { title: 'Inventario', subtitle: 'Gestión de productos y stock' },
  '/ai-insights': { title: 'AI Insights', subtitle: 'Análisis inteligente con IA' },
  '/configuracion': { title: 'Configuración', subtitle: 'Ajustes del sistema' },
};

export const DashboardLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { unreadAlerts } = useInventoryContext();

  const pageInfo = pageTitles[location.pathname] || { title: 'OptiStock AI', subtitle: '' };

  return (
    <div className="flex min-h-screen bg-bg-primary">
      {/* Sidebar overlay backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <Header
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          unreadAlerts={unreadAlerts}
          onMenuToggle={() => setMobileOpen(!mobileOpen)}
        />
        <main className="p-6 sm:p-8 md:p-12 lg:p-14">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
