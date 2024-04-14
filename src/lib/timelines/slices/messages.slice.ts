import { RootState } from '@/lib/create-store';
import { messagesAdapter } from '@/lib/timelines/model/message.entity';
import { getAuthUserTimeline } from '@/lib/timelines/usecases/get-auth-user-timeline.usecase';
import { postMessagePending } from '@/lib/timelines/usecases/post-message.usecase';
import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAuthUserTimeline.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action.payload.messages);
      })
      .addCase(postMessagePending, (state, action) => {
        messagesAdapter.addOne(state, action.payload);
      });
  },
});

export const selectMessage = (id: string, state: RootState) =>
  messagesAdapter.getSelectors().selectById(state.timelines.messages, id);

export const selectMessagesOrderedByPublicationDateDesc = (
  ids: string[],
  state: RootState
) => {
  const messages = ids.map((id) => selectMessage(id, state)).filter(Boolean);

  return messages.sort(
    (mA, mB) =>
      new Date(mB.publishedAt).getTime() - new Date(mA.publishedAt).getTime()
  );
};
