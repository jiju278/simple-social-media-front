import { createAppAsyncThunk } from '@/lib/create-app-thunk';

export const authenticate = createAppAsyncThunk(
  'auth/authenticate',
  async (_, { extra: { authGateway } }) => {
    const authUser = await authGateway.authenticate();

    return authUser;
  }
);
