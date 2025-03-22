import { Button, CopyButton, FileInput, Input, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconFolders } from '@tabler/icons-react';
import { useState } from 'react';
import Frame from '~/components/common/Frame';
import DashboardLayout from '~/layouts/DashboardLayout';
import { useAuth } from '~/providers/AuthProvider';
import { methods } from './data';

function Deposit() {
  const { user } = useAuth();
  const [openMethods, setOpenMethods] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState({
    type: 'usdt-eth',
    icon: '/images/tether.png',
    qr: '/wallet/usdt-eth.jpeg',
    wallet_address: '0x562985F9a0aAd0Ffc3381Ad0b13dD8cF76444b9B',
  });

  const form = useForm({
    initialValues: {
      amount: '',
      paymentScreenshot: null,
    },
    validate: {
      amount: (value) => {
        const amount = parseFloat(value);
        if (isNaN(amount)) return 'Amount must be a number';
        if (amount < 1000) return 'Minimum amount is 1000 USD';
        if (amount > 10000000) return 'Maximum amount is 10,000,000 USD';
        return null;
      },
      paymentScreenshot: (value: { type: string }) => {
        if (!value) return 'Payment screenshot is required';
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!validTypes.includes(value.type)) return 'Invalid file type';
        return null;
      },
    },
  });

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
    // You can add your submission logic here
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <Frame>
          <div
            className={`flex items-center gap-4`}
            onClick={() => setOpenMethods(!openMethods)}
          >
            <img src="/images/tether.png" alt="" className="size-8" />
            <h1 className="font-bold uppercase">{paymentMethod.type}</h1>
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
                    <img src="/images/tether.png" alt="" className="size-8" />
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
              {user?.balance || '25.00'} USD
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
                Min: 1000.00 USD & Max: 10,000,000.00 USD
              </p>
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
                accept=".jpg,.jpeg,.png,.pdf"
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
            >
              Confirm Now
            </Button>
          </form>
        </Frame>
      </div>
    </DashboardLayout>
  );
}

export default Deposit;
