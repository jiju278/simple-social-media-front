import { AuthGateway } from '@/lib/auth/model/auth.gateway';

export class FakeAuthGateway implements AuthGateway {
  authUser!: string;
  willSucceedForAuthForUser!: string;

  getAuthUser(): string {
    return this.authUser;
  }

  async authenticate(): Promise<string> {
    return this.willSucceedForAuthForUser;
  }
}
