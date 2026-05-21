import React, { useState } from 'react';
import { Brain, AlertTriangle, Tag, ShoppingCart, Sparkles, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { RiskAlertComponent } from './RiskAlert';
import { LiquidationStrategyComponent } from './LiquidationStrategy';
import { PurchasePredictionComponent } from './PurchasePrediction';
import { AIActionButton } from './AIActionButton';
import type { AIInsightsResponse } from '../../types/ai.types';
import type { Product } from '../../types/inventory.types';

interface AIInsightsPanelProps {
  insights: AIInsightsResponse | null;
  isAnalyzing: boolean;
  onAnalyze: (products: Product[]) => void;
  products: Product[];
}

type TabId = 'risks' | 'liquidation' | 'predictions';

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'risks', label: 'Alertas de Riesgo', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'liquidation', label: 'Estrategia Liquidación', icon: <Tag className="w-4 h-4" /> },
  { id: 'predictions', label: 'Predicción de Compras', icon: <ShoppingCart className="w-4 h-4" /> },
];

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({
  insights,
  isAnalyzing,
  onAnalyze,
  products,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>('risks');

  return (
    <div className="flex flex-col" style={{ gap: '3rem' }}>
      {/* Header */}
      <Card variant="glass" padding="lg" className="gradient-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl gradient-ai flex items-center justify-center animate-pulse-glow">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold gradient-text-ai">AI Insights Panel</h2>
              <p className="text-xs text-text-muted mt-0.5">
                Análisis inteligente de inventario con agentes de IA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {insights && (
              <span className="text-xs text-text-muted flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {(insights.processingTimeMs / 1000).toFixed(1)}s
              </span>
            )}
            <Button
              variant="ai"
              size="md"
              icon={<Sparkles className="w-4 h-4" />}
              onClick={() => onAnalyze(products)}
              loading={isAnalyzing}
            >
              {insights ? 'Re-analizar' : 'Analizar Inventario'}
            </Button>
          </div>
        </div>

        {/* AI Summary */}
        {insights && (
          <div className="mt-4 p-4 bg-bg-primary/50 rounded-xl border border-accent-500/10">
            <p className="text-sm text-text-secondary leading-relaxed">
              <Sparkles className="w-3.5 h-3.5 inline text-accent-400 mr-1.5" />
              {insights.summary}
            </p>
          </div>
        )}

        {isAnalyzing && (
          <div className="mt-4 p-4 bg-bg-primary/50 rounded-xl border border-accent-500/10">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full gradient-ai animate-spin-slow" />
              <div className="flex-1">
                <p className="text-sm text-accent-400 font-medium">Analizando inventario...</p>
                <p className="text-xs text-text-muted mt-0.5">
                  El agente de IA está evaluando {products.length} productos
                </p>
              </div>
            </div>
            <div className="flex gap-1 mt-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-accent-400"
                  style={{ animation: `typing 1.4s infinite`, animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Tabs + Content */}
      {insights && (
        <>
          <div className="flex items-center gap-1 bg-bg-surface rounded-xl p-1 border border-border-default">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-bg-elevated text-text-primary shadow-sm'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'risks' && (
              <RiskAlertComponent alerts={insights.riskAlerts} />
            )}

            {activeTab === 'liquidation' && insights.liquidationStrategy && (
              <div className="flex flex-col" style={{ gap: '2rem' }}>
                <LiquidationStrategyComponent strategy={insights.liquidationStrategy} />
                <div className="flex flex-wrap gap-3">
                  <AIActionButton
                    action="execute_promotion"
                    label="Enviar Promoción por Email"
                    description="Se enviará el email de promoción a todos los clientes suscritos con los descuentos configurados."
                    data={{
                      type: 'promotion',
                      products: insights.liquidationStrategy.targetProducts,
                      emailSubject: insights.liquidationStrategy.emailSubject,
                      emailBody: insights.liquidationStrategy.emailBody,
                      socialMediaPost: insights.liquidationStrategy.socialMediaPost,
                      targetAudience: 'all_subscribers',
                      validUntil: insights.liquidationStrategy.validUntil,
                    }}
                  />
                </div>
              </div>
            )}

            {activeTab === 'predictions' && (
              <div className="flex flex-col" style={{ gap: '2rem' }}>
                <PurchasePredictionComponent predictions={insights.purchasePredictions} />
                <div className="flex flex-wrap gap-3">
                  <AIActionButton
                    action="create_purchase_order"
                    label="Generar Orden de Compra"
                    description="Se creará una orden de compra automática y se enviará al proveedor correspondiente."
                    data={{
                      type: 'purchase_order',
                      supplier: 'Múltiples proveedores',
                      items: insights.purchasePredictions.map((p) => ({
                        productId: p.productId,
                        productName: p.productName,
                        quantity: p.suggestedOrderQuantity,
                        unitCost: p.estimatedCost / p.suggestedOrderQuantity,
                      })),
                      totalCost: insights.purchasePredictions.reduce((s, p) => s + p.estimatedCost, 0),
                      requestedDeliveryDate: insights.purchasePredictions[0]?.suggestedOrderDate || '',
                      priority: 'urgent',
                    }}
                    variant="primary"
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Empty state */}
      {!insights && !isAnalyzing && (
        <Card variant="default" padding="lg" className="text-center">
          <div className="w-16 h-16 rounded-2xl gradient-ai mx-auto flex items-center justify-center mb-4 opacity-40">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-base font-semibold text-text-secondary mb-1">
            Sin análisis activo
          </h3>
          <p className="text-sm text-text-muted max-w-md mx-auto">
            Haz clic en "Analizar Inventario" para que el agente de IA evalúe tu stock actual
            y genere recomendaciones inteligentes.
          </p>
        </Card>
      )}
    </div>
  );
};
