import { RouteOptions } from 'fastify';
import { Mixin } from 'ts-mixer';
import { WebhookProviderAware } from '../interfaces/webhook-provider-aware';
import { WebhookProviderRequestHandler } from '../interfaces/webhook-provider-request-handler';
import { ProviderConfiguration } from '../../../common/interfaces/provider-configuration';
import { LoggerMixin } from '../../../common/mixins/logger-mixin';

export abstract class WebhookAbstractProvider extends Mixin(LoggerMixin) implements WebhookProviderAware {
  constructor(protected configuration: ProviderConfiguration) {
    super();
  }

  // @ts-ignore
  getProvider(): string {
    this.throwNotImplemented();
  }

  // @ts-ignore
  getRoutes(_handler: WebhookProviderRequestHandler): RouteOptions[] {
    this.throwNotImplemented();
  }

  private throwNotImplemented(): void {
    throw new Error('Method not implemented');
  }
}
