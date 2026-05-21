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
  const location = useLocation();
  const { unreadAlerts } = useInventoryContext();

  const pageInfo = pageTitles[location.pathname] || { title: 'OptiStock AI', subtitle: '' };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div
        className="transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? '72px' : '260px' }}
      >
        <Header
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          unreadAlerts={unreadAlerts}
        />
        <main style={{ padding: '2.5rem' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
