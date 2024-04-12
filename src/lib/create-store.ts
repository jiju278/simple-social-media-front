import { AuthGateway } from '@/lib/auth/model/auth.gateway';
import { TimelineGateway } from '@/lib/timelines/model/timeline.gateway';
import { reducer as timelinesReducer } from '@/lib/timelines/reducer';
import { configureStore } from '@reduxjs/toolkit';

export type Dependencies = {
  authGateway: AuthGateway;
  timelineGateway: TimelineGateway;
};

const rootReducer = timelinesReducer;

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
