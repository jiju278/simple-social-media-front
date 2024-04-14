import {
  AuthFixture,
  createAuthFixture,
} from '@/lib/auth/__tests__/auth.fixture';
import { stateBuilderProvider } from '@/lib/state-builder';
import {
  TimelinesFixture,
  createTimelineFixture,
} from '@/lib/timelines/__tests__/timeline.fixture';
import { describe, test, beforeEach } from 'vitest';

describe('Feature: Posting a message on a timeline', () => {
  let timelinesFixture: TimelinesFixture;
  let authFixture: AuthFixture;

  beforeEach(() => {
    const testStateBuilderProvider = stateBuilderProvider();
    authFixture = createAuthFixture(testStateBuilderProvider);
    timelinesFixture = createTimelineFixture(testStateBuilderProvider);
  });
  test('Scenario: Alice can post a message on her empty timeline', async () => {
    authFixture.givenAuthenticatedUserIs('Alice');
    timelinesFixture.givenNowIs(new Date('2024-04-13T22:33:00.000Z'));
    timelinesFixture.givenTimeline({
      id: 'alice-timeline-id',
      user: 'Alice',
      messages: [],
    });

    await timelinesFixture.whenUserPostsMessage({
      messageId: 'msg1-id',
      timelineId: 'alice-timeline-id',
      text: "Hello it's Alice",
    });

    timelinesFixture.thenMessageShouldHaveBeenPosted({
      id: 'msg1-id',
      timelineId: 'alice-timeline-id',
      author: 'Alice',
      text: "Hello it's Alice",
      publishedAt: '2024-04-13T22:33:00.000Z',
    });

    timelinesFixture.thenTimelineShouldBe({
      id: 'alice-timeline-id',
      user: 'Alice',
      messages: [
        {
          id: 'msg1-id',
          text: "Hello it's Alice",
          author: 'Alice',
          publishedAt: '2024-04-13T22:33:00.000Z',
        },
      ],
    });
  });

  test('Scenario: Alice can post a message on her timeline that contains existing messages', async () => {
    authFixture.givenAuthenticatedUserIs('Alice');
    timelinesFixture.givenNowIs(new Date('2024-04-14T14:04:00.000Z'));
    timelinesFixture.givenTimeline({
      id: 'alice-timeline-id',
      user: 'Alice',
      messages: [
        {
          id: 'msg1-id',
          text: "Hello it's Alice",
          author: 'Alice',
          publishedAt: '2024-04-13T22:33:00.000Z',
        },
      ],
    });

    await timelinesFixture.whenUserPostsMessage({
      messageId: 'msg2-id',
      timelineId: 'alice-timeline-id',
      text: 'How are you today?',
    });

    timelinesFixture.thenMessageShouldHaveBeenPosted({
      id: 'msg2-id',
      timelineId: 'alice-timeline-id',
      author: 'Alice',
      text: 'How are you today?',
      publishedAt: '2024-04-14T14:04:00.000Z',
    });

    timelinesFixture.thenTimelineShouldBe({
      id: 'alice-timeline-id',
      user: 'Alice',
      messages: [
        {
          id: 'msg1-id',
          text: "Hello it's Alice",
          author: 'Alice',
          publishedAt: '2024-04-13T22:33:00.000Z',
        },
        {
          id: 'msg2-id',
          text: 'How are you today?',
          author: 'Alice',
          publishedAt: '2024-04-14T14:04:00.000Z',
        },
      ],
    });
  });
});
