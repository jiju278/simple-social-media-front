import { AuthGateway } from '@/lib/auth/model/auth.gateway';

export class FakeAuthGateway implements AuthGateway {
  willSucceedForAuthForUser!: string;

  constructor(private readonly delay = 0) {}

  authenticate(): Promise<string> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.willSucceedForAuthForUser), this.delay)
    );
  }
}
