import { createBrowserRouter, Outlet } from 'react-router-dom'
import { rootLayoutLoader, RootLayout } from '@/app/layouts/rootLayout'
import { AuthModalRoute } from '@/features/auth'
import { ProfilePage, profilePageLoader } from '@/pages/profile'
import { RouteErrorBoundary } from '@/shared/ui/RouteErrorBoundary'
import { requireAuthLoader } from './requireAuthLoader'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    loader: rootLayoutLoader,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: '/',
        element: (
          <>
            <p>Tell&lsquo;em</p>
            <Outlet />
          </>
        ),
        children: [
          {
            path: 'sign-in',
            element: <AuthModalRoute mode="sign-in" />,
            loader: requireAuthLoader(true),
          },
          {
            path: 'sign-up',
            element: <AuthModalRoute mode="sign-up" />,
            loader: requireAuthLoader(true),
          },
        ],
      },
      {
        path: '/:username',
        element: <ProfilePage />,
        loader: profilePageLoader,
      },
      { path: '*', element: <p>Not found</p> },
    ],
  },
])
