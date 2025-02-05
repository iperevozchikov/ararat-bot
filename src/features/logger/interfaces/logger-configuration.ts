import { ProviderConfiguration } from '../../../common/interfaces/provider-configuration';

export interface LoggerConfiguration {
  level: string;
  silent?: boolean;
  providerConfiguration: ProviderConfiguration;
}
