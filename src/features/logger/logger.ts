import { LoggerAbstractProvider } from './providers/logger-abstract-provider';
import { LoggerConfiguration } from './interfaces/logger-configuration';
import { LoggerProvider } from './enums/logger-provider';
import { LoggerWinstonProvider } from './providers/logger-winston-provider';

export class Logger {
  private providerInstance: LoggerAbstractProvider;

  constructor(
    private configuration: LoggerConfiguration,
    private provider: LoggerProvider | string,
  ) {

    this.providerInstance = this.instantiateProvider();
  }

  getProviderInstance(): LoggerAbstractProvider {
    return this.providerInstance;
  }

  private instantiateProvider(): LoggerAbstractProvider {
    switch (this.provider) {
      case LoggerProvider.WINSTON: return new LoggerWinstonProvider(this.configuration);

      default:
        throw new Error(`Cannot find concrete class for "${this.provider}" provider`);
    }
  }
}
