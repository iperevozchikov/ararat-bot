import { LoggerAware } from '../interfaces/logger-aware';
import { Logger } from '../../features/logger/logger';
import { AbstractMixin } from './abstract-mixin';

export class LoggerMixin extends AbstractMixin implements LoggerAware {
  protected logger: Logger | null = null;

  setLogger(logger: Logger | null): void {
    this.logger = logger;
  }
}
