import { AuthGateway } from '@/lib/auth/model/auth.gateway';

export class FakeAuthGateway implements AuthGateway {
  authUser!: string;
  willSucceedForAuthForUser!: string;

  constructor(private readonly delay = 0) {}

  getAuthUser(): string {
    return this.authUser;
  }

  authenticate(): Promise<string> {
    this.authUser = this.willSucceedForAuthForUser;
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.willSucceedForAuthForUser), this.delay)
    );
  }
}
