import { FakeAuthGateway } from '@/lib/auth/infra/fake-auth-gateway';
import { AppStore, createTestStore } from '@/lib/create-store';
import { stateBuilder, stateBuilderProvider } from '@/lib/state-builder';
import { FakeMessageGateway } from '@/lib/timelines/infra/fake-message.gateway';
import { FakeTimelineGateway } from '@/lib/timelines/infra/fake-timeline.gateway';
import { StubDateProvider } from '@/lib/timelines/infra/stub-date-provider';
import { Timeline } from '@/lib/timelines/model/timeline.entity';
import { selectIsUserTimelineLoading } from '@/lib/timelines/slices/timelines.slice';
import { getAuthUserTimeline } from '@/lib/timelines/usecases/get-auth-user-timeline.usecase';
import {
  PostMessageParams,
  postMessage,
} from '@/lib/timelines/usecases/post-message.usecase';
import { expect } from 'vitest';

type ExpectedTimeline = {
  id: string;
  user: string;
  messages: {
    id: string;
    text: string;
    author: string;
    publishedAt: string;
  }[];
};

export const createTimelineFixture = (
  testStateBuilderProvider = stateBuilderProvider()
) => {
  const authGateway = new FakeAuthGateway();
  const timelineGateway = new FakeTimelineGateway();
  const dateProvider = new StubDateProvider();
  const messageGateway = new FakeMessageGateway();

  let store: AppStore;

  return {
    givenNowIs(now: Date) {
      dateProvider.now = now;
    },
    givenExistingRemoteTimeline(timeline: {
      id: string;
      user: string;
      messages: {
        id: string;
        text: string;
        author: string;
        publishedAt: string;
      }[];
    }) {
      timelineGateway.timelinesByUser.set(timeline.user, timeline);
    },

    givenTimeline(timeline: Timeline) {
      testStateBuilderProvider.setState((builder) =>
        builder
          .withTimeline(timeline)
          .withNotLoadingTimelineOf({ user: timeline.user })
      );
    },

    async whenUserPostsMessage(postMessageParams: PostMessageParams) {
      store = createTestStore(
        { dateProvider, messageGateway },
        testStateBuilderProvider.getState()
      );
      await store.dispatch(postMessage(postMessageParams));
    },

    async whenRetrievingAuthenticatedUserTimeline() {
      store = createTestStore(
        { authGateway, timelineGateway, dateProvider },
        testStateBuilderProvider.getState()
      );
      await store.dispatch(getAuthUserTimeline());
    },

    thenTheReceivedTimelineShouldBe(expectedTimeline: ExpectedTimeline) {
      this.thenTimelineShouldBe(expectedTimeline);
    },

    thenTheTimelineOfUserShouldBeLoading(user: string) {
      const isUserTimelineLoading = selectIsUserTimelineLoading(
        user,
        store.getState()
      );
      expect(isUserTimelineLoading).toBe(true);
    },

    thenMessageShouldHaveBeenPosted(expectedPostedMessage: {
      id: string;
      timelineId: string;
      author: string;
      text: string;
      publishedAt: string;
    }) {
      expect(messageGateway.lastPostedMessage).toEqual(expectedPostedMessage);
    },

    thenTimelineShouldBe(expectedTimeline: ExpectedTimeline) {
      const expectedState = stateBuilder(testStateBuilderProvider.getState())
        .withAuthUser({ authUser: expectedTimeline.user })
        .withTimeline({
          id: expectedTimeline.id,
          user: expectedTimeline.user,
          messages: expectedTimeline.messages.map((m) => m.id),
        })
        .withMessages(expectedTimeline.messages)
        .withNotLoadingTimelineOf({ user: expectedTimeline.user })
        .build();

      expect(store.getState()).toEqual(expectedState);
    },
  };
};

export type TimelinesFixture = ReturnType<typeof createTimelineFixture>;
