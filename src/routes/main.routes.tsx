import { RouteObject } from 'react-router';

import dashboardRoutes from '@/modules/dashboard/routes/dashboard.routes';

const mainRoutes: RouteObject[] = [{ path: '', children: dashboardRoutes }];

export default mainRoutes;
