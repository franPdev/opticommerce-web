import React from 'react';
import { Package, AlertTriangle, ShieldAlert, TrendingUp } from 'lucide-react';
import { KPICard } from './KPICard';
import type { Product } from '../../types/inventory.types';
import { getKPIStats } from '../../services/inventory.service';
import { formatCurrency, formatNumber } from '../../utils/formatters';

interface KPIGridProps {
  products: Product[];
}

export const KPIGrid: React.FC<KPIGridProps> = ({ products }) => {
  const stats = getKPIStats(products);

  const kpis = [
    {
      title: 'Valor Total en Stock',
      value: formatCurrency(stats.totalStockValue),
      change: 5.2,
      changeLabel: 'vs. mes anterior',
      icon: <Package className="w-5 h-5" />,
      trend: 'up' as const,
      color: 'primary' as const,
    },
    {
      title: 'Productos en Riesgo',
      value: stats.atRiskCount.toString(),
      change: -12,
      changeLabel: `de ${products.length} productos`,
      icon: <AlertTriangle className="w-5 h-5" />,
      trend: 'down' as const,
      color: 'warning' as const,
    },
    {
      title: 'Alertas de Quiebre',
      value: stats.stockBreakCount.toString(),
      change: 8,
      changeLabel: 'requieren acción urgente',
      icon: <ShieldAlert className="w-5 h-5" />,
      trend: 'up' as const,
      color: 'danger' as const,
    },
    {
      title: 'Ventas Proyectadas (30d)',
      value: formatNumber(stats.projectedSales30d),
      change: 15.3,
      changeLabel: 'unidades estimadas',
      icon: <TrendingUp className="w-5 h-5" />,
      trend: 'up' as const,
      color: 'success' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '2.5rem' }}>
      {kpis.map((kpi, index) => (
        <KPICard key={kpi.title} {...kpi} delay={index * 80} />
      ))}
    </div>
  );
};
