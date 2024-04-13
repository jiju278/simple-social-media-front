import { FakeAuthGateway } from '@/lib/auth/infra/fake-auth-gateway';
import { createStore } from '@/lib/create-store';
import { stateBuilder } from '@/lib/state-builder';
import { FakeTimelineGateway } from '@/lib/timelines/infra/fake-timeline.gateway';
import { selectIsUserTimelineLoading } from '@/lib/timelines/slices/timelines.slice';
import { getAuthUserTimeline } from '@/lib/timelines/usecases/get-auth-user-timeline.usecase';
import { describe, it, expect } from 'vitest';

describe("Feature: Retrieving authenticated user's timeline", () => {
  it('Scenario: Alice is authenticated and can see her timeline', async () => {
    givenAuthenticatedUserId('Alice');
    givenExistingTimeline({
      id: 'alice-timeline-id',
      user: 'Alice',
      messages: [
        {
          id: 'msg1-id',
          text: "Hello it's Bob",
          author: 'Bob',
          publishedAt: '2024-04-11T17:30:00.000Z',
        },
        {
          id: 'msg2-id',
          text: "Hello it's Alice",
          author: 'Alice',
          publishedAt: '2024-04-11T17:25:00.000Z',
        },
      ],
    });
    const timelineRetrieving = whenRetrievingAuthenticatedUserTimeline();
    thenTheTimelineOfUserShouldBeLoading('Alice');
    await timelineRetrieving;

    thenTheReceivedTimelineShouldBe({
      id: 'alice-timeline-id',
      user: 'Alice',
      messages: [
        {
          id: 'msg1-id',
          text: "Hello it's Bob",
          author: 'Bob',
          publishedAt: '2024-04-11T17:30:00.000Z',
        },
        {
          id: 'msg2-id',
          text: "Hello it's Alice",
          author: 'Alice',
          publishedAt: '2024-04-11T17:25:00.000Z',
        },
      ],
    });
  });
});

const authGateway = new FakeAuthGateway();
const timelineGateway = new FakeTimelineGateway();
const store = createStore({ authGateway, timelineGateway });

function givenAuthenticatedUserId(user: string) {
  authGateway.authUser = user;
}

function givenExistingTimeline(timeline: {
  id: string;
  user: string;
  messages: {
    id: string;
    text: string;
    author: string;
    publishedAt: string;
  }[];
}) {
  timelineGateway.timelinesByUser.set('Alice', timeline);
}

async function whenRetrievingAuthenticatedUserTimeline() {
  await store.dispatch(getAuthUserTimeline());
}

function thenTheReceivedTimelineShouldBe(expectedTimeline: {
  id: string;
  user: string;
  messages: {
    id: string;
    text: string;
    author: string;
    publishedAt: string;
  }[];
}) {
  const expectedState = stateBuilder()
    .withTimeline({
      id: expectedTimeline.id,
      user: expectedTimeline.user,
      messages: expectedTimeline.messages.map((m) => m.id),
    })
    .withMessages(expectedTimeline.messages)
    .withNotLoadingTimelineOf({ user: expectedTimeline.user })
    .build();

  expect(store.getState()).toEqual(expectedState);
}

function thenTheTimelineOfUserShouldBeLoading(user: string) {
  const isUserTimelineLoading = selectIsUserTimelineLoading(
    user,
    store.getState()
  );
  expect(isUserTimelineLoading).toBe(true);
}
