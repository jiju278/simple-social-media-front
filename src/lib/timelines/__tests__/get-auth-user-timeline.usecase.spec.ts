import { FakeAuthGateway } from '@/lib/auth/infra/fake-auth-gateway';
import { createStore } from '@/lib/create-store';
import { FakeTimelineGateway } from '@/lib/timelines/infra/fake-timeline.gateway';
import { getAuthUserTimeline } from '@/lib/timelines/usecases/get-auth-user-timeline.usecase';
import { describe, it, expect } from 'vitest';

describe("Feature: Retrieving authenticated user's timeline", () => {
  it('Scenario: Alice is authenticated and can see her timeline', async () => {
    givenAuthenticatedUserId('Alice');
    givenExistingTimeline({
      user: 'Alice',
      messages: [
        {
          text: "Hello it's Bob",
          author: 'Bob',
          publishedAt: '2024-04-11T17:30:00.000Z',
        },
        {
          text: "Hello it's Alice",
          author: 'Alice',
          publishedAt: '2024-04-11T17:25:00.000Z',
        },
      ],
    });
    await whenRetrievingAuthenticatedUserTimeline();
    thenTheReceivedTimelineShouldBe({
      user: 'Alice',
      messages: [
        {
          text: "Hello it's Bob",
          author: 'Bob',
          publishedAt: '2024-04-11T17:30:00.000Z',
        },
        {
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
  user: string;
  messages: {
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
  user: string;
  messages: {
    text: string;
    author: string;
    publishedAt: string;
  }[];
}) {
  const authUserTimeline = store.getState();
  expect(authUserTimeline).toEqual(expectedTimeline);
}
