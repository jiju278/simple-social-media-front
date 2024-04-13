import { FakeAuthGateway } from '@/lib/auth/infra/fake-auth-gateway';
import { AuthGateway, AuthUser } from '@/lib/auth/model/auth.gateway';

export class FakeStorageAuthGateway implements AuthGateway {
  onAuthStateChangedListener!: (user: AuthUser) => void;

  constructor(private readonly fakeAuthGateway: FakeAuthGateway) {
    this.checkIfAuthenticated();
  }

  async authenticate(): Promise<string> {
    const authUser = await this.fakeAuthGateway.authenticate();
    localStorage.setItem('fake-auth', authUser);
    this.fakeAuthGateway.onAuthStateChangedListener(authUser);
    return authUser;
  }

  onAuthStateChanged(listener: (user: string) => void): void {
    this.fakeAuthGateway.onAuthStateChanged(listener);
    this.checkIfAuthenticated();
  }

  public checkIfAuthenticated() {
    const maybeAuthUser = localStorage.getItem('fake-auth');

    if (maybeAuthUser !== null) {
      this.fakeAuthGateway.simulateAuthStateChanged(maybeAuthUser);
    }
  }
}
