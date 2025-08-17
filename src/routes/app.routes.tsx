import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

import mainRoutes from '@/routes/main.routes';

const AuthProviderLayout = lazy(
  () => import('@/components/layouts/auth-provider.layout')
);
const MainLayout = lazy(() => import('@/components/layouts/main.layout'));

const appRoutes = createBrowserRouter([
  {
    path: '',
    Component: AuthProviderLayout,
    children: [
      {
        path: '',
        Component: MainLayout,
        children: mainRoutes,
      },
    ],
  },
]);

export default appRoutes;
