import { Mixin } from 'ts-mixer';
import { ProcessingProviderAware } from '../interfaces/processing-provider-aware';
import { ProcessedResult } from '../interfaces/processed-result';
import { WebhookEvent } from '../../webhook/models/webhook-event';
import { LoggerMixin } from '../../../common/mixins/logger-mixin';

export abstract class ProcessingAbstractProvider extends Mixin(LoggerMixin) implements ProcessingProviderAware {
  // @ts-ignore
  process<T>(_event: WebhookEvent<T>): ProcessedResult[] | null {
    this.throwNotImplemented();
  }

  // @ts-ignore
  getProvider(): string {
    this.throwNotImplemented();
  }

  private throwNotImplemented(): void {
    throw new Error('Method not implemented');
  }
}
