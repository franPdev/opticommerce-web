import React, { useState } from 'react';
import { Zap, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useWebhook } from '../../hooks/useWebhook';
import type { WebhookAction } from '../../types/webhook.types';

interface AIActionButtonProps {
  action: WebhookAction;
  label: string;
  description: string;
  data: any;
  variant?: 'ai' | 'primary' | 'danger';
}

export const AIActionButton: React.FC<AIActionButtonProps> = ({
  action,
  label,
  description,
  data,
  variant = 'ai',
}) => {
  const { isExecuting, lastResponse, execute, reset } = useWebhook();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleExecute = async () => {
    setShowConfirm(false);
    await execute(action, data);
    setTimeout(reset, 5000);
  };

  if (lastResponse) {
    return (
      <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium ${
        lastResponse.success
          ? 'bg-success-500/10 text-success-400 border border-success-500/20'
          : 'bg-danger-500/10 text-danger-400 border border-danger-500/20'
      }`}>
        {lastResponse.success ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
        {lastResponse.message}
      </div>
    );
  }

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2 p-3 bg-bg-elevated rounded-xl border border-border-default animate-fade-in">
        <p className="text-xs text-text-secondary flex-1">{description}</p>
        <Button size="sm" variant="ghost" onClick={() => setShowConfirm(false)}>Cancelar</Button>
        <Button size="sm" variant={variant} onClick={handleExecute} loading={isExecuting}>
          Confirmar
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant={variant}
      size="md"
      icon={isExecuting ? <Loader2 className="animate-spin" /> : <Zap className="w-4 h-4" />}
      onClick={() => setShowConfirm(true)}
      loading={isExecuting}
    >
      {label}
    </Button>
  );
};
