import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Provider from './Provider.tsx';
import { createStore } from '@/lib/create-store.ts';
import { FakeAuthGateway } from '@/lib/auth/infra/fake-auth-gateway.ts';
import { FakeTimelineGateway } from '@/lib/timelines/infra/fake-timeline.gateway.ts';
import { createRouter } from '@/router.tsx';
import { stateBuilder } from '@/lib/state-builder.ts';

const authGateway = new FakeAuthGateway();
authGateway.authUser = 'Alice';
authGateway.willSucceedForAuthForUser = 'Alice';

const timelineGateway = new FakeTimelineGateway(1000);
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

const store = createStore(
  {
    authGateway,
    timelineGateway,
  },
  stateBuilder().withAuthUser({ authUser: 'Alice' }).build()
);

const router = createRouter({ store });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} router={router} />
  </React.StrictMode>
);
