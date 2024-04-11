import { getAuthUserTimeline } from '@/lib/timelines/usecases/get-auth-user-timeline.usecase';
import { createSlice } from '@reduxjs/toolkit';

type TimelineState = {
  user: string;
  messages: {
    text: string;
    author: string;
    publishedAt: string;
  }[];
};
export const timelinesSlice = createSlice({
  name: 'timelines',
  initialState: {} as TimelineState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAuthUserTimeline.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});
