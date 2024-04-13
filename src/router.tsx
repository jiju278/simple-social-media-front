import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import { createHomeLoader } from '@/pages/Home/create-home-loader';
import { AppStore } from '@/lib/create-store';
import Login from '@/pages/Login/Login';
import ProtectedPageLayout from '@/pages/ProtectedPageLayout/ProtectedPageLayout';
import RedirectHome from '@/pages/Home/RedirectHome';

export const createRouter = ({ store }: { store: AppStore }) =>
  createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },

    {
      path: '/',
      element: <ProtectedPageLayout />,
      children: [
        { index: true, element: <RedirectHome /> },
        {
          path: 'home',
          loader: createHomeLoader({ store }),
          element: <Home />,
        },
      ],
    },
  ]);

export type AppRouter = ReturnType<typeof createRouter>;
