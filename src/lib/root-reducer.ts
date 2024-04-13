import { reducer as timelinesReducer } from '@/lib/timelines/reducer';
import { reducer as authReducer } from '@/lib/auth/reducer';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  timelines: timelinesReducer,
  auth: authReducer,
});
