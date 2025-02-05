import fastify, { FastifyInstance } from 'fastify';
import { EventEmitter } from 'events';
import { Mixin } from 'ts-mixer';
import { LifecycleAware } from '../../common/interfaces/lifecycle-aware';
import { WebhookConfiguration } from './interfaces/webhook-configuration';
import { WebhookProvider } from './enums/webhook-provider';
import { WebhookGitlabProvider } from './providers/webhook-gitlab-provider';
import { WebhookServerEvent } from './enums/webhook-server-event';
import { LoggerMixin } from '../../common/mixins/logger-mixin';
import { Logger } from '../logger/logger';
import { WebhookAbstractProvider } from './providers/webhook-abstract-provider';

export class WebhookServer extends Mixin(EventEmitter, LoggerMixin) implements LifecycleAware {
  private server: FastifyInstance;
  private providerInstances: WebhookAbstractProvider[] = [];

  constructor(
    private readonly configuration: WebhookConfiguration,
    private readonly providers: WebhookProvider[]
  ) {
    super();

    this.server = fastify({});
    this.instantiateProviders();
  }

  async start(): Promise<void> {
    for (const providerInstance of this.providerInstances) {
      const routes = providerInstance.getRoutes(event => this.emit(WebhookServerEvent.WEBHOOK_EVENT, event));

      for (const route of routes) {
        this.server.route(route);
      }
    }

    this.logger?.getProviderInstance()
      .info(`Starting webhook server to ${this.configuration.host} host ${this.configuration.port} port...`);

    await this.server.listen({
      host: this.configuration.host,
      port: this.configuration.port,
    });
  }

  async stop(): Promise<void> {
    this.logger?.getProviderInstance().info(`Stopping webhook server...`);

    await this.server.close();

    this.removeAllListeners(WebhookServerEvent.WEBHOOK_EVENT);
  }

  setLogger(logger: Logger | null): void {
    super.setLogger(logger);

    for (const provider of this.providerInstances) {
      provider.setLogger(logger);
    }
  }

  private instantiateProviders(): void {
    for (const provider of this.providers) {
      this.providerInstances.push(this.instantiateProvider(provider));
    }
  }

  private instantiateProvider(provider: WebhookProvider): WebhookAbstractProvider {

    switch (provider) {
      case WebhookProvider.GITLAB: return new WebhookGitlabProvider(this.configuration.providerConfiguration);

      default:
        throw new Error(`Cannot find concrete class for "${provider}" provider`);
    }
  }
}
