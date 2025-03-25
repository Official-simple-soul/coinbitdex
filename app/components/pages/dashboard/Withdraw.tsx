import { Button, Input, Modal, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import Frame from '~/components/common/Frame';
import DashboardLayout from '~/layouts/DashboardLayout';
import { useAuth } from '~/providers/AuthProvider';
import { useFunctions } from '~/providers/FunctionsProvider';

function Withdraw() {
  const { user } = useAuth();
  const { storeRecord } = useFunctions();
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      method: '',
      amount: '',
      walletAddress: '',
      password: '',
    },

    validate: {
      method: (value) => (value ? null : 'Please select a withdrawal method'),
      amount: (value) => {
        if (!value) return 'Please enter an amount';
        const amountNum = parseFloat(value);
        const userBalance = user?.balance || 0;

        if (isNaN(amountNum)) return 'Please enter a valid number';
        if (amountNum < 100) return 'Minimum withdrawal is 100 USD';
        if (amountNum > 500000) return 'Maximum withdrawal is 500,000 USD';
        if (amountNum > userBalance) return 'Insufficient balance.';
        return null;
      },
      walletAddress: (value) => (value ? null : 'Please enter wallet address'),
      password: (value) => {
        if (!value) {
          return 'Please enter your password';
        }
        if (value !== user?.password) {
          return 'Incorrect password. Please try again.';
        }
      },
    },
  });

  const handleSubmit = async (values: any) => {
    if (!user?.uid) {
      throw new Error('User ID is required to store the record');
    }

    setLoading(true);

    try {
      const depositRecord = await storeRecord(user.uid, {
        type: 'withdraw',
        amount: parseInt(values.amount),
        transactionType: 'out',
        description: 'Withdraw Request',
        transactionId: values.walletAddress,
      });

      console.log('depositRecord', depositRecord);
      open();
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: 'Failed to withdraw funds',
        color: 'red',
      });
    } finally {
      form.reset();
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Frame>
        <p className="pb-2 border-b font-semibold">
          Current Balance: {user?.balance} USD
        </p>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div className="pt-4">
            <p className="mb-2 text-sm">Withdraw Method</p>
            <Select
              placeholder="Withdraw Method"
              data={['Bitcoin', 'Ethereum', 'USDT (TRC20)', 'USDT (ERC20)']}
              {...form.getInputProps('method')}
            />
          </div>
          <div className="space-y-2 pt-5">
            <p className="text-sm">
              Withdrawal Amount{' '}
              <span className="text-red-500 font-bold">*</span>
            </p>
            <TextInput type="number" {...form.getInputProps('amount')} />
            <p className="text-gray-500 text-xs">
              Min Amount: 100.00 and Max Amount: 500,000
            </p>
          </div>
          <div className="pt-4">
            <p className="mb-2 text-sm">
              Wallet Address <span className="text-red-500 font-bold">*</span>
            </p>
            <TextInput {...form.getInputProps('walletAddress')} />
          </div>
          <div className="pt-4">
            <p className="mb-2 text-sm">
              Enter Your Password{' '}
              <span className="text-red-500 font-bold">*</span>
            </p>
            <TextInput type="password" {...form.getInputProps('password')} />
          </div>
          <Button
            type="submit"
            loaderProps={{ type: 'bars' }}
            loading={loading}
            w={'100%'}
            radius={'md'}
            mt={'40px'}
          >
            Withdraw Now
          </Button>
        </form>
      </Frame>
      <Modal opened={opened} onClose={close} centered title="Withdrawal Notice">
        <div className="space-y-4">
          <div className="flex flex-col items-center space-y-4 justify-center py-6">
            <p className="text-center">
              Withdrawal is currently being monitored.
            </p>
            <p className="text-center text-sm">
              Please contact support for the next steps.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button fullWidth color="red" onClick={close}>
              Close
            </Button>
            <Button fullWidth onClick={() => {}}>
              Contact Support
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default Withdraw;
