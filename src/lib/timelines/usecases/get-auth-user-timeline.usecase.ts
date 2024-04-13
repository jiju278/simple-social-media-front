import { selectAuthUser } from '@/lib/auth/reducer';
import { createAppAsyncThunk } from '@/lib/create-app-thunk';
import { selectIsUserTimelineLoading } from '@/lib/timelines/slices/timelines.slice';
import { createAction } from '@reduxjs/toolkit';

export const getAuthUserTimelinePending = createAction<{ authUser: string }>(
  'timelines/getAuthUserTimelinePending'
);

export const getAuthUserTimeline = createAppAsyncThunk(
  'timelines/getAuthUserTimeline',
  async (_, { extra: { timelineGateway }, dispatch, getState }) => {
    const authUser = selectAuthUser(getState());
    dispatch(getAuthUserTimelinePending({ authUser }));
    const { timeline } = await timelineGateway.getUserTimeline({
      userId: authUser,
    });

    return timeline;
  },
  {
    condition(_, { getState }) {
      const authUser = selectAuthUser(getState());
      const isTimelineLoading = selectIsUserTimelineLoading(
        authUser,
        getState()
      );

      return !isTimelineLoading;
    },
  }
);
