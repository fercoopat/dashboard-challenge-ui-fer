import { Suspense } from 'react';
import { RouterProvider } from 'react-router';

import PageLoader from '@/components/common/page-loader';
import MainProvider from '@/components/providers/main-provider';
import appRoutes from '@/routes/app.routes';

const App = () => {
  return (
    <MainProvider>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={appRoutes} />
      </Suspense>
    </MainProvider>
  );
};
export default App;
