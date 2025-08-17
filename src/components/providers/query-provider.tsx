import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { memo, PropsWithChildren } from 'react';

const queryClient = new QueryClient();

type Props = PropsWithChildren<{
  disableDevtools?: boolean;
}>;

const QueryProvider = ({ children, disableDevtools }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {!disableDevtools && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default memo(QueryProvider);
