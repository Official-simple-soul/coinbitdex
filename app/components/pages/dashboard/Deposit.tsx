import { Button, CopyButton, FileInput, Input, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconFolders, IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import Frame from '~/components/common/Frame';
import DashboardLayout from '~/layouts/DashboardLayout';
import { useAuth } from '~/providers/AuthProvider';
import { methods } from './data';
import SuccessDeposit from '~/components/common/modals/SuccessDeposit';
import { useFunctions } from '~/providers/FunctionsProvider';
import { notifications } from '@mantine/notifications';
import { convertToBase64 } from '~/utils/helper';

function Deposit() {
  const { user } = useAuth();
  const { storeDeposit, storeRecord, sendMail } = useFunctions();
  const [openMethods, setOpenMethods] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successDeposit, setSuccessDeposit] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState({
    type: 'btc',
    icon: '/images/bitcoin.png',
    qr: '/wallet/btc.jpeg',
    wallet_address: 'bc1qgknfvf0tm6kkurcgs3v9tjashqkvy493ns7eva',
  });

  const form = useForm({
    initialValues: {
      amount: '',
      paymentScreenshot: null,
      transactionId: '',
    },
    validate: {
      amount: (value) => {
        const amount = parseFloat(value);
        if (isNaN(amount)) return 'Amount must be a number';
        if (amount < (user?.minimum_deposit || 100))
          return `Minimum amount is ${user?.minimum_deposit || 100} USD`;
        if (amount > 1000000000) return 'Maximum amount is 1,000,000,000 USD';
        return null;
      },
      paymentScreenshot: (value: { type: string }) => {
        if (!value) return 'Payment screenshot is required';
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!validTypes.includes(value.type)) return 'Invalid file type';
        return null;
      },
      transactionId: (value) => {
        if (!value) return 'Transaction ID is required';
        return null;
      },
    },
  });

  const handleSubmit = async (values: any) => {
    if (values?.paymentScreenshot?.size > 500000) {
      notifications.show({
        title: 'Error',
        message:
          'Your SSN card file size exceeds the limit (500kb). Please try again.',
        color: 'red',
      });
      return;
    }

    setLoading(true);
    try {
      const paymentScreenshotFile = values.paymentScreenshot;
      const paymentScreenshotUrl = await convertToBase64(paymentScreenshotFile);

      if (!user?.uid) {
        throw new Error('User ID is required to store the record');
      }

      await storeDeposit(user?.uid, {
        amount: parseInt(values.amount),
        type: 'deposit',
        status: 'pending',
        transactionId: values.transactionId,
        paymentScreenshot: paymentScreenshotUrl as string,
      });

      await storeRecord(user.uid, {
        type: 'deposit',
        amount: parseInt(values.amount),
        transactionType: 'in',
        status: 'pending',
        description: 'Deposit Request',
        transactionId: values.transactionId,
      });

      await sendMail({
        email: user?.email,
        message: `New Deposit Request with transaction id: ${values.transactionId}`,
      });

      setSuccessDeposit(true);
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: 'Failed to deposit funds',
        color: 'red',
      });
    } finally {
      form.reset();
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <Frame>
          <div
            className="flex items-center justify-between"
            onClick={() => setOpenMethods(!openMethods)}
          >
            <div className={`flex items-center gap-4`}>
              <img src={paymentMethod.icon} alt="" className="size-8" />
              <h1 className="font-bold uppercase">{paymentMethod.type}</h1>
            </div>
            <IconChevronDown size={'25px'} />
          </div>
        </Frame>
        <div
          className={`${
            openMethods ? 'h-64' : 'h-0 overflow-hidden'
          } transition-all ease-in-out`}
        >
          <Frame>
            <div className="space-y-4">
              {methods.map((method, id) => {
                return (
                  <div
                    key={id}
                    className={`flex items-center gap-4`}
                    onClick={() => {
                      setPaymentMethod(method);
                      setOpenMethods(false);
                    }}
                  >
                    <img src={method.icon} alt="" className="size-8" />
                    <h1 className="font-bold uppercase">{method.type}</h1>
                  </div>
                );
              })}
            </div>
          </Frame>
        </div>
        <Frame>
          <h1 className="font-bold mb-7">
            Balance:{' '}
            <span className="text-yellow-700">
              {user?.balance?.toLocaleString()} USD
            </span>
          </h1>
          <div className="flex flex-col items-center space-y-4 pb-3">
            <div className="text-center text-sm">
              <h1 className="font-bold text-yellow-700 uppercase">
                DEPOSIT TO YOUR WALLET
              </h1>
              <h1 className="font-bold text-yellow-700 uppercase">
                {paymentMethod.type}
              </h1>
            </div>
            <img src={paymentMethod.qr} alt="" className="size-60" />
            <div className="flex items-center w-full">
              <div className="w-full border rounded-l h-8 bg-gray-100 flex items-center justify-center pl-2 overflow-hidden">
                <p className="text-gray-700 text-xs">
                  {paymentMethod.wallet_address}
                </p>
              </div>
              <div className="w-">
                <CopyButton value={paymentMethod.wallet_address}>
                  {({ copied, copy }) => (
                    <div className="size-8 bg-blue-500 flex items-center justify-center rounded-r">
                      <IconFolders color="white" onClick={copy} size={16} />
                    </div>
                  )}
                </CopyButton>
              </div>
            </div>
          </div>
          <p className="text-xs text-center text-gray-600">
            Fill the below information after making your payment
          </p>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <div className="">
              <p className="mb-1 text-sm">Amount:</p>
              <Input
                {...form.getInputProps('amount')}
                rightSection={
                  <div className="border-l-2 h-full w-full flex items-center justify-center">
                    <p>USD</p>
                  </div>
                }
                rightSectionWidth={'70px'}
                type="number"
              />
              {form.errors.amount && (
                <Text color="red" size="sm">
                  {form.errors.amount}
                </Text>
              )}
              <p className="text-center text-gray-500 text-xs mt-1">
                Min: {user?.minimum_deposit || 100}.00 USD & Max:
                1,000,000,000.00 USD
              </p>
            </div>
            <div className="pt-4">
              <p className="mb-1 text-sm">Transaction ID/Reference:</p>
              <Input {...form.getInputProps('transactionId')} type="text" />
            </div>
            <div className="pt-5">
              <p className="mb-1 text-sm">Payment Screenshot:</p>
              <FileInput
                {...form.getInputProps('paymentScreenshot')}
                leftSection={
                  <div className="w-full h-full flex items-center justify-center border-r-2">
                    <p>Choose File</p>
                  </div>
                }
                leftSectionWidth={'120px'}
                accept=".jpg,.jpeg,.png"
              />
              {form.errors.paymentScreenshot && (
                <Text color="red" size="sm">
                  {form.errors.paymentScreenshot}
                </Text>
              )}
            </div>
            <Button
              type="submit"
              w={'100%'}
              h={'45px'}
              radius={'md'}
              mt={'40px'}
              loading={loading}
              loaderProps={{ type: 'bars' }}
            >
              Confirm Now
            </Button>
          </form>
        </Frame>
      </div>
      <SuccessDeposit
        open={successDeposit}
        onClose={() => setSuccessDeposit(false)}
      />
    </DashboardLayout>
  );
}

export default Deposit;
