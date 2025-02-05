import { WebhookEvent } from '../models/webhook-event';

export type WebhookProviderRequestHandler = (event: WebhookEvent) => void;
