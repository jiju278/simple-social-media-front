import { authenticate } from '@/lib/auth/usecases/authenticate.usecase';
import { RootState } from '@/lib/create-store';
import { createReducer } from '@reduxjs/toolkit';

export type AuthState = {
  authUser?: string;
};

export const reducer = createReducer<AuthState>(
  {
    authUser: undefined,
  },
  (builder) => {
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.authUser = action.payload;
    });
  }
);

export const selectIsUserAuthenticated = (rootState: RootState) =>
  rootState.auth.authUser !== undefined;

export const selectAuthUser = (rootState: RootState) =>
  rootState.auth.authUser ?? '';
