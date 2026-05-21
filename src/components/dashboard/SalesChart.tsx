import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Card } from '../ui/Card';
import { mockSalesData } from '../../data/mockInventory';
import { formatCurrency } from '../../utils/formatters';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="glass-elevated rounded-xl px-4 py-3 shadow-lg">
      <p className="text-xs text-text-muted mb-2 font-medium">{label}</p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-text-secondary">{entry.name}:</span>
          <span className="font-semibold text-text-primary">
            {entry.name.includes('Revenue') || entry.name.includes('Ingresos')
              ? formatCurrency(entry.value)
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export const SalesChart: React.FC = () => {
  return (
    <Card variant="glass" padding="lg" className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-text-primary">Ventas e Ingresos</h3>
          <p className="text-xs text-text-muted mt-0.5">Últimos 12 meses + proyección</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-1.5 rounded-full bg-primary-500" />
            <span className="text-text-muted">Ventas reales</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-1.5 rounded-full bg-accent-500 opacity-60" />
            <span className="text-text-muted">Proyección</span>
          </span>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockSalesData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="sales"
              name="Ventas"
              stroke="#6366F1"
              strokeWidth={2.5}
              fill="url(#salesGradient)"
              dot={false}
              activeDot={{ r: 5, fill: '#6366F1', stroke: '#fff', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="projected"
              name="Proyección"
              stroke="#06B6D4"
              strokeWidth={2}
              strokeDasharray="6 4"
              fill="url(#projectedGradient)"
              dot={false}
              activeDot={{ r: 5, fill: '#06B6D4', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
