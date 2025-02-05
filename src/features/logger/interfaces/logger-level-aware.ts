
export interface LoggerLevelAware {
  error(message: string, meta?: Object): void;
  warn(message: string, meta?: Object): void;
  info(message: string, meta?: Object): void;
  http(message: string, meta?: Object): void;
  verbose(message: string, meta?: Object): void;
  debug(message: string, meta?: Object): void;
  silly(message: string, meta?: Object): void;
}
