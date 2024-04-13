import { FakeAuthGateway } from '@/lib/auth/infra/fake-auth-gateway';
import { AuthGateway } from '@/lib/auth/model/auth.gateway';
import { rootReducer } from '@/lib/root-reducer';
import { FakeTimelineGateway } from '@/lib/timelines/infra/fake-timeline.gateway';
import { TimelineGateway } from '@/lib/timelines/model/timeline.gateway';
import { configureStore } from '@reduxjs/toolkit';

export type Dependencies = {
  authGateway: AuthGateway;
  timelineGateway: TimelineGateway;
};

export const createStore = (
  dependencies: Dependencies,
  preloadedState?: Partial<RootState>
) =>
  configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      });
    },
    preloadedState,
  });

export const createTestStore = (
  {
    authGateway = new FakeAuthGateway(),
    timelineGateway = new FakeTimelineGateway(),
  }: Partial<Dependencies> = {},
  preloadedState?: Partial<ReturnType<typeof rootReducer>>
) =>
  createStore(
    {
      authGateway,
      timelineGateway,
    },
    preloadedState
  );
export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
