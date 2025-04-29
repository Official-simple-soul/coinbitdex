import { useNavigate, useParams } from 'react-router';
import { AdminLayout } from './components/AdminLayout';
import { useState } from 'react';
import {
  Text,
  Title,
  Group,
  Stack,
  Button,
  Modal,
  NumberInput,
  Select,
  Divider,
  ActionIcon,
  Menu,
  Box,
} from '@mantine/core';
import {
  useDeposits,
  useKYC,
  useTransactions,
  useUser,
} from '~/services/users.service';
import TransactionDataComp from '~/components/common/TransactionDataComp';
import DepositHistory from './components/DepositHistory';
import BalanceCard from './components/BalanceCard';
import KycVerificationCard from './components/KYCVerificationCard';
import ProfileCard from './components/ProfileCard';
import {
  IconArrowLeft,
  IconDotsVertical,
  IconCash,
  IconBan,
  IconCheck,
  IconPlus,
  IconMinus,
  IconWallet,
  IconUser,
  IconMinimize,
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useAuth } from '~/providers/AuthProvider';
import type { UserData } from '~/providers/types';
import { useQueryClient } from '@tanstack/react-query';
import { doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '~/config/firebase';

function UserDetails() {
  const queryClient = useQueryClient();
  const { uid } = useParams();
  const navigate = useNavigate();
  const { data: kyc } = uid ? useKYC(uid) : { data: null };
  const { data: user, isLoading } = uid
    ? useUser(uid)
    : { data: null, isLoading: false };
  const { data: deposits } = uid ? useDeposits(uid) : { data: [] };
  const { data: transactions } = uid ? useTransactions(uid) : { data: [] };
  const { updateUser } = useAuth();
  const [topupModalOpen, setTopupModalOpen] = useState(false);
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [upgradeKycModalOpen, setUpgradeKycModalOpen] = useState(false);
  const [topupAmount, setTopupAmount] = useState(0);
  const [topupType, setTopupType] = useState('main');
  const [loading, setLoading] = useState(false);
  const [minimumModalOpen, setMinimumModalOpen] = useState(false);
  const [minimumDeposit, setMinimumDeposit] = useState(0);
  const [confirmApproveWithdraw, setConfirmApproveWithdraw] = useState(false);
  const [withdrawData, setWithdrawData] = useState(null);

  const [actionType, setActionType] = useState<'add' | 'deduct'>('add');

  const handleBalanceUpdate = () => {
    if (!uid || !user) return;

    setLoading(true);

    // Determine current balance based on selected type
    const currentBalance =
      topupType === 'main'
        ? user.balance
        : topupType === 'copy_trading'
        ? user.copy_trading_profit
        : topupType === 'total_withdraw'
        ? user.total_withdraw || 0
        : user.total_profit;

    // Calculate new balance
    const newBalance =
      actionType === 'add'
        ? currentBalance + topupAmount
        : currentBalance - topupAmount;

    // Prevent negative balances
    if (actionType === 'deduct' && newBalance < 0) {
      notifications.show({
        title: 'Error',
        message: 'Cannot deduct more than available balance',
        color: 'red',
      });
      setLoading(false);
      return;
    }

    // Prepare update data based on balance type
    const updateData: Partial<UserData> = {};
    if (topupType === 'main') {
      updateData.balance = newBalance;
    } else if (topupType === 'copy_trading') {
      updateData.copy_trading_profit = newBalance;
    } else if (topupType === 'total_withdraw') {
      updateData.total_withdraw = newBalance;
    } else {
      updateData.total_profit = newBalance;
    }

    updateUser(uid, updateData)
      .then(() => {
        notifications.show({
          title: 'Success',
          message: `${
            topupType === 'main'
              ? 'Main Balance'
              : topupType === 'copy_trading'
              ? 'Copy Trading Profit'
              : topupType === 'total_withdraw'
              ? 'Total Withdraw'
              : 'Total Profit'
          } ${actionType === 'add' ? 'increased' : 'decreased'} successfully`,
          color: 'green',
        });
        setTopupModalOpen(false);
        setTopupAmount(0);
        queryClient.invalidateQueries({ queryKey: ['user', uid] });
        queryClient.invalidateQueries({ queryKey: ['users'] });
      })
      .catch(() => {
        notifications.show({
          title: 'Error',
          message: 'Failed to update balance',
          color: 'red',
        });
      })
      .finally(() => setLoading(false));
  };

  const handleBlockUser = () => {
    if (!uid) return;

    setLoading(true);
    const updateData: Partial<UserData> = {
      isBlocked: !user?.isBlocked,
    };

    updateUser(uid, updateData)
      .then(() => {
        notifications.show({
          title: 'Success',
          message: `User ${
            user?.isBlocked ? 'unblocked' : 'blocked'
          } successfully`,
          color: 'green',
        });
        setBlockModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ['user', uid] });
        queryClient.invalidateQueries({ queryKey: ['users'] });
      })
      .catch(() => {
        notifications.show({
          title: 'Error',
          message: 'Failed to update user status',
          color: 'red',
        });
      })
      .finally(() => setLoading(false));
  };

  const handleUpgradeTier = () => {
    if (!uid) return;

    if (user?.kyc_level === 3) {
      notifications.show({
        title: 'Error',
        message: 'User is already at the highest tier',
        color: 'red',
      });
      return;
    }

    setLoading(true);
    const updateData: Partial<UserData> = {
      kyc_level: increment(1),
    };

    updateUser(uid, updateData)
      .then(() => {
        notifications.show({
          title: 'Success',
          message: `Tier upgraded successfully`,
          color: 'green',
        });
        setUpgradeKycModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ['user', uid] });
        queryClient.invalidateQueries({ queryKey: ['users'] });
      })
      .catch(() => {
        notifications.show({
          title: 'Error',
          message: 'Failed to update tier status',
          color: 'red',
        });
      })
      .finally(() => setLoading(false));
  };

  const handleSetMinimum = () => {
    if (!uid) return;

    setLoading(true);
    const updateData: Partial<UserData> = {
      minimum_deposit: minimumDeposit,
    };

    updateUser(uid, updateData)
      .then(() => {
        notifications.show({
          title: 'Success',
          message: `Minimum copy trading updated successfully`,
          color: 'green',
        });
        setMinimumModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ['user', uid] });
        queryClient.invalidateQueries({ queryKey: ['users'] });
      })
      .catch(() => {
        notifications.show({
          title: 'Error',
          message: 'Failed to update minimum copy trading',
          color: 'red',
        });
      })
      .finally(() => setLoading(false));
  };

  const handleApproveWithdrawalRequest = async () => {
    if (!uid) return;

    if ((withdrawData?.amount || 0) < 100) {
      notifications.show({
        title: 'Error',
        message: 'Minimum withdrawal is $100',
        color: 'red',
      });
      return;
    }

    if (withdrawData?.amount > (user?.balance || 0)) {
      notifications.show({
        title: 'Error',
        message: 'User cannot withdraw more than balance',
        color: 'red',
      });
      return;
    }

    setLoading(true);

    try {
      const newBalance = user?.balance - withdrawData.amount;
      const updateData: Partial<UserData> = {
        total_withdraw: increment(parseInt(withdrawData.amount)),
        balance: newBalance,
      };

      const transactionRef = doc(
        db,
        'users',
        uid,
        'userRecords',
        withdrawData.id
      );
      await updateDoc(transactionRef, {
        status: 'completed',
        updatedAt: new Date(),
      });

      await updateUser(uid, updateData);

      notifications.show({
        title: 'Success',
        message: `withdraw request approved successfully`,
        color: 'green',
      });
      queryClient.invalidateQueries({ queryKey: ['user', uid] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['transactions', uid] });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update tier status',
        color: 'red',
      });
    } finally {
      setLoading(false);
      setConfirmApproveWithdraw(false);
    }
  };

  if (isLoading)
    return (
      <AdminLayout>
        <Text>Loading...</Text>
      </AdminLayout>
    );
  if (!user)
    return (
      <AdminLayout>
        <Text>User not found</Text>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <Stack gap="xl" className="min-h-screen bg-white">
        <Group justify="space-between">
          <Button
            leftSection={<IconArrowLeft size={18} />}
            variant="subtle"
            onClick={() => navigate(-1)}
          >
            Back to Users
          </Button>

          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <ActionIcon size="lg" variant="light" color="blue">
                <IconDotsVertical size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Admin Actions</Menu.Label>
              <Menu.Item
                leftSection={<IconCash size={14} />}
                onClick={() => setTopupModalOpen(true)}
              >
                Top Up Balance
              </Menu.Item>
              <Menu.Item
                leftSection={<IconMinimize size={14} />}
                onClick={() => setMinimumModalOpen(true)}
              >
                Set Min Copying
              </Menu.Item>
              <Menu.Item
                leftSection={<IconUser size={14} />}
                onClick={() => setUpgradeKycModalOpen(true)}
              >
                Upgrade Tier Level
              </Menu.Item>
              <Menu.Item
                leftSection={<IconBan size={14} />}
                color={user.isBlocked ? 'teal' : 'red'}
                onClick={() => setBlockModalOpen(true)}
              >
                {user.isBlocked ? 'Unblock User' : 'Block User'}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

        <ProfileCard user={user} />

        <BalanceCard user={user} />

        <KycVerificationCard kycArray={kyc} />

        <DepositHistory deposits={deposits} uid={uid} />

        <div>
          <Title order={3} mb="sm" size={'md'}>
            Transaction History
          </Title>
          <TransactionDataComp
            active={1}
            tradeHistoryItems={transactions || []}
            setConfirmApproveWithdraw={setConfirmApproveWithdraw}
            setWithdrawData={setWithdrawData}
          />
        </div>
      </Stack>

      <Modal
        opened={topupModalOpen}
        onClose={() => {
          setTopupModalOpen(false);
          setTopupAmount(0);
          setActionType('add'); // Reset to default
        }}
        title="Manage User Balance"
        size="sm"
        centered
      >
        <Stack>
          <Select
            label="Action Type"
            value={actionType}
            onChange={(val) => setActionType(val as 'add' | 'deduct')}
            data={[
              { value: 'add', label: 'Add to Balance' },
              { value: 'deduct', label: 'Deduct from Balance' },
            ]}
            leftSection={
              actionType === 'add' ? (
                <IconPlus size={16} />
              ) : (
                <IconMinus size={16} />
              )
            }
          />

          <NumberInput
            label="Amount"
            value={topupAmount}
            onChange={(val) => setTopupAmount(val || 0)}
            min={0}
            step={10}
            precision={2}
            leftSection={<IconCash size={16} />}
            description={
              actionType === 'deduct' && user ? (
                <Text
                  size="xs"
                  c={
                    topupAmount >
                    (topupType === 'main'
                      ? user.balance
                      : topupType === 'copy_trading'
                      ? user.copy_trading_profit
                      : topupType === 'total_withdraw'
                      ? user.total_withdraw || 0
                      : user.total_profit)
                      ? 'red'
                      : 'dimmed'
                  }
                >
                  Current{' '}
                  {topupType === 'main'
                    ? 'Main Balance'
                    : topupType === 'copy_trading'
                    ? 'Copy Trading Profit'
                    : topupType === 'total_withdraw'
                    ? 'Total Withdraw'
                    : 'Total Profit'}
                  : $
                  {topupType === 'main'
                    ? user.balance?.toLocaleString()
                    : topupType === 'copy_trading'
                    ? user.copy_trading_profit?.toLocaleString()
                    : topupType === 'total_withdraw'
                    ? (user.total_withdraw || 0)?.toLocaleString()
                    : user.total_profit?.toLocaleString()}
                </Text>
              ) : null
            }
          />

          <Select
            label="Balance Type"
            value={topupType}
            onChange={(val) =>
              setTopupType(
                val as
                  | 'main'
                  | 'copy_trading'
                  | 'total_withdraw'
                  | 'total_profit'
              )
            }
            data={[
              { value: 'main', label: 'Main Balance' },
              { value: 'copy_trading', label: 'Copy Trading Profit' },
              { value: 'total_withdraw', label: 'Total Withdraw' },
              { value: 'total_profit', label: 'Total Profit' },
            ]}
            leftSection={<IconWallet size={16} />}
          />

          <Divider my="sm" />

          <Group justify="space-between">
            <Button variant="default" onClick={() => setTopupModalOpen(false)}>
              Cancel
            </Button>
            <Button
              color={actionType === 'add' ? 'green' : 'orange'}
              onClick={handleBalanceUpdate}
              disabled={
                topupAmount <= 0 ||
                (actionType === 'deduct' &&
                  topupAmount >
                    (topupType === 'main'
                      ? user?.balance || 0
                      : topupType === 'copy_trading'
                      ? user?.copy_trading_profit || 0
                      : topupType === 'total_withdraw'
                      ? user?.total_withdraw || 0
                      : user?.total_profit || 0))
              }
              loaderProps={{ type: 'bars' }}
              loading={loading}
              leftSection={
                actionType === 'add' ? (
                  <IconPlus size={16} />
                ) : (
                  <IconMinus size={16} />
                )
              }
            >
              {actionType === 'add' ? 'Add Funds' : 'Deduct Funds'}
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={blockModalOpen}
        onClose={() => setBlockModalOpen(false)}
        title={user.isBlocked ? 'Unblock User' : 'Block User'}
        size="sm"
        centered
      >
        <Stack>
          <Text>
            Are you sure you want to {user.isBlocked ? 'unblock' : 'block'} this
            user?
          </Text>
          <Text size="sm" color="dimmed">
            {user.isBlocked
              ? 'User will regain access to their account'
              : 'User will lose access to their account'}
          </Text>

          <Divider my="sm" />

          <Group justify="space-between">
            <Button variant="default" onClick={() => setBlockModalOpen(false)}>
              Cancel
            </Button>
            <Button
              color={user.isBlocked ? 'teal' : 'red'}
              leftSection={
                user.isBlocked ? <IconCheck size={16} /> : <IconBan size={16} />
              }
              onClick={handleBlockUser}
              loaderProps={{ type: 'bars' }}
              loading={loading}
            >
              {user.isBlocked ? 'Unblock' : 'Block'}
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Modal
        opened={upgradeKycModalOpen}
        onClose={() => setUpgradeKycModalOpen(false)}
        title="Confirm Tier Upgrade"
        centered
        size="sm"
      >
        <Text mb="md">Are you sure you want to upgrade Tier level?</Text>

        <Group justify="flex-end">
          <Button
            variant="default"
            onClick={() => setUpgradeKycModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            color="blue"
            loaderProps={{ type: 'bars' }}
            loading={loading}
            onClick={handleUpgradeTier}
          >
            Confirm
          </Button>
        </Group>
      </Modal>
      <Modal
        opened={minimumModalOpen}
        onClose={() => setMinimumModalOpen(false)}
        title="Set Minimum Copy Trading"
        centered
        size="sm"
      >
        <Text mb="md">
          Set the minimum copy trading amount for this user. This will override
          the default minimum copy trading amount.
        </Text>
        <NumberInput
          label="Minimum Copy Trading Amount"
          value={user?.minimum_deposit}
          onChange={(val) => setMinimumDeposit(val || 0)}
          min={0}
          step={10}
          precision={2}
          leftSection={<IconCash size={16} />}
          description={
            <Text size="xs" color="dimmed">
              Current Minimum Copy Trade: $
              {user?.minimum_deposit?.toLocaleString() || 100}
            </Text>
          }
        />
        <Group justify="flex-end" mt="md">
          <Button
            variant="default"
            onClick={() => setMinimumModalOpen(false)}
            leftSection={<IconArrowLeft size={16} />}
          >
            Cancel
          </Button>
          <Button
            color="blue"
            onClick={handleSetMinimum}
            loaderProps={{ type: 'bars' }}
            loading={loading}
          >
            Save Changes
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={confirmApproveWithdraw}
        onClose={() => setConfirmApproveWithdraw(false)}
        title={'Are you sure you want to approve this withdrawal request'}
        size="sm"
        centered
      >
        <Stack>
          <Text>Are you sure you want to approve this withdrawal request</Text>
          <Text size="sm" color="dimmed">
            The requested amount will be added to their total withdrawal
          </Text>

          <Divider my="sm" />

          <Group justify="space-between">
            <Button
              variant="default"
              onClick={() => setConfirmApproveWithdraw(false)}
            >
              Cancel
            </Button>
            <Button
              color={'teal'}
              leftSection={<IconCheck size={16} />}
              onClick={handleApproveWithdrawalRequest}
              loaderProps={{ type: 'bars' }}
              loading={loading}
            >
              Approve
            </Button>
          </Group>
        </Stack>
      </Modal>
    </AdminLayout>
  );
}

export default UserDetails;
