import { Mixin } from 'ts-mixer';
import { WebhookEvent } from '../webhook/models/webhook-event';
import { ProcessedResult } from './interfaces/processed-result';
import { ProcessingProcessAware } from './interfaces/processing-process-aware';
import { ProcessingProvider } from './enums/processing-provider';
import { ProcessingGitlabProvider } from './providers/processing-gitlab-provider/processing-gitlab-provider';
import { LoggerMixin } from '../../common/mixins/logger-mixin';
import { Logger } from '../logger/logger';
import { ProcessingAbstractProvider } from './providers/processing-abstract-provider';

export class Processing extends Mixin(LoggerMixin) implements ProcessingProcessAware {
  private providerInstances: ProcessingAbstractProvider[] = [];

  constructor() {
    super();

    this.instantiateProviders();
  }

  process<T>(event: WebhookEvent<T>): ProcessedResult[] | null {
    const provider = this.providerInstances.find(provider => provider.getProvider() === event.getProvider());

    return provider ? provider.process(event) : null;
  }

  setLogger(logger: Logger | null): void {
    super.setLogger(logger);

    for (const provider of this.providerInstances) {
      provider.setLogger(logger);
    }
  }

  private instantiateProviders(): void {
    for (const provider of Object.values(ProcessingProvider)) {
      this.providerInstances.push(this.instantiateProvider(provider));
    }
  }

  private instantiateProvider(provider: string): ProcessingAbstractProvider {
    switch (provider) {
      case ProcessingProvider.GITLAB: return new ProcessingGitlabProvider();

      default:
        throw new Error(`Cannot find concrete class for "${provider}" provider`);
    }
  }
}
