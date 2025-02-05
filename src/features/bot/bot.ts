import { Mixin } from 'ts-mixer';
import { LifecycleAware } from '../../common/interfaces/lifecycle-aware';
import { BotProvider } from './enums/bot-provider';
import { BotConfiguration } from './intefaces/bot-configuration';
import { BotAbstractProvider } from './providers/bot-abstract-provider';
import { BotRocketChatProvider } from './providers/bot-rocket-chat-provider';
import { LoggerMixin } from '../../common/mixins/logger-mixin';
import { Logger } from '../logger/logger';

export class Bot extends Mixin(LoggerMixin) implements LifecycleAware {
  private readonly providerInstance: BotAbstractProvider;

  constructor(
    private readonly configuration: BotConfiguration,
    private readonly provider: BotProvider | string,
  ) {
    super();

    this.providerInstance = this.instantiateProvider();
  }

  async start(): Promise<void> {
    await this.providerInstance.start();
  }

  async stop(): Promise<void> {
    await this.providerInstance.stop();
  }

  getProviderInstance(): BotAbstractProvider {
    return this.providerInstance;
  }

  setLogger(logger: Logger | null): void {
    super.setLogger(logger);

    this.providerInstance.setLogger(logger);
  }

  private instantiateProvider(): BotAbstractProvider {
    switch (this.provider) {
      case BotProvider.ROCKET_CHAT: return new BotRocketChatProvider(this.configuration);

      default:
        throw new Error(`Cannot find concrete class for "${this.provider}" provider`);
    }
  }
}
