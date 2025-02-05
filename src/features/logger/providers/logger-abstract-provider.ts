import caller from 'caller';
import { LoggerLevelAware } from '../interfaces/logger-level-aware';
import { LoggerConfiguration } from '../interfaces/logger-configuration';
import { ProviderAware } from '../../../common/interfaces/provider-aware';

export abstract class LoggerAbstractProvider implements LoggerLevelAware, ProviderAware {
  protected defaultCallerDepth = 3;

  constructor(protected configuration: LoggerConfiguration) {
  }

  debug(_message: string, _meta?: Object): void {
  }

  error(_message: string, _meta?: Object): void {
  }

  http(_message: string, _meta?: Object): void {
  }

  info(_message: string, _meta?: Object): void {
  }

  silly(_message: string, _meta?: Object): void {
  }

  verbose(_message: string, _meta?: Object): void {
  }

  warn(_message: string, _meta?: Object): void {
  }

  getProvider(): string {
    throw new Error('Not implemented yet');
  }

  protected getMetaWithCaller(meta?: Object): Object {
    return {
      ...(meta ?? {}),
      caller: this.getCallerFile()
    };
  }

  protected getCallerFile(): string {
    return caller(this.defaultCallerDepth).replace(new RegExp('.+/src', 'i'), './src');
  }
}
