import { ProviderAware } from '../../../common/interfaces/provider-aware';

export interface BotProviderAware extends ProviderAware {
  sendToChannel(channelId: string, message: string, options?: Object): Promise<void>;
  sendToDM(userId: string, message: string, options?: Object): Promise<void>;
  joinToChannel(channelId: string): Promise<void>;
  joinToUser(userId: string): Promise<void>;
}
