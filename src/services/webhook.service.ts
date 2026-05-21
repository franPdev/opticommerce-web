import type { WebhookPayload, WebhookResponse, WebhookAction } from '../types/webhook.types';
import { WEBHOOK_BASE_URL, WEBHOOK_ENDPOINTS } from '../utils/constants';

/**
 * Sends a webhook to n8n for automation execution.
 * In production, configure VITE_WEBHOOK_BASE_URL in .env
 */
const sendWebhook = async (
  action: WebhookAction,
  data: WebhookPayload['data']
): Promise<WebhookResponse> => {
  const payload: WebhookPayload = {
    action,
    timestamp: new Date().toISOString(),
    data,
    metadata: {
      source: 'optistock-ai',
      userId: 'user-001',
      version: '1.0.0',
    },
  };

  const url = `${WEBHOOK_BASE_URL}${WEBHOOK_ENDPOINTS[action]}`;

  try {
    // In demo mode, simulate the webhook call
    if (WEBHOOK_BASE_URL.includes('example.com')) {
      console.log(`[Webhook Simulado] ${action}`, payload);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      return {
        success: true,
        message: `Webhook "${action}" ejecutado exitosamente (modo simulación)`,
        webhookId: `WH-${Date.now()}`,
        executedAt: new Date().toISOString(),
      };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Source': 'optistock-ai',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`[Webhook Error] ${action}:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error desconocido al ejecutar webhook',
    };
  }
};

export const executePromotion = async (
  data: WebhookPayload['data']
): Promise<WebhookResponse> => {
  return sendWebhook('execute_promotion', data);
};

export const createPurchaseOrder = async (
  data: WebhookPayload['data']
): Promise<WebhookResponse> => {
  return sendWebhook('create_purchase_order', data);
};

export const sendAlertNotification = async (
  data: WebhookPayload['data']
): Promise<WebhookResponse> => {
  return sendWebhook('alert_notification', data);
};
