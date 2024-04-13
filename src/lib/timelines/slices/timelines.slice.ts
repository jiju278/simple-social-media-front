import { RootState } from '@/lib/create-store';
import {
  Timeline,
  timelinesAdapter,
} from '@/lib/timelines/model/timeline.entity';
import { getAuthUserTimeline } from '@/lib/timelines/usecases/get-auth-user-timeline.usecase';
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
      .addCase(getAuthUserTimeline.pending, (state) => {
        state.loadingTimelineByUser['Alice'] = true;
      })
      .addCase(getAuthUserTimeline.fulfilled, (state, action) => {
        const timeline = action.payload;
        timelinesAdapter.addOne(state, {
          id: timeline.id,
          user: timeline.user,
          messages: timeline.messages.map((m) => m.id),
        });
        state.loadingTimelineByUser['Alice'] = false;
      });
  },
});

export const selectTimeline = (timelineId: string, state: RootState) =>
  timelinesAdapter.getSelectors().selectById(state.timelines, timelineId);

export const selectIsUserTimelineLoading = (user: string, state: RootState) =>
  state.timelines.loadingTimelineByUser[user] ?? false;
