import { AuthGateway } from '@/lib/auth/model/auth.gateway';

export class FakeAuthGateway implements AuthGateway {
  authUser!: string;

  getAuthUser(): string {
    return this.authUser;
  }
}
