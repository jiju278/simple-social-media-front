import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import { createHomeLoader } from '@/pages/Home/create-home-loader';
import { AppStore } from '@/lib/create-store';
import Login from '@/pages/Login/Login';
import ProtectedPageLayout from '@/pages/ProtectedPageLayout/ProtectedPageLayout';

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
        { index: true, loader: createHomeLoader({ store }), element: <Home /> },
        // {
        //   path: 'profile',
        //   element: <Profile />,
        // },
      ],
    },
  ]);

export type AppRouter = ReturnType<typeof createRouter>;
