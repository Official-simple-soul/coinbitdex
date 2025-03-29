import {
  Card,
  Title,
  Badge,
  Modal,
  Image,
  Text,
  Group,
  Stack,
  Paper,
  Divider,
  Button,
  LoadingOverlay,
} from '@mantine/core';
import { useState } from 'react';
import {
  IconCoin,
  IconReceipt,
  IconCalendar,
  IconPhoto,
  IconCheck,
} from '@tabler/icons-react';
import { convertFirestoreTimestampToDate } from '~/utils/helper';
import { updateDoc, doc, collection, increment } from 'firebase/firestore';
import { db } from '~/config/firebase';
import { notifications } from '@mantine/notifications';
import { useAuth } from '~/providers/AuthProvider';
import { useFunctions } from '~/providers/FunctionsProvider';
import { useQueryClient } from '@tanstack/react-query';

const DepositHistory = ({ deposits, uid }) => {
  const queryClient = useQueryClient();
  const [opened, setOpened] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  interface Deposit {
    id: string;
    amount: number;
    transactionId: string;
    status: string;
    createdAt: { seconds: number; nanoseconds: number };
    paymentScreenshot?: string;
  }

  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateUser } = useAuth();
  const { storeRecord } = useFunctions();

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpened(true);
  };

  const handleApproveClick = (deposit: any) => {
    setSelectedDeposit(deposit);
    setApproveModalOpen(true);
  };

  const approveDeposit = async () => {
    if (!selectedDeposit || !uid) return;

    setLoading(true);
    try {
      // Update deposit status
      const depositRef = doc(
        db,
        'users',
        uid,
        'userDeposits',
        selectedDeposit.id
      );
      await updateDoc(depositRef, {
        status: 'completed',
        updatedAt: new Date(),
      });

      await updateUser(uid, {
        balance: increment(selectedDeposit.amount),
        total_deposit: increment(selectedDeposit.amount),
        updatedAt: new Date(),
      });

      await storeRecord(uid, {
        type: 'deposit',
        amount: selectedDeposit.amount,
        transactionType: 'in',
        status: 'completed',
        description: 'Deposit Request',
        transactionId: selectedDeposit.transactionId,
      });

      queryClient.invalidateQueries({ queryKey: ['user', uid] });
      queryClient.invalidateQueries({ queryKey: ['deposits', uid] });
      queryClient.invalidateQueries({ queryKey: ['transactions', uid] });
      queryClient.invalidateQueries({ queryKey: ['users'] });

      notifications.show({
        title: 'Success',
        message: 'Deposit approved and balance updated',
        color: 'green',
      });
    } catch (error) {
      console.error('Error approving deposit:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to approve deposit',
        color: 'red',
      });
    } finally {
      setLoading(false);
      setApproveModalOpen(false);
      setSelectedDeposit(null);
    }
  };

  console.log(deposits);

  return (
    <>
      <div>
        <Title order={3} size={'md'} mb="md">
          Deposit History
        </Title>

        {deposits?.length < 1 && (
          <Text size="xs">No deposit from this user</Text>
        )}

        <Stack gap={4} pos="relative">
          <LoadingOverlay visible={loading} overlayBlur={2} />

          {deposits?.map((deposit) => (
            <Paper key={deposit.id} withBorder p="md" radius="sm" shadow="xs">
              <Group justify="space-between" mb="xs">
                <Group gap={4}>
                  <IconCoin size={18} />
                  <Text fw={600}>${deposit.amount.toLocaleString()}</Text>
                </Group>
                <Group gap="xs">
                  <Badge
                    variant="light"
                    color={
                      deposit.status === 'completed'
                        ? 'green'
                        : deposit.status === 'pending'
                        ? 'yellow'
                        : 'red'
                    }
                    size="sm"
                  >
                    {deposit.status}
                  </Badge>
                </Group>
              </Group>

              <Divider my="xs" />

              <Group gap={4}>
                <Group gap={4}>
                  <IconReceipt size={16} color="gray" />
                  <Text size="sm" color="dimmed">
                    {deposit.transactionId.slice(0, 8)}...
                  </Text>
                </Group>

                <Group gap={4}>
                  <IconCalendar size={16} color="gray" />
                  <Text size="sm" color="dimmed">
                    {convertFirestoreTimestampToDate(deposit.createdAt)}
                  </Text>
                </Group>
              </Group>

              <div className="flex justify-between items-center mt-4">
                {deposit.paymentScreenshot && (
                  <div className="flex gap-4 items-center">
                    <IconPhoto size={16} color="gray" />
                    <Text
                      size="sm"
                      color="blue"
                      style={{ cursor: 'pointer' }}
                      onClick={() => openImageModal(deposit.paymentScreenshot)}
                    >
                      View payment proof
                    </Text>
                  </div>
                )}
                {deposit.status === 'pending' && (
                  <Button
                    variant="light"
                    size="xs"
                    color="green"
                    leftSection={<IconCheck size={14} />}
                    onClick={() => handleApproveClick(deposit)}
                  >
                    Approve
                  </Button>
                )}
              </div>
            </Paper>
          ))}
        </Stack>
      </div>

      {/* Payment Proof Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Payment Proof"
        size="lg"
        centered
      >
        {selectedImage && (
          <Image src={selectedImage} alt="Payment screenshot" fit="contain" />
        )}
        <Group justify="flex-end" mt="md">
          <Text size="sm" color="dimmed">
            Transaction ID:{' '}
            {
              deposits?.find((d) => d.paymentScreenshot === selectedImage)
                ?.transactionId
            }
          </Text>
        </Group>
      </Modal>

      {/* Approval Confirmation Modal */}
      <Modal
        opened={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        title="Confirm Deposit Approval"
        centered
      >
        <Stack>
          <Text>
            Are you sure you want to approve this deposit of $
            {selectedDeposit?.amount.toLocaleString()}?
          </Text>
          <Text size="sm" color="dimmed">
            This will:
          </Text>
          <ul>
            <li>Mark the deposit as completed</li>
            <li>
              Add ${selectedDeposit?.amount.toLocaleString()} to user's main
              balance
            </li>
            <li>Create a completed transaction record</li>
          </ul>

          <Group justify="flex-end" mt="md">
            <Button
              variant="default"
              onClick={() => setApproveModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              color="green"
              onClick={approveDeposit}
              loading={loading}
              leftSection={<IconCheck size={16} />}
            >
              Confirm Approval
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default DepositHistory;
