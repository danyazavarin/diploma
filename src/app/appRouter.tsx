import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { RequireAuth } from '../utils/hoc/RequireAuth';
import { Preloader } from '../entities/preloader';
import { LayoutPage } from '../pages/LayoutPage';

const PreviewPage = lazy(() => import('../pages/PreviewPage/PreviewPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const AccountPage = lazy(() => import('../pages/AccountPage/AccountPage'));
const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const ContactsPage = lazy(() => import('../pages/ContactsPage/ContactsPage'));
const AboutPage = lazy(() => import('../pages/AboutPage/AboutPage'));

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Navigate to='/preview' replace />,
      },
      {
        path: 'preview',
        element: (
          <Suspense fallback={<Preloader />}>
            <PreviewPage />
          </Suspense>
        ),
      },
      {
        path: 'main',
        element: (
          <Suspense fallback={<Preloader />}>
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
          <Suspense fallback={<Preloader />}>
            <ContactsPage />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<Preloader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'authorization',
        element: (
          <Suspense fallback={<Preloader />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: 'account',
        element: (
          <Suspense fallback={<Preloader />}>
            <RequireAuth>
              <AccountPage />
            </RequireAuth>
          </Suspense>
        ),
      },
    ],
  },
]);
