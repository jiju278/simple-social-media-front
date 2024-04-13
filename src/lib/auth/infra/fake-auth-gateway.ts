import { AuthGateway, AuthUser } from '@/lib/auth/model/auth.gateway';

export class FakeAuthGateway implements AuthGateway {
  willSucceedForAuthForUser!: AuthUser;
  onAuthStateChangedListener: (user: AuthUser) => void = () => {
    return;
  };

  constructor(private readonly delay = 0) {}

  authenticate(): Promise<string> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.willSucceedForAuthForUser), this.delay)
    );
  }

  simulateAuthStateChanged(authUser: string) {
    this.onAuthStateChangedListener(authUser);
  }

  onAuthStateChanged(listener: (user: AuthUser) => void): void {
    this.onAuthStateChangedListener = listener;
  }
}
