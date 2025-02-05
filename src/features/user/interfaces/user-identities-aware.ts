import { UserIdentity } from './user-identity';

export interface UserIdentitiesAware {
  getIdentities(): UserIdentity[];

  getIdentityByProvider(provider: string): UserIdentity | null;
}
