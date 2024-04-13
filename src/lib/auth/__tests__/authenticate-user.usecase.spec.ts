import { FakeAuthGateway } from '@/lib/auth/infra/fake-auth-gateway';
import { authenticate } from '@/lib/auth/usecases/authenticate.usecase';
import { createTestStore } from '@/lib/create-store';
import { stateBuilder } from '@/lib/state-builder';
import { describe, test, expect } from 'vitest';

describe('Feature: Authenticating', () => {
  test('Example: Alice authenticated successfully', async () => {
    givenAuthenticationWillSucceedForUser('Alice');
    await whenUserAuthenticates();
    thenUserShouldBeAuthenticated({ authUser: 'Alice' });
  });
});

const authGateway = new FakeAuthGateway();
const store = createTestStore({ authGateway });
function givenAuthenticationWillSucceedForUser(authUser: string) {
  authGateway.willSucceedForAuthForUser = authUser;
}

async function whenUserAuthenticates() {
  await store.dispatch(authenticate());
}

function thenUserShouldBeAuthenticated({ authUser }: { authUser: string }) {
  const expectedState = stateBuilder().withAuthUser({ authUser }).build();
  expect(store.getState()).toEqual(expectedState);
}
