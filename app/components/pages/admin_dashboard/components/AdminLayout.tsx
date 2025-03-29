// components/admin/Layout/AdminLayout.tsx
import { AppShell } from '@mantine/core';
import { useEffect, useState } from 'react';
import { AdminHeader } from './AdminHeader';
import { useAuth } from '~/providers/AuthProvider';
import { AdminNavbar } from './AdminNavbar';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [opened] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user && user?.role !== 'admin') {
      logout();
      window.location.replace('/');
    }
  }, [user]);

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

      <AppShell.Navbar p="md">
        <AdminNavbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <div className="p-4 bg-white">{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
