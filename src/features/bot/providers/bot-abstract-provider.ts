import { Mixin } from 'ts-mixer';
import { LifecycleAware } from '../../../common/interfaces/lifecycle-aware';
import { BotConfiguration } from '../intefaces/bot-configuration';
import { BotProviderAware } from '../intefaces/bot-provider-aware';
import { LoggerMixin } from '../../../common/mixins/logger-mixin';

export abstract class BotAbstractProvider extends Mixin(LoggerMixin) implements LifecycleAware, BotProviderAware {
  constructor(protected readonly configuration: BotConfiguration) {
    super();
  }

  // @ts-ignore
  getProvider(): string {
    this.throwNotImplemented();
  }

  // @ts-ignore
  joinToChannel(_channelId: string): Promise<void> {
    this.throwNotImplemented();
  }

  // @ts-ignore
  joinToUser(_userId: string): Promise<void> {
    this.throwNotImplemented();
  }

  // @ts-ignore
  sendToChannel(_channelId: string, _message: string, _options?: Object): Promise<void> {
    this.throwNotImplemented();
  }

  // @ts-ignore
  sendToDM(_userId: string, _message: string, _options?: Object): Promise<void> {
    this.throwNotImplemented();
  }

  // @ts-ignore
  start(): Promise<void> {
    this.throwNotImplemented();
  }

  // @ts-ignore
  stop(): Promise<void> {
    this.throwNotImplemented();
  }

  private throwNotImplemented(): void {
    throw new Error('Method not implemented');
  }
}


