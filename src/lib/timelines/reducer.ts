import { messagesSlice } from '@/lib/timelines/slices/messages.slice';
import { timelinesSlice } from '@/lib/timelines/slices/timelines.slice';
import { combineReducers } from '@reduxjs/toolkit';

export const reducer = combineReducers({
  [timelinesSlice.name]: timelinesSlice.reducer,
  [messagesSlice.name]: messagesSlice.reducer,
});
