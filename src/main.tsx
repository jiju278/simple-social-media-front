import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Provider from './Provider.tsx';
import { createStore } from '@/lib/create-store.ts';
import { FakeAuthGateway } from '@/lib/auth/infra/fake-auth-gateway.ts';
import { FakeTimelineGateway } from '@/lib/timelines/infra/fake-timeline.gateway.ts';
import { createRouter } from '@/router.tsx';
import { FakeStorageAuthGateway } from '@/lib/auth/infra/fake-storage-auth.gateway.ts';
import { FakeMessageGateway } from '@/lib/timelines/infra/fake-message.gateway.ts';
import { RealDateProvider } from '@/lib/timelines/infra/real-date-provider.ts';

const fakeAuthGateway = new FakeAuthGateway(500);
fakeAuthGateway.willSucceedForAuthForUser = 'Alice';
const authGateway = new FakeStorageAuthGateway(fakeAuthGateway);
const timelineGateway = new FakeTimelineGateway(1000);
const messageGateway = new FakeMessageGateway();
const dateProvider = new RealDateProvider();

timelineGateway.timelinesByUser.set('Alice', {
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

const store = createStore({
  authGateway,
  timelineGateway,
  messageGateway,
  dateProvider,
});

const router = createRouter({ store });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} router={router} />
  </React.StrictMode>
);
