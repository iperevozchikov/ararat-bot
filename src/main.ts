import { App } from './app';
import * as dotenv from 'dotenv';

const config = dotenv.config({ path: './config/.env' }).parsed;

if (!config) {
  throw new Error('Cannot find or parse .env file');
}

new App(config).start();
