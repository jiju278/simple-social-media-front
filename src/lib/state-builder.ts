import { RootState } from '@/lib/create-store';
import { rootReducer } from '@/lib/root-reducer';
import { Message, messagesAdapter } from '@/lib/timelines/model/message.entity';
import {
  Timeline,
  timelinesAdapter,
} from '@/lib/timelines/model/timeline.entity';
import {
  ActionCreatorWithPayload,
  createAction,
  createReducer,
} from '@reduxjs/toolkit';

const initialState = rootReducer(undefined, createAction(''));

const withTimeline = createAction<Timeline>('withTimeline');
const withLoadingTimelineOf = createAction<{ user: string }>(
  'withLoadingTimelineOf'
);
const withNotLoadingTimelineOf = createAction<{ user: string }>(
  'withNotLoadingTimelineOf'
);
const withMessages = createAction<Message[]>('withMessages');

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(withTimeline, (state, action) => {
      timelinesAdapter.addOne(state.timelines, action.payload);
    })
    .addCase(withLoadingTimelineOf, (state, action) => {
      state.timelines.loadingTimelineByUser[action.payload.user] = true;
    })
    .addCase(withNotLoadingTimelineOf, (state, action) => {
      state.timelines.loadingTimelineByUser[action.payload.user] = false;
    })
    .addCase(withMessages, (state, action) => {
      messagesAdapter.addMany(state.messages, action.payload);
    });
});

export const stateBuilder = (baseState = initialState) => {
  const reduce =
    <P>(actionCreator: ActionCreatorWithPayload<P>) =>
    (payload: P) =>
      stateBuilder(reducer(baseState, actionCreator(payload)));

  return {
    withTimeline: reduce(withTimeline),
    withLoadingTimelineOf: reduce(withLoadingTimelineOf),
    withNotLoadingTimelineOf: reduce(withNotLoadingTimelineOf),
    withMessages: reduce(withMessages),
    build(): RootState {
      return baseState;
    },
  };
};
