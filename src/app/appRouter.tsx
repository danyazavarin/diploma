import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { RequireAuth } from '../utils/hoc/RequireAuth';

const LayoutPage = lazy(() => import('../pages/LayoutPage/LayoutPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const AccountPage = lazy(() => import('../pages/AccountPage/AccountPage'));
const MainPage = lazy(() => import('../pages/MainPage/MainPage'));

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LayoutPage />
      </Suspense>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'main',
        element: <MainPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'account',
        element: (
          <RequireAuth>
            <AccountPage />
          </RequireAuth>
        ),
      },
    ],
  },
]);
