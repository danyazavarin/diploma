import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Preloader } from '../entities/preloader';
import { LayoutPage } from '../pages/layoutPage';

const PreviewPage = lazy(() => import('../pages/previewPage/PreviewPage'));
const NotFoundPage = lazy(() => import('../pages/notFoundPage/NotFoundPage'));
const AccountPage = lazy(() => import('../pages/accountPage/AccountPage'));
const MainPage = lazy(() => import('../pages/mainPage/MainPage'));
const ContactsPage = lazy(() => import('../pages/contactsPage/ContactsPage'));
const AboutPage = lazy(() => import('../pages/aboutPage/AboutPage'));
const AuthorizationPage = lazy(() => import('../pages/authorizationPage/AuthorizationPage'));
const RegistrationPage = lazy(() => import('../pages/registrationPage/RegistrationPage'));

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
            <AuthorizationPage />
          </Suspense>
        ),
      },
      {
        path: 'registration',
        element: (
          <Suspense fallback={<Preloader />}>
            <RegistrationPage />
          </Suspense>
        ),
      },
      {
        path: 'account',
        element: (
          <Suspense fallback={<Preloader />}>
            <AccountPage />
          </Suspense>
        ),
      },
    ],
  },
]);
