import React from 'react';
import { AlertTriangle, Clock, TrendingDown, Archive } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { RiskAlert as RiskAlertType } from '../../types/ai.types';
import { formatCurrency } from '../../utils/formatters';

interface RiskAlertProps {
  alerts: RiskAlertType[];
}

const riskIcons = {
  expiration: <Clock className="w-5 h-5" />,
  trend_decline: <TrendingDown className="w-5 h-5" />,
  overstock: <Archive className="w-5 h-5" />,
  seasonal_risk: <AlertTriangle className="w-5 h-5" />,
};

const riskLabels = {
  expiration: 'Vencimiento',
  trend_decline: 'Tendencia Negativa',
  overstock: 'Sobrestock',
  seasonal_risk: 'Riesgo Estacional',
};

const severityVariant: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
  critical: 'danger',
};

export const RiskAlertComponent: React.FC<RiskAlertProps> = ({ alerts }) => {
  return (
    <div className="space-y-3 stagger-children">
      {alerts.map((alert) => (
        <Card key={alert.id} variant="default" padding="md" hover>
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              alert.severity === 'critical' ? 'bg-danger-500/15 text-danger-400' :
              alert.severity === 'high' ? 'bg-danger-500/10 text-danger-400' :
              alert.severity === 'medium' ? 'bg-warning-500/10 text-warning-400' :
              'bg-success-500/10 text-success-400'
            }`}>
              {riskIcons[alert.riskType]}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h4 className="text-sm font-semibold text-text-primary">{alert.productName}</h4>
                <Badge variant={severityVariant[alert.severity]} size="sm" dot>
                  {alert.severity === 'critical' ? 'Crítico' : alert.severity === 'high' ? 'Alto' : alert.severity === 'medium' ? 'Medio' : 'Bajo'}
                </Badge>
                <Badge variant="neutral" size="sm">{riskLabels[alert.riskType]}</Badge>
              </div>

              <p className="text-xs text-text-muted leading-relaxed mb-2">{alert.recommendation}</p>

              <div className="flex items-center gap-4 text-xs">
                <span className="text-text-muted">
                  Stock: <span className="text-text-secondary font-medium">{alert.currentStock} uds</span>
                </span>
                {alert.daysUntilIssue > 0 && (
                  <span className="text-text-muted">
                    Plazo: <span className={`font-medium ${alert.daysUntilIssue <= 14 ? 'text-danger-400' : 'text-warning-400'}`}>
                      {alert.daysUntilIssue} días
                    </span>
                  </span>
                )}
                <span className="text-text-muted">
                  Pérdida est.: <span className="text-danger-400 font-medium">{formatCurrency(alert.estimatedLoss)}</span>
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
