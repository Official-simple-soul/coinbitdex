// components/admin/Layout/AdminLayout.tsx
import { AppShell, Burger, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { AdminNavbar } from './AdminNavbar';
import { AdminHeader } from './AdminHeader';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();
  const [opened] = useState(false);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <AdminHeader />
      </AppShell.Header>

      <AppShell.Main>
        <div className="p-4">{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
