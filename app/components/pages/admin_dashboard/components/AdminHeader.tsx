import { AppShell, Group, Text, ActionIcon } from '@mantine/core';
import {
  IconSun,
  IconMoonStars,
  IconBell,
  IconLogout,
} from '@tabler/icons-react';
import { useAuth } from '~/providers/AuthProvider';

export function AdminHeader() {
  const { logout } = useAuth();

  return (
    <AppShell.Header p="md">
      <Group justify="space-between" style={{ height: '100%' }}>
        <Group>
          <ActionIcon variant="outline" color="gray" title="Notifications">
            <IconBell size={18} />
          </ActionIcon>
        </Group>
        <Group>
          <Text size="sm" mr={3}>
            {'Admin'}
          </Text>
          <ActionIcon
            variant="outline"
            color="red"
            title="Notifications"
            onClick={logout}
          >
            <IconLogout size={18} />
          </ActionIcon>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
