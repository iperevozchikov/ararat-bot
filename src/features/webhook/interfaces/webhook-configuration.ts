import { ProviderConfiguration } from '../../../common/interfaces/provider-configuration';

export interface WebhookConfiguration {
  host: string;
  port: number;
  providerConfiguration: ProviderConfiguration;
}
