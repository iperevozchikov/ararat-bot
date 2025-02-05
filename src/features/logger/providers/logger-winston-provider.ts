import * as winston from 'winston';

import { LoggerAbstractProvider } from './logger-abstract-provider';
import { LoggerConfiguration } from '../interfaces/logger-configuration';
import { LoggerProvider } from '../enums/logger-provider';

export class LoggerWinstonProvider extends LoggerAbstractProvider {
  private internalLogger: winston.Logger;

  constructor(configuration: LoggerConfiguration) {
    super(configuration);

    this.internalLogger = winston.createLogger({
      level: this.configuration.level,
      silent: this.configuration.silent,
      exitOnError: true,
      format: winston.format.combine(
        ...(
          this.configuration.providerConfiguration['LOGGER_WINSTON_PROVIDER_LABEL']
            ? [
              winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
              winston.format.label({ label: `${this.configuration.providerConfiguration['LOGGER_WINSTON_PROVIDER_LABEL']}`, message: true }),
              winston.format.logstash()
            ]
            : [
              winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
              winston.format.logstash()
            ]
        )
      ),
      transports: [
        new winston.transports.Console({
          debugStdout: true
        }),
      ],
    });
  }

  getProvider(): string {
    return LoggerProvider.WINSTON;
  }

  debug(message: string, meta?: Object): void {
    this.internalLogger.debug(message, this.getMetaWithCaller(meta));
  }

  error(message: string, meta?: Object): void {
    this.internalLogger.error(message, this.getMetaWithCaller(meta));
  }

  http(message: string, meta?: Object): void {
    this.internalLogger.http(message, this.getMetaWithCaller(meta));
  }

  info(message: string, meta?: Object): void {
    this.internalLogger.info(message, this.getMetaWithCaller(meta));
  }

  silly(message: string, meta?: Object): void {
    this.internalLogger.silly(message, this.getMetaWithCaller(meta));
  }

  verbose(message: string, meta?: Object): void {
    this.internalLogger.verbose(message, this.getMetaWithCaller(meta));
  }

  warn(message: string, meta?: Object): void {
    this.internalLogger.warn(message, this.getMetaWithCaller(meta));
  }
}
