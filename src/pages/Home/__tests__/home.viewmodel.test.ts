import { createTestStore } from '@/lib/create-store';
import {
  HomeViewModelType,
  selectHomeViewModel,
} from '@/pages/Home/Home.viewmodel';
import { describe, test, expect } from 'vitest';

const getNow = () => '2024-04-12T14:03.000Z';

describe('Home view model', () => {
  test('Example: there is no timeline in the store', () => {
    const store = createTestStore();
    const homeViewModel = selectHomeViewModel(store.getState(), getNow);

    expect(homeViewModel).toEqual({
      timeline: {
        type: HomeViewModelType.NoTimeline,
      },
    });
  });

  test('There is no message in the timeline', () => {
    const store = createTestStore(
      {},
      {
        timelines: {
          ids: ['alice-timeline-id'],
          entities: {
            'alice-timeline-id': {
              id: 'alice-timeline-id',
              messages: [],
              user: 'Alice',
            },
          },
          loadingTimelineByUser: {},
        },
      }
    );

    const homeViewModel = selectHomeViewModel(store.getState(), getNow);

    expect(homeViewModel).toEqual({
      timeline: {
        type: HomeViewModelType.EmptyTimeline,
        info: 'There is no message yet',
      },
    });
  });

  test('There is one message in the timeline', () => {
    const store = createTestStore(
      {},
      {
        timelines: {
          ids: ['alice-timeline-id'],
          entities: {
            'alice-timeline-id': {
              id: 'alice-timeline-id',
              messages: ['msg1-id'],
              user: 'Alice',
            },
          },
          loadingTimelineByUser: {},
        },
        messages: {
          ids: ['msg1-id'],
          entities: {
            'msg1-id': {
              id: 'msg1-id',
              author: 'Bob',
              publishedAt: '2024-04-12T13:03:00.000Z',
              text: "Hi it's Bob",
            },
          },
        },
      }
    );

    const homeViewModel = selectHomeViewModel(store.getState(), getNow);

    expect(homeViewModel).toEqual({
      timeline: {
        type: HomeViewModelType.WithMessages,
        messages: [
          {
            id: 'msg1-id',
            userId: 'Bob',
            username: 'Bob',
            profilePictureUrl: 'https://picsum.photos/200?random=Bob',
            publishedAt: '1 hour ago',
            text: "Hi it's Bob",
          },
        ],
      },
    });
  });

  test('There is multiple messages in the timeline', () => {
    const store = createTestStore(
      {},
      {
        timelines: {
          ids: ['alice-timeline-id'],
          entities: {
            'alice-timeline-id': {
              id: 'alice-timeline-id',
              messages: ['msg1-id', 'msg2-id'],
              user: 'Alice',
            },
          },
          loadingTimelineByUser: {},
        },
        messages: {
          ids: ['msg1-id', 'msg2-id', 'msg3-id'],
          entities: {
            'msg1-id': {
              id: 'msg1-id',
              author: 'Bob',
              publishedAt: '2024-04-12T13:03:00.000Z',
              text: "Hi it's Bob",
            },
            'msg2-id': {
              id: 'msg2-id',
              author: 'Alice',
              publishedAt: '2024-04-12T13:25:00.000Z',
              text: 'Hi Bob!',
            },
            'msg3-id': {
              id: 'msg3-id',
              author: 'Charles',
              publishedAt: '2024-04-12T13:38:00.000Z',
              text: 'Hi Everyone!',
            },
          },
        },
      }
    );

    const homeViewModel = selectHomeViewModel(store.getState(), getNow);

    expect(homeViewModel).toEqual({
      timeline: {
        type: HomeViewModelType.WithMessages,
        messages: [
          {
            id: 'msg1-id',
            username: 'Bob',
            userId: 'Bob',
            profilePictureUrl: 'https://picsum.photos/200?random=Bob',
            publishedAt: '1 hour ago',
            text: "Hi it's Bob",
          },
          {
            id: 'msg2-id',
            username: 'Alice',
            userId: 'Alice',
            profilePictureUrl: 'https://picsum.photos/200?random=Alice',
            publishedAt: '38 minutes ago',
            text: 'Hi Bob!',
          },
        ],
      },
    });
  });

  test('The timeline is loading', () => {
    const store = createTestStore(
      {},
      {
        timelines: {
          ids: [],
          entities: {},
          loadingTimelineByUser: { Alice: true },
        },
      }
    );

    const homeViewModel = selectHomeViewModel(store.getState(), getNow);

    expect(homeViewModel).toEqual({
      timeline: {
        type: HomeViewModelType.LoadingTimeline,
        info: 'Loading...',
      },
    });
  });
});
