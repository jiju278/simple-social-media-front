import { getAuthUserTimeline } from '@/lib/timelines/usecases/get-auth-user-timeline.usecase';
import { AppStore } from './../../lib/create-store';
import { LoaderFunction } from 'react-router-dom';

export const createHomeLoader =
  ({ store }: { store: AppStore }): LoaderFunction =>
  () => {
    store.dispatch(getAuthUserTimeline());
    return null;
  };
