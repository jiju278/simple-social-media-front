import { selectAuthUser } from '@/lib/auth/reducer';
import { RootState } from '@/lib/create-store';
import { selectMessagesOrderedByPublicationDateDesc } from '@/lib/timelines/slices/messages.slice';
import {
  selectIsUserTimelineLoading,
  selectTimelineForUser,
} from '@/lib/timelines/slices/timelines.slice';
import { format as timeAgo } from 'timeago.js';

export enum HomeViewModelType {
  NoTimeline = 'NO_TIMELINE',
  EmptyTimeline = 'EMPTY_TIMELINE',
  WithMessages = 'TIMELINE_WITH_MESSAGES',
  LoadingTimeline = 'LOADING_TIMELINE',
}

export const selectHomeViewModel = (
  rootState: RootState,
  getNow: () => string
): {
  timeline:
    | { type: HomeViewModelType.NoTimeline }
    | { type: HomeViewModelType.EmptyTimeline; info: string }
    | { type: HomeViewModelType.LoadingTimeline; info: string }
    | {
        type: HomeViewModelType.WithMessages;
        messages: {
          id: string;
          userId: string;
          username: string;
          profilePictureUrl: string;
          publishedAt: string;
          text: string;
        }[];
      };
} => {
  const now = getNow();
  const authUser = selectAuthUser(rootState);
  const timeline = selectTimelineForUser(authUser, rootState);
  const isUserTimelineLoading = selectIsUserTimelineLoading(
    authUser,
    rootState
  );

  if (isUserTimelineLoading) {
    return {
      timeline: {
        type: HomeViewModelType.LoadingTimeline,
        info: 'Loading...',
      },
    };
  }

  if (!timeline) {
    return {
      timeline: { type: HomeViewModelType.NoTimeline },
    };
  }

  if (timeline.messages.length === 0) {
    return {
      timeline: {
        type: HomeViewModelType.EmptyTimeline,
        info: 'There is no message yet',
      },
    };
  }

  const messages = selectMessagesOrderedByPublicationDateDesc(
    timeline.messages,
    rootState
  ).map((msg) => ({
    id: msg.id,
    userId: msg.author,
    username: msg.author,
    profilePictureUrl: `https://picsum.photos/200?random=${msg.author}`,
    publishedAt: timeAgo(msg.publishedAt, '', { relativeDate: now }),
    text: msg.text,
  }));

  return {
    timeline: {
      type: HomeViewModelType.WithMessages,
      messages,
    },
  };
};
