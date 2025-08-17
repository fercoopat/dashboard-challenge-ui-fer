import { memo, PropsWithChildren } from 'react';

import QueryProvider from '@/components/providers/query-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const MainProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <ThemeProvider>
        {children}

        <Toaster richColors />
      </ThemeProvider>
    </QueryProvider>
  );
};

export default memo(MainProvider);
