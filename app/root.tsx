import { Outlet } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';

const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </MantineProvider>
  );
}
