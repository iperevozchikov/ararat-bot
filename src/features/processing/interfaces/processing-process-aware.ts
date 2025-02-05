import { ProcessedResult } from './processed-result';
import { WebhookEvent } from '../../webhook/models/webhook-event';

export interface ProcessingProcessAware {
  process<T>(event: WebhookEvent<T>): ProcessedResult[] | null;
}
