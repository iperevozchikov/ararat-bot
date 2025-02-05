import { driver } from '@rocket.chat/sdk';
import { silence } from '@rocket.chat/sdk/dist/lib/log';
import { emojify } from 'node-emoji';
import { BotProvider } from '../enums/bot-provider';
import { BotAbstractProvider } from './bot-abstract-provider';
import { BotConfiguration } from '../intefaces/bot-configuration';
import { Message } from '@rocket.chat/sdk/dist/lib/message';

export class BotRocketChatProvider extends BotAbstractProvider {
  constructor(configuration: BotConfiguration) {
    super(configuration);
    silence();
  }

  async start(): Promise<void> {
    this.logger?.getProviderInstance().info(`Connecting to host ${this.configuration.host}...`);
    await driver.connect({
      host: this.configuration.host,
      useSsl: this.configuration.useSSL,
      integration: this.configuration.user,
    });

    this.logger?.getProviderInstance().info(`Authorizing as ${this.configuration.user}...`);
    await driver.login({
      username: this.configuration.user,
      password: this.configuration.password,
    });
  }

  async stop(): Promise<void> {
    this.logger?.getProviderInstance().info('Stopping...');
    await driver.disconnect();
  }

  getProvider(): string {
    return BotProvider.ROCKET_CHAT;
  }

  override async joinToChannel(channelId: string): Promise<void> {
    this.logger?.getProviderInstance().info(`Joining to channel with ${channelId} ID`);
    await driver.joinRoom(channelId);
  }

  override async sendToChannel(channelId: string, message: string, _options?: Object): Promise<void> {
    this.logger?.getProviderInstance().info(`Sending to channel with ${channelId} ID "${message}" message`);
    await driver.sendToRoom(this.prepareMessage(message), channelId);
  }

  override async sendToDM(userId: string, message: string, _options?: Object): Promise<void> {
    this.logger?.getProviderInstance().info(`Sending to user with ${userId} ID "${message}" message`);
    await driver.sendDirectToUser(this.prepareMessage(message), userId);
  }

  private prepareMessage(message: string): Message {
    return driver.prepareMessage(emojify(message));
  }
}
