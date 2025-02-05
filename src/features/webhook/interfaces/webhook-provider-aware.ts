import { RouteOptions } from 'fastify';
import { ProviderAware } from '../../../common/interfaces/provider-aware';
import { WebhookProviderRequestHandler } from './webhook-provider-request-handler';

export interface WebhookProviderAware extends ProviderAware {
  getRoutes(handler: WebhookProviderRequestHandler): RouteOptions[];
}
