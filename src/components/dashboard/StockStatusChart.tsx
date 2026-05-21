import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card } from '../ui/Card';
import { mockCategoryDistribution } from '../../data/mockInventory';
import { formatNumber } from '../../utils/formatters';

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="glass-elevated rounded-xl px-4 py-3 shadow-lg">
      <p className="text-sm font-semibold text-text-primary">{data.label}</p>
      <p className="text-xs text-text-muted mt-1">{formatNumber(data.value)} unidades</p>
      <p className="text-xs text-text-muted">{data.count} productos</p>
    </div>
  );
};

export const StockStatusChart: React.FC = () => {
  const total = mockCategoryDistribution.reduce((s, d) => s + d.value, 0);

  return (
    <Card variant="glass" padding="lg" className="animate-fade-in">
      <h3 className="text-base font-semibold text-text-primary mb-1">Distribución de Stock</h3>
      <p className="text-xs text-text-muted mb-4">Por categoría de producto</p>

      <div className="flex items-center gap-6">
        <div className="w-[180px] h-[180px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockCategoryDistribution}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {mockCategoryDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} opacity={0.85} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-text-primary">{formatNumber(total)}</span>
            <span className="text-[10px] text-text-muted">unidades</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {mockCategoryDistribution.map((cat) => (
            <div key={cat.category} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-text-secondary text-xs">{cat.label}</span>
              </div>
              <span className="text-text-primary font-medium text-xs">
                {formatNumber(cat.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
