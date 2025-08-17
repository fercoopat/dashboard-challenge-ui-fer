import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router';

import PageLoader from '@/components/common/page-loader';
import { DashboardProvider } from '@/modules/dashboard/contexts/dashboard.context';

const DashboardPage = lazy(
  () => import('@/modules/dashboard/pages/dashboard.page')
);

const dashboardRoutes: RouteObject[] = [
  {
    path: '',
    index: true,
    element: (
      <DashboardProvider>
        <Suspense fallback={<PageLoader />}>
          <DashboardPage />
        </Suspense>
      </DashboardProvider>
    ),
  },
];

export default dashboardRoutes;
