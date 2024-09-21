import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './components/pages/MainPage/MainPage';
import OneGamePage from './components/pages/OneGamePage/OneGamePage';

function App(): JSX.Element {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          element: <MainPage />,
          path: '/',
        },
        {
          element: <OneGamePage />,
          path: '/oneGame/:gameId',
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
