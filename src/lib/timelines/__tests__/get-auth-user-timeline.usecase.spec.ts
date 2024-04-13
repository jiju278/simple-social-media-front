import {
  AuthFixture,
  createAuthFixture,
} from '@/lib/auth/__tests__/auth.fixture';
import { stateBuilderProvider } from '@/lib/state-builder';
import {
  TimelinesFixture,
  createTimelineFixture,
} from '@/lib/timelines/__tests__/timeline.fixture';
import { describe, it, beforeEach } from 'vitest';

describe("Feature: Retrieving authenticated user's timeline", () => {
  let timelineFixture: TimelinesFixture;
  let authFixture: AuthFixture;

  beforeEach(() => {
    const testStateBuilderProvider = stateBuilderProvider();
    timelineFixture = createTimelineFixture(testStateBuilderProvider);
    authFixture = createAuthFixture(testStateBuilderProvider);
  });
  it('Scenario: Alice is authenticated and can see her timeline', async () => {
    authFixture.givenAuthenticatedUserIs('Alice');
    timelineFixture.givenExistingRemoteTimeline({
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
    const timelineRetrieving =
      timelineFixture.whenRetrievingAuthenticatedUserTimeline();
    timelineFixture.thenTheTimelineOfUserShouldBeLoading('Alice');
    await timelineRetrieving;

    timelineFixture.thenTheReceivedTimelineShouldBe({
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
