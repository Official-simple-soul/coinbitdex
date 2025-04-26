import { Card, Text, Title, Group, Badge, Stack } from '@mantine/core';
import {
  IconWallet,
  IconTrendingUp,
  IconMoneybag,
  IconMinimize,
} from '@tabler/icons-react';

const BalanceCard = ({ user }) => {
  return (
    <Card padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb={'md'}>
        <Stack gap={0}>
          <Text size="sm" opacity={0.8}>
            Available Balance
          </Text>
          <Title order={2} style={{ fontSize: '20px' }}>
            ${user.balance.toLocaleString()}
          </Title>
        </Stack>
        <Badge color={'blue'} variant="filled">
          Tier {user.kyc_level}
        </Badge>
      </Group>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Group gap={4}>
            <IconWallet size={18} opacity={0.8} />
            <Text size="xs" opacity={0.8}>
              Total Deposit
            </Text>
          </Group>
          <Text size="sm" fw={500}>
            ${user.total_deposit.toLocaleString()}
          </Text>
        </div>

        <div className="flex items-center justify-between">
          <Group gap={4}>
            <IconTrendingUp size={18} opacity={0.8} />
            <Text size="xs" opacity={0.8}>
              Copy Trading Profit
            </Text>
          </Group>
          <Text size="sm" fw={500}>
            ${user.copy_trading_profit.toLocaleString()}
          </Text>
        </div>

        <div className="flex items-center justify-between">
          <Group gap={4}>
            <IconMoneybag size={18} opacity={0.8} />
            <Text size="xs" opacity={0.8}>
              Total Profit
            </Text>
          </Group>
          <Text size="sm" fw={500}>
            ${user.total_profit.toLocaleString()}
          </Text>
        </div>
        <div className="flex items-center justify-between">
          <Group gap={4}>
            <IconWallet size={18} opacity={0.8} />
            <Text size="xs" opacity={0.8}>
              Total Withdraw
            </Text>
          </Group>
          <Text size="sm" fw={500}>
            ${user.total_withdraw.toLocaleString()}
          </Text>
        </div>
        <div className="flex items-center justify-between">
          <Group gap={4}>
            <IconMinimize size={18} opacity={0.8} />
            <Text size="xs" opacity={0.8}>
              Minimum Deposit
            </Text>
          </Group>
          <Text size="sm" fw={500}>
            ${user?.minimum_deposit?.toLocaleString() || (100).toLocaleString()}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default BalanceCard;
