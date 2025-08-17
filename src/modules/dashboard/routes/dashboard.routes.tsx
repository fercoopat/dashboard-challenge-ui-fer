import { lazy } from 'react';
import { RouteObject } from 'react-router';

const DashboardPage = lazy(
  () => import('@/modules/dashboard/pages/dashboard.page')
);

const dashboardRoutes: RouteObject[] = [
  {
    path: '',
    index: true,
    Component: DashboardPage,
  },
];

export default dashboardRoutes;
