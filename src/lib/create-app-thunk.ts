import { AppDispatch, Dependencies } from '@/lib/create-store';
import { RootState } from './create-store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  extra: Dependencies;
}>();
