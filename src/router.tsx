import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Layout from '@/pages/Layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      // {
      //   path: 'profile',
      //   element: <Profile />,
      // },
    ],
  },
]);
