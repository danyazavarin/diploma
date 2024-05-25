import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { RequireAuth } from '../utils/hoc/RequireAuth';

const LayoutPage = lazy(() => import('../pages/LayoutPage/LayoutPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const AccountPage = lazy(() => import('../pages/AccountPage/AccountPage'));
const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const ContactsPage = lazy(() => import('../pages/ContactsPage/ContactsPage'));

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
        index: true,
        element: <Navigate to={'/main'} replace/>
      },
      {
        path: 'main',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: 'library',
        element: <div>In development</div>,
      },
      {
        path: 'contacts',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ContactsPage />
          </Suspense>
        ),
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
