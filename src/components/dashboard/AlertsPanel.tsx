import React from 'react';
import {
  AlertTriangle, PackageX, Clock, TrendingDown, TrendingUp, Archive,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { StockAlert, AlertType, AlertSeverity } from '../../types/inventory.types';
import { formatRelativeTime } from '../../utils/formatters';

interface AlertsPanelProps {
  alerts: StockAlert[];
  compact?: boolean;
}

const alertIcons: Record<AlertType, React.ReactNode> = {
  low_stock: <Archive className="w-4 h-4" />,
  out_of_stock: <PackageX className="w-4 h-4" />,
  expiring_soon: <Clock className="w-4 h-4" />,
  overstock: <Archive className="w-4 h-4" />,
  trend_decline: <TrendingDown className="w-4 h-4" />,
  demand_spike: <TrendingUp className="w-4 h-4" />,
};

const severityVariant: Record<AlertSeverity, 'info' | 'success' | 'warning' | 'danger'> = {
  info: 'info',
  low: 'success',
  medium: 'warning',
  high: 'danger',
  critical: 'danger',
};

const severityLabel: Record<AlertSeverity, string> = {
  info: 'Info',
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
  critical: 'Crítica',
};

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts, compact = false }) => {
  const displayAlerts = compact ? alerts.slice(0, 5) : alerts;

  return (
    <Card variant="glass" padding="none" className="animate-fade-in">
      <div className="border-b border-border-default flex items-center justify-between" style={{ padding: '2rem' }}>
        <div>
          <h3 className="text-base font-semibold text-text-primary flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning-400" />
            Alertas Activas
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            {alerts.filter((a) => !a.isRead).length} sin leer
          </p>
        </div>
      </div>

      <div className="divide-y divide-border-default/50">
        {displayAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`px-8 py-5 hover:bg-bg-elevated/50 transition-colors ${
              !alert.isRead ? 'border-l-2 border-l-primary-500' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 ${
                alert.severity === 'critical' || alert.severity === 'high'
                  ? 'text-danger-400'
                  : alert.severity === 'medium'
                  ? 'text-warning-400'
                  : 'text-text-muted'
              }`}>
                {alertIcons[alert.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-text-primary truncate">
                    {alert.productName}
                  </span>
                  <Badge variant={severityVariant[alert.severity]} size="sm">
                    {severityLabel[alert.severity]}
                  </Badge>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">{alert.message}</p>
                <p className="text-[11px] text-text-muted mt-1.5">
                  {formatRelativeTime(alert.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {compact && alerts.length > 5 && (
        <div className="p-3 text-center border-t border-border-default">
          <span className="text-xs text-primary-400 hover:text-primary-300 cursor-pointer">
            Ver todas las alertas ({alerts.length})
          </span>
        </div>
      )}
    </Card>
  );
};
