import { Button, Input, Select, TextInput } from '@mantine/core';
import Frame from '~/components/common/Frame';
import DashboardLayout from '~/layouts/DashboardLayout';
import { useAuth } from '~/providers/AuthProvider';

function Withdraw() {
  const { user } = useAuth();
  return (
    <DashboardLayout>
      <Frame>
        <p className="pb-2 border-b font-semibold">
          Current Balance: {user?.balance || '25.00'} USD
        </p>
        <div className="pt-4">
          <p className="mb-2">Withdraw Charge</p>
          <Select
            placeholder="Withdraw Method"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            size="lg"
          />
        </div>
        <div className="space-y-2 pt-5">
          <p>
            Withdrawal Amount <span className="text-red-500 font-bold">*</span>
          </p>
          <TextInput size="lg" />
          <p className="text-gray-500">
            Min Amount: 100.00 and Max Amount: 500,000
          </p>
        </div>
        <div className="pt-4">
          <p className="mb-2">Withdraw Charge</p>
          <Input
            rightSection={
              <div className="border-l-2 h-full w-full flex items-center justify-center">
                <p>USD</p>
              </div>
            }
            rightSectionWidth={'70px'}
            size="lg"
            disabled
            readOnly
            value={'0.00'}
          />
        </div>
        <div className="pt-4">
          <p className="mb-2">
            The Amount You Receive{' '}
            <span className="text-red-500 font-bold">*</span>
          </p>
          <Input
            rightSection={
              <div className="border-l-2 h-full w-full flex items-center justify-center">
                <p>USD</p>
              </div>
            }
            rightSectionWidth={'70px'}
            size="lg"
            disabled
            readOnly
            value={'0.00'}
          />
        </div>
        <div className="pt-4">
          <p className="mb-2">
            Enter Your Password{' '}
            <span className="text-red-500 font-bold">*</span>
          </p>
          <TextInput size="lg" />
        </div>
        <Button w={'100%'} h={'45px'} radius={'md'} mt={'40px'}>
          Withdraw Now
        </Button>
      </Frame>
    </DashboardLayout>
  );
}

export default Withdraw;
