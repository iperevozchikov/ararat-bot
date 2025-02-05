import { WebhookProvider } from '../enums/webhook-provider';

export class WebhookEvent<T = unknown> {
  constructor(
    private readonly provider: WebhookProvider | string,
    private readonly data: T,
    private readonly eventName: string | null = null,
  ) {}

  getProvider(): WebhookProvider | string {
    return this.provider;
  }

  getEventName(): string | null {
    return this.eventName;
  }

  getData(): T {
    return this.data;
  }
}
