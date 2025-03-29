import { Card, Text, Title, Group, Badge, Stack } from '@mantine/core';
import { IconWallet, IconTrendingUp } from '@tabler/icons-react';

const BalanceCard = ({ user }) => {
  return (
    <Card padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb={'md'}>
        <Stack gap={0}>
          <Text size="sm" opacity={0.8}>
            Available Balance
          </Text>
          <Title order={2} style={{ fontSize: '20px' }}>
            ${user.balance.toFixed(2)}
          </Title>
        </Stack>
        <Badge color={'blue'} variant="filled">
          Tier {user.kyc_level}
        </Badge>
      </Group>

      <Group gap={4} justify="space-between">
        <div>
          <Group gap={4}>
            <IconWallet size={18} opacity={0.8} />
            <Text size="sm" opacity={0.8}>
              Total Deposit
            </Text>
          </Group>
          <Text fw={600}>${user.total_deposit.toFixed(2)}</Text>
        </div>

        <div>
          <Group gap={4}>
            <IconTrendingUp size={18} opacity={0.8} />
            <Text size="sm" opacity={0.8}>
              Copy Trading Profit
            </Text>
          </Group>
          <Text fw={600}>${user.copy_trading_profit.toFixed(2)}</Text>
        </div>
      </Group>
    </Card>
  );
};

export default BalanceCard;
