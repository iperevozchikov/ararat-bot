import { FastifyRequest, FastifyReply, RouteOptions } from 'fastify';
import { WebhookProvider } from '../enums/webhook-provider';
import { WebhookProviderRequestHandler } from '../interfaces/webhook-provider-request-handler';
import { WebhookEvent } from '../models/webhook-event';
import { ProviderConfiguration } from '../../../common/interfaces/provider-configuration';
import { WebhookAbstractProvider } from './webhook-abstract-provider';

export class WebhookGitlabProvider extends WebhookAbstractProvider {
  private readonly defaultTokenHeaderName = 'X-Gitlab-Token';
  private readonly eventNameHeaderName = 'X-Gitlab-Event';
  private token: string;
  private tokenHeaderName: string;

  constructor(configuration: ProviderConfiguration) {
    super(configuration);

    this.token = this.configuration['WEBHOOK_SERVER_GITLAB_PROVIDER_TOKEN'] ?? '';
    this.tokenHeaderName = this.configuration['WEBHOOK_SERVER_GITLAB_PROVIDER_TOKEN_HEADER_NAME'] ?? this.defaultTokenHeaderName;
  }

  getProvider(): string {
    return WebhookProvider.GITLAB;
  }

  getRoutes(handler: WebhookProviderRequestHandler): RouteOptions[] {
    return [
      {
        method: 'POST',
        url: '/gitlab',
        handler: (request: FastifyRequest, reply: FastifyReply) => {
          const isVerified = this.isVerifiedWebhook(request);

          this.logger?.getProviderInstance().info(
            `Received ${isVerified ? 'verified' : 'unknown'} webhook with ${JSON.stringify(request.body)} data`
          );

          if (isVerified) {
            handler(
              new WebhookEvent(
                this.getProvider(),
                request.body,
                this.getWebhookEventName(request)
              )
            );
          }

          reply.send({ok: true});
        }
      }
    ];
  }

  private isVerifiedWebhook(request: FastifyRequest): boolean {
    if (!this.token) {
      return true;
    }

    for (const header in request.headers) {
      if (header.toLowerCase() === this.tokenHeaderName.toLowerCase() && request.headers[header] === this.token) {
        return true;
      }
    }

    return false;
  }

  private getWebhookEventName(request: FastifyRequest): string | null {
    const eventName = (
      request.headers[this.eventNameHeaderName] ?? request.headers[this.eventNameHeaderName.toLowerCase()]
    ) as string | undefined | null;

    return eventName ?? null;
  }
}
