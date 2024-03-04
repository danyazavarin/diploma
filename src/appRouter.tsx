import { createBrowserRouter, Navigate } from 'react-router-dom';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './pages/LoginPage'
import { MainPage } from './pages/MainPage';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        index: true,
        element: <Navigate to={'login'} replace />,
      },
      {
        path: 'login',
        element: <LoginPage />
      },
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />,
  }
]);