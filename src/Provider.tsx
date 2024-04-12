import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './router';
import { Provider as ReduxProvider } from 'react-redux';
import { AppStore } from '@/lib/create-store';

function Provider({ store, router }: { store: AppStore; router: AppRouter }) {
  return (
    <>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </>
  );
}

export default Provider;
