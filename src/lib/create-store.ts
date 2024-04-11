import { AuthGateway } from '@/lib/auth/model/auth.gateway';
import { TimelineGateway } from '@/lib/timelines/model/timeline.gateway';
import { timelinesSlice } from '@/lib/timelines/slices/timelines.slice';
import { configureStore } from '@reduxjs/toolkit';

export type Dependencies = {
  authGateway: AuthGateway;
  timelineGateway: TimelineGateway;
};

const rootReducer = timelinesSlice.reducer;
export const createStore = (dependencies: Dependencies) =>
  configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      });
    },
  });

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
