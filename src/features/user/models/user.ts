import { UserIdentitiesAware } from '../interfaces/user-identities-aware';
import { UserIdentity } from '../interfaces/user-identity';

export class User implements UserIdentitiesAware {
  constructor(
    private readonly id: string,
    private readonly identities: UserIdentity[]
  ) {}

  getId(): string {
    return this.id;
  }

  getIdentities(): UserIdentity[] {
    return this.identities;
  }

  getIdentityByProvider(provider: string): UserIdentity | null {
    return this.identities.find((identity: UserIdentity) => identity.provider === provider) ?? null;
  }
}
