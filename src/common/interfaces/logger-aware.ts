import { Logger } from '../../features/logger/logger';

export interface LoggerAware {
  setLogger(logger: Logger): void;
}
