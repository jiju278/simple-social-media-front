import { AuthUser } from '@/lib/auth/model/auth.gateway';
import { authenticate } from '@/lib/auth/usecases/authenticate.usecase';
import { RootState } from '@/lib/create-store';
import { createAction, createReducer } from '@reduxjs/toolkit';

export type AuthState = {
  authUser?: string;
};
export const userAuthenticated = createAction<{ authUser: AuthUser }>(
  'auth/userAuthenticated'
);

export const signOut = createAction('auth/signOut');

export const reducer = createReducer<AuthState>(
  {
    authUser: undefined,
  },
  (builder) => {
    builder
      .addCase(userAuthenticated, (state, action) => {
        state.authUser = action.payload.authUser;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.authUser = action.payload;
      })
      .addCase(signOut, (state) => {
        state.authUser = undefined;
      });
  }
);

export const selectIsUserAuthenticated = (rootState: RootState) =>
  rootState.auth.authUser !== undefined;

export const selectAuthUser = (rootState: RootState) =>
  rootState.auth.authUser ?? '';
