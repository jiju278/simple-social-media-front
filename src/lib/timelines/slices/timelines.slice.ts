import { RootState } from '@/lib/create-store';
import {
  Timeline,
  timelinesAdapter,
} from '@/lib/timelines/model/timeline.entity';
import {
  getAuthUserTimeline,
  getAuthUserTimelinePending,
} from '@/lib/timelines/usecases/get-auth-user-timeline.usecase';
import { postMessage } from '@/lib/timelines/usecases/post-message.usecase';
import { EntityState, createSlice } from '@reduxjs/toolkit';

export type TimelineSliceState = EntityState<Timeline> & {
  loadingTimelineByUser: { [userId: string]: boolean };
};
export const timelinesSlice = createSlice({
  name: 'timelines',
  initialState: timelinesAdapter.getInitialState({
    loadingTimelineByUser: {},
  }) as TimelineSliceState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAuthUserTimelinePending, (state, action) => {
        state.loadingTimelineByUser[action.payload.authUser] = true;
      })
      .addCase(postMessage.pending, (state, action) => {
        timelinesAdapter.updateOne(state, {
          id: action.meta.arg.timelineId,
          changes: {
            messages: [action.meta.arg.messageId],
          },
        });
      })
      .addCase(getAuthUserTimeline.fulfilled, (state, action) => {
        const timeline = action.payload;
        timelinesAdapter.addOne(state, {
          id: timeline.id,
          user: timeline.user,
          messages: timeline.messages.map((m) => m.id),
        });
        state.loadingTimelineByUser[timeline.user] = false;
      });
  },
});

export const selectTimeline = (timelineId: string, state: RootState) =>
  timelinesAdapter
    .getSelectors()
    .selectById(state.timelines.timelines, timelineId);

export const selectIsUserTimelineLoading = (user: string, state: RootState) =>
  state.timelines.timelines.loadingTimelineByUser[user] ?? false;

export const selectTimelineForUser = (user: string, state: RootState) =>
  timelinesAdapter
    .getSelectors()
    .selectAll(state.timelines.timelines)
    .filter((t) => t.user === user)[0];
