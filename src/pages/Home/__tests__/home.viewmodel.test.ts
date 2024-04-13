import { createTestStore } from '@/lib/create-store';
import { stateBuilder } from '@/lib/state-builder';
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

  test('Exemple: There is no message in the timeline', () => {
    const initialState = stateBuilder()
      .withTimeline({
        id: 'alice-timeline-id',
        messages: [],
        user: 'Alice',
      })
      .build();

    const store = createTestStore({}, initialState);

    const homeViewModel = selectHomeViewModel(store.getState(), getNow);

    expect(homeViewModel).toEqual({
      timeline: {
        type: HomeViewModelType.EmptyTimeline,
        info: 'There is no message yet',
      },
    });
  });

  test('There is one message in the timeline', () => {
    const initialState = stateBuilder()
      .withTimeline({
        id: 'alice-timeline-id',
        user: 'Alice',
        messages: ['msg1-id'],
      })
      .withMessages([
        {
          id: 'msg1-id',
          author: 'Bob',
          publishedAt: '2024-04-12T13:03:00.000Z',
          text: "Hi it's Bob",
        },
      ])
      .build();

    const store = createTestStore({}, initialState);

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
    const initialState = stateBuilder()
      .withTimeline({
        id: 'alice-timeline-id',
        user: 'Alice',
        messages: ['msg1-id', 'msg2-id'],
      })
      .withMessages([
        {
          id: 'msg1-id',
          author: 'Bob',
          publishedAt: '2024-04-12T13:03:00.000Z',
          text: "Hi it's Bob",
        },
        {
          id: 'msg2-id',
          author: 'Alice',
          publishedAt: '2024-04-12T13:25:00.000Z',
          text: 'Hi Bob!',
        },
        {
          id: 'msg3-id',
          author: 'Charles',
          publishedAt: '2024-04-12T13:38:00.000Z',
          text: 'Hi Everyone!',
        },
      ])
      .build();

    const store = createTestStore({}, initialState);

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
    const initialState = stateBuilder()
      .withLoadingTimelineOf({
        user: 'Alice',
      })
      .build();
    const store = createTestStore({}, initialState);

    const homeViewModel = selectHomeViewModel(store.getState(), getNow);

    expect(homeViewModel).toEqual({
      timeline: {
        type: HomeViewModelType.LoadingTimeline,
        info: 'Loading...',
      },
    });
  });
});
