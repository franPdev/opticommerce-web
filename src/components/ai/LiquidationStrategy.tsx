import React, { useState } from 'react';
import { Mail, Share2, Copy, Check, Tag } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { LiquidationStrategy as LiquidationStrategyType } from '../../types/ai.types';
import { formatCurrency } from '../../utils/formatters';

interface LiquidationStrategyProps {
  strategy: LiquidationStrategyType;
}

export const LiquidationStrategyComponent: React.FC<LiquidationStrategyProps> = ({ strategy }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'email' | 'social'>('email');

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const recoveryRate = ((strategy.estimatedRecovery / strategy.totalAtRisk) * 100).toFixed(0);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Summary */}
      <Card variant="gradient-border" padding="md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl gradient-danger flex items-center justify-center">
            <Tag className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Estrategia de Liquidación</h4>
            <p className="text-xs text-text-muted">{strategy.targetProducts.length} productos · Descuento promedio: {strategy.suggestedDiscount}%</p>
          </div>
          <Badge variant={strategy.urgency === 'high' ? 'danger' : strategy.urgency === 'medium' ? 'warning' : 'success'} size="sm" dot>
            Urgencia {strategy.urgency === 'high' ? 'Alta' : strategy.urgency === 'medium' ? 'Media' : 'Baja'}
          </Badge>
        </div>

        {/* Recovery stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-bg-primary/50 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-danger-400">{formatCurrency(strategy.totalAtRisk)}</p>
            <p className="text-[11px] text-text-muted">Capital en riesgo</p>
          </div>
          <div className="bg-bg-primary/50 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-success-400">{formatCurrency(strategy.estimatedRecovery)}</p>
            <p className="text-[11px] text-text-muted">Recuperación est.</p>
          </div>
          <div className="bg-bg-primary/50 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-primary-400">{recoveryRate}%</p>
            <p className="text-[11px] text-text-muted">Tasa recuperación</p>
          </div>
        </div>

        {/* Products */}
        <div className="space-y-2">
          {strategy.targetProducts.map((product) => {
            const discount = Math.round((1 - product.suggestedPrice / product.currentPrice) * 100);
            return (
              <div key={product.productId} className="flex items-center justify-between py-2 px-3 bg-bg-primary/30 rounded-lg">
                <div className="flex-1">
                  <span className="text-sm text-text-primary">{product.productName}</span>
                  <span className="text-xs text-text-muted ml-2">x{product.quantity}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-text-muted line-through">{formatCurrency(product.currentPrice)}</span>
                  <span className="text-success-400 font-semibold">{formatCurrency(product.suggestedPrice)}</span>
                  <Badge variant="danger" size="sm">-{discount}%</Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Copy Content */}
      <Card variant="default" padding="md">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setActiveTab('email')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'email' ? 'bg-primary-500/15 text-primary-400' : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <Mail className="w-3.5 h-3.5" /> Email Marketing
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'social' ? 'bg-primary-500/15 text-primary-400' : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" /> Redes Sociales
          </button>
        </div>

        {activeTab === 'email' && (
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-text-muted font-medium">Asunto</label>
                <button
                  onClick={() => copyToClipboard(strategy.emailSubject, 'subject')}
                  className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1"
                >
                  {copiedField === 'subject' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedField === 'subject' ? 'Copiado' : 'Copiar'}
                </button>
              </div>
              <div className="bg-bg-primary/50 rounded-lg p-3 text-sm text-text-secondary border border-border-default">
                {strategy.emailSubject}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-text-muted font-medium">Cuerpo del Email</label>
                <button
                  onClick={() => copyToClipboard(strategy.emailBody, 'body')}
                  className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1"
                >
                  {copiedField === 'body' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedField === 'body' ? 'Copiado' : 'Copiar'}
                </button>
              </div>
              <div className="bg-bg-primary/50 rounded-lg p-3 text-sm text-text-secondary border border-border-default whitespace-pre-line max-h-48 overflow-y-auto">
                {strategy.emailBody}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-text-muted font-medium">Post para Redes</label>
              <button
                onClick={() => copyToClipboard(strategy.socialMediaPost, 'social')}
                className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1"
              >
                {copiedField === 'social' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copiedField === 'social' ? 'Copiado' : 'Copiar'}
              </button>
            </div>
            <div className="bg-bg-primary/50 rounded-lg p-3 text-sm text-text-secondary border border-border-default whitespace-pre-line">
              {strategy.socialMediaPost}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
