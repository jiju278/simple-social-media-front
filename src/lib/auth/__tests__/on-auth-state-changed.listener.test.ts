import { FakeAuthGateway } from '@/lib/auth/infra/fake-auth-gateway';
import { userAuthenticated } from '@/lib/auth/reducer';
import { createTestStore } from '@/lib/create-store';
import { describe, expect, it } from 'vitest';

describe('On auth state changed listener', () => {
  it('should dispatch an userAuthenticated action when auth gateway notifies the user is authenticated', () => {
    const authGateway = new FakeAuthGateway();
    const store = createTestStore({ authGateway });

    authGateway.simulateAuthStateChanged('Alice');

    expect(store.getActions()).toContainEqual(
      userAuthenticated({ authUser: 'Alice' })
    );
  });
});
