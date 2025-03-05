import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthUserEmail = createSelector(//extraigo email
  selectAuthState,
  (state) => state.authUser?.email
);

export const selectAuthUser = createSelector(//extraigo user
  selectAuthState,
  (state) => state.authUser
);