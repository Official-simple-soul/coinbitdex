// components/admin/Layout/Navbar.tsx
import { NavLink, ScrollArea } from '@mantine/core';
import {
  IconDashboard,
  IconUsers,
  IconCash,
  IconList,
  IconSettings,
  IconLogout,
} from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router';

const navItems = [
  { icon: IconDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  //   { icon: IconUsers, label: 'Users', href: '/admin/users' },
  //   { icon: IconCash, label: 'Balances', href: '/admin/balances' },
  //   { icon: IconList, label: 'Transactions', href: '/admin/transactions' },
  //   { icon: IconSettings, label: 'Settings', href: '/admin/settings' },
];

export function AdminNavbar() {
  const router = useNavigate();
  const { pathname } = useLocation();
  const currentPath = pathname;

  return (
    <div>
      <div>
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            active={currentPath === item.href}
            label={item.label}
            leftSection={<item.icon size={18} />}
            onClick={() => router(item.href)}
            variant="filled"
            color="blue"
            className="rounded-md mb-1 hover:bg-blue-50 dark:hover:bg-blue-900/30"
          />
        ))}
      </div>

      {/* <div>
        <NavLink
          label="Logout"
          leftSection={<IconLogout size={18} />}
          onClick={() => {
            // Add your logout logic here
            router('/admin/logout');
          }}
          className="rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
        />
      </div> */}
    </div>
  );
}
