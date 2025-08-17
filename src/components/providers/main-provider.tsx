import { memo, PropsWithChildren } from 'react';

import QueryProvider from '@/components/providers/query-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const MainProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <QueryProvider>
        {children}

        <Toaster richColors closeButton />
      </QueryProvider>
    </ThemeProvider>
  );
};

export default memo(MainProvider);
