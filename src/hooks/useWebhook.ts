import { useState, useCallback } from 'react';
import type { WebhookPayload, WebhookResponse } from '../types/webhook.types';
import { executePromotion, createPurchaseOrder, sendAlertNotification } from '../services/webhook.service';

export const useWebhook = () => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastResponse, setLastResponse] = useState<WebhookResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (
    action: 'execute_promotion' | 'create_purchase_order' | 'alert_notification',
    data: WebhookPayload['data']
  ) => {
    setIsExecuting(true);
    setError(null);
    setLastResponse(null);
    try {
      let response: WebhookResponse;
      switch (action) {
        case 'execute_promotion':
          response = await executePromotion(data);
          break;
        case 'create_purchase_order':
          response = await createPurchaseOrder(data);
          break;
        case 'alert_notification':
          response = await sendAlertNotification(data);
          break;
      }
      setLastResponse(response);
      return response;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al ejecutar webhook';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setIsExecuting(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLastResponse(null);
    setError(null);
  }, []);

  return { isExecuting, lastResponse, error, execute, reset };
};
