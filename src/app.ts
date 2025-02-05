import { DotenvParseOutput } from 'dotenv';
import { LifecycleAware } from './common/interfaces/lifecycle-aware';
import { Bot } from './features/bot/bot';
import { BotConfiguration } from './features/bot/intefaces/bot-configuration';
import { WebhookServer } from './features/webhook/webhook-server';
import { WebhookProvider } from './features/webhook/enums/webhook-provider';
import { WebhookServerEvent } from './features/webhook/enums/webhook-server-event';
import { Processing } from './features/processing/processing';
import { pick } from './common/helpers/pick';
import { ProviderConfiguration } from './common/interfaces/provider-configuration';
import { Logger } from './features/logger/logger';
import { parseBoolean } from './common/helpers/parse-boolean';

export class App implements LifecycleAware {
  private readonly bot: Bot;
  private readonly webhookServer: WebhookServer;
  private readonly eventProcessing: Processing;
  private readonly logger: Logger;

  constructor(private readonly config: DotenvParseOutput) {
    this.logger = new Logger(
      {
        level: this.config['LOGGER_LOG_LEVEL'] ?? 'info',
        silent: parseBoolean(this.config['LOGGER_SILENT'] ?? 'false'),
        providerConfiguration: pick<ProviderConfiguration>(this.config, new RegExp('^LOGGER_', 'i'))
      },
      this.config['LOGGER_PROVIDER'],
    );

    this.bot = new Bot(
      {
        host: this.config['BOT_HOST'],
        user: this.config['BOT_USER'],
        password: this.config['BOT_PASSWORD'],
        useSSL: this.config['BOT_USE_SSL'] === 'true',
      } as BotConfiguration,
      this.config['BOT_PROVIDER'],
    );
    this.bot.setLogger(this.logger);

    this.webhookServer = new WebhookServer(
      {
        host: this.config['WEBHOOK_SERVER_HOST'],
        port: Number(this.config['WEBHOOK_SERVER_PORT']),
        providerConfiguration: pick<ProviderConfiguration>(this.config, new RegExp('^WEBHOOK_SERVER_', 'i')),
      },
      (this.config['WEBHOOK_SERVER_PROVIDERS'] ?? '')
        .split(',')
        .map(provider => provider as WebhookProvider)
    );
    this.webhookServer.setLogger(this.logger);

    this.eventProcessing = new Processing();
    this.eventProcessing.setLogger(this.logger);
  }

  async start(): Promise<void> {
    await this.bot.start();
    await this.webhookServer.start();

    this.webhookServer.on(WebhookServerEvent.WEBHOOK_EVENT, event => {
      const messages = this.eventProcessing.process(event) ?? [];

      const botProvider = this.bot.getProviderInstance();

      for (const { message, user } of messages) {
        const identity = user.getIdentityByProvider(botProvider.getProvider());

        if (identity === null) {
          continue;
        }

        botProvider.sendToDM(String(identity.id), message);
      }
    });
  }

  async stop(): Promise<void> {
    await Promise.all([
      this.bot.stop(),
      this.webhookServer.stop()
    ]);
  }
}
