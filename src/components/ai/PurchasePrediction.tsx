import React from 'react';
import { ShoppingCart, TrendingUp, TrendingDown, Minus, CalendarClock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { PurchasePrediction as PredictionType } from '../../types/ai.types';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface PurchasePredictionProps {
  predictions: PredictionType[];
}

const priorityVariant: Record<string, 'danger' | 'warning' | 'success' | 'info'> = {
  urgent: 'danger',
  high: 'warning',
  medium: 'info',
  low: 'success',
};

const priorityLabel: Record<string, string> = {
  urgent: 'Urgente',
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
};

const trendIcon = {
  rising: <TrendingUp className="w-3.5 h-3.5 text-success-400" />,
  stable: <Minus className="w-3.5 h-3.5 text-text-muted" />,
  declining: <TrendingDown className="w-3.5 h-3.5 text-danger-400" />,
};

export const PurchasePredictionComponent: React.FC<PurchasePredictionProps> = ({ predictions }) => {
  const totalCost = predictions.reduce((sum, p) => sum + p.estimatedCost, 0);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Summary */}
      <Card variant="gradient-border" padding="md">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl gradient-success flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Predicción de Compras</h4>
            <p className="text-xs text-text-muted">Próximos 30 días · {predictions.length} productos</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs text-text-muted">Inversión estimada total:</span>
          <span className="text-lg font-bold text-accent-400">{formatCurrency(totalCost)}</span>
        </div>
      </Card>

      {/* Predictions Table */}
      <Card variant="default" padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-default">
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-text-muted uppercase">Producto</th>
                <th className="px-4 py-3 text-center text-[11px] font-semibold text-text-muted uppercase">Stock Actual</th>
                <th className="px-4 py-3 text-center text-[11px] font-semibold text-text-muted uppercase">Demanda Est.</th>
                <th className="px-4 py-3 text-center text-[11px] font-semibold text-text-muted uppercase">Pedir</th>
                <th className="px-4 py-3 text-center text-[11px] font-semibold text-text-muted uppercase">Confianza</th>
                <th className="px-4 py-3 text-center text-[11px] font-semibold text-text-muted uppercase">Tendencia</th>
                <th className="px-4 py-3 text-center text-[11px] font-semibold text-text-muted uppercase">Fecha Pedido</th>
                <th className="px-4 py-3 text-right text-[11px] font-semibold text-text-muted uppercase">Costo</th>
                <th className="px-4 py-3 text-center text-[11px] font-semibold text-text-muted uppercase">Prioridad</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((pred) => (
                <tr key={pred.id} className="border-b border-border-default/50 hover:bg-bg-elevated/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-text-primary">{pred.productName}</p>
                    <p className="text-[11px] text-text-muted">{pred.category}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-semibold ${pred.currentStock === 0 ? 'text-danger-400' : 'text-text-primary'}`}>
                      {pred.currentStock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-text-secondary">{pred.predictedDemand}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-sm font-bold text-accent-400">{pred.suggestedOrderQuantity}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-1.5 bg-bg-primary rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            pred.confidence >= 0.9 ? 'bg-success-400' :
                            pred.confidence >= 0.8 ? 'bg-accent-400' :
                            'bg-warning-400'
                          }`}
                          style={{ width: `${pred.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-muted">{Math.round(pred.confidence * 100)}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">{trendIcon[pred.trend]}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs text-text-secondary flex items-center justify-center gap-1">
                      <CalendarClock className="w-3 h-3" />
                      {formatDate(pred.suggestedOrderDate)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-text-primary font-medium">
                    {formatCurrency(pred.estimatedCost)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant={priorityVariant[pred.priority]} size="sm" dot>
                      {priorityLabel[pred.priority]}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
