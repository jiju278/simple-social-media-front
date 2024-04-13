import { FakeAuthGateway } from '@/lib/auth/infra/fake-auth-gateway';
import { onAuthStateChangedListener } from '@/lib/auth/listeners/on-auth-state-changed.listener';
import { AuthGateway } from '@/lib/auth/model/auth.gateway';
import { rootReducer } from '@/lib/root-reducer';
import { FakeMessageGateway } from '@/lib/timelines/infra/fake-message.gateway';
import { FakeTimelineGateway } from '@/lib/timelines/infra/fake-timeline.gateway';
import { StubDateProvider } from '@/lib/timelines/infra/stub-date-provider';
import { DateProvider } from '@/lib/timelines/model/date-provider';
import { MessageGateway } from '@/lib/timelines/model/message.gateway';
import { TimelineGateway } from '@/lib/timelines/model/timeline.gateway';
import { AnyAction, Middleware, configureStore } from '@reduxjs/toolkit';

export type Dependencies = {
  authGateway: AuthGateway;
  timelineGateway: TimelineGateway;
  messageGateway: MessageGateway;
  dateProvider: DateProvider;
};

export const createStore = (
  dependencies: Dependencies,
  preloadedState?: Partial<RootState>
) => {
  const actions: AnyAction[] = [];
  const logActionsMiddleware: Middleware = () => (next) => (action) => {
    actions.push(action);
    return next(action);
  };
  const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      }).prepend(logActionsMiddleware);
    },
    preloadedState,
  });

  onAuthStateChangedListener({ store, authGateway: dependencies.authGateway });
  return {
    ...store,
    getActions() {
      return actions;
    },
  };
};

export const createTestStore = (
  {
    authGateway = new FakeAuthGateway(),
    timelineGateway = new FakeTimelineGateway(),
    dateProvider = new StubDateProvider(),
    messageGateway = new FakeMessageGateway(),
  }: Partial<Dependencies> = {},
  preloadedState?: Partial<ReturnType<typeof rootReducer>>
) =>
  createStore(
    {
      authGateway,
      timelineGateway,
      dateProvider,
      messageGateway,
    },
    preloadedState
  );

type AppStoreWithGetActions = ReturnType<typeof createStore>;

export type AppStore = Omit<AppStoreWithGetActions, 'getActions'>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
