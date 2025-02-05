import { User } from './user';

export interface Commit {
  id: string;
  message: string;
  title: string;
  timestamp: string;
  url: string;
  author: Pick<User, 'name' | 'email'>,
  added: string[];
  modified: string[];
  removed: string[];
}
