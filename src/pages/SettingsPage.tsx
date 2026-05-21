import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Settings, Globe, Bell, Database, Key, Webhook } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <Card variant="glass" padding="lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
            <Settings className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Configuración General</h2>
            <p className="text-xs text-text-muted">Ajustes del sistema OptiStock AI</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { icon: <Globe className="w-4 h-4" />, label: 'Idioma', value: 'Español (AR)', badge: null },
            { icon: <Bell className="w-4 h-4" />, label: 'Notificaciones', value: 'Activadas', badge: 'success' as const },
            { icon: <Database className="w-4 h-4" />, label: 'Base de Datos', value: 'Simulación (Mock Data)', badge: 'info' as const },
            { icon: <Key className="w-4 h-4" />, label: 'API Key OpenAI', value: 'No configurada', badge: 'warning' as const },
            { icon: <Webhook className="w-4 h-4" />, label: 'Webhook n8n', value: 'Modo simulación', badge: 'info' as const },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-3 px-4 bg-bg-primary/30 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-text-muted">{item.icon}</span>
                <span className="text-sm text-text-primary">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary">{item.value}</span>
                {item.badge && <Badge variant={item.badge} size="sm" dot />}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card variant="default" padding="lg">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Sobre OptiStock AI</h3>
        <div className="space-y-2 text-xs text-text-muted">
          <p>Versión: 1.0.0</p>
          <p>Stack: React + TypeScript + Tailwind CSS v4 + Recharts</p>
          <p>Integraciones: OpenAI API (simulada) · n8n Webhooks (simulados)</p>
          <p className="text-text-secondary mt-3">
            Proyecto de portfolio desarrollado para demostrar gestión de inventario
            inteligente con agentes de IA.
          </p>
        </div>
      </Card>
    </div>
  );
};
