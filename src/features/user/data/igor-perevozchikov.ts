import { User } from '../models/user';
import { BotProvider } from '../../bot/enums/bot-provider';
import { WebhookProvider } from '../../webhook/enums/webhook-provider';

export const userIgorPerevozchikov = new User('igor-perevozchikov', [
  {
    provider: BotProvider.ROCKET_CHAT,
    id: 'igor',
    nickname: 'igor',
    email: 'some-email@example.com',
  },
  {
    provider: WebhookProvider.GITLAB,
    id: '111111',
    nickname: 'iperevozchikov-main',
    email: 'some-email@example.com',
  },
]);
