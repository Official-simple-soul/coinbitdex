import { Button, Modal, Checkbox, NumberInput } from '@mantine/core';
import Frame from '~/components/common/Frame';
import DashboardLayout from '~/layouts/DashboardLayout';
import { useState } from 'react';
import { traders } from './data';
import { useAuth } from '~/providers/AuthProvider';
import { notifications } from '@mantine/notifications';
import SuccessModal from '~/components/common/SuccessModal';
import { useFunctions } from '~/providers/FunctionsProvider';

interface SELECTUSER {
  id: number;
  name: string;
  strategy: string;
  cumulativePnl: string;
  copiers: number;
  winRatio: string;
}
function CopyTrading() {
  const [opened, setOpened] = useState(false);
  const [selectedTrader, setSelectedTrader] = useState<SELECTUSER | null>(null);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [riskDisclaimerChecked, setRiskDisclaimerChecked] = useState(false);
  const [copyRatio, setCopyRatio] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUser } = useAuth();
  const { storeRecord } = useFunctions();
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleCopyClick = (trader: any) => {
    setSelectedTrader(trader);
    setOpened(true);
  };

  const handleCopySubmit = async () => {
    if (!agreementChecked || !riskDisclaimerChecked || copyRatio <= 0) {
      alert('Please agree to the terms and specify a valid copy ratio.');
      return;
    }

    if ((user?.balance ?? 0) < 500) {
      notifications.show({
        title: 'Insufficient balance',
        message: 'Balance must be up to $500',
        color: 'red',
      });
      return;
    }

    if ((user?.balance ?? 0) < copyRatio) {
      notifications.show({
        title: 'Insufficient balance',
        message: 'Balance must be higher that ' + copyRatio,
        color: 'red',
      });
      return;
    }

    if (!user?.uid || !user?.balance) {
      throw new Error('User ID is required to store the record');
    }

    setIsLoading(true);

    try {
      await storeRecord(user.uid, {
        type: 'copyTrade',
        amount: copyRatio,
        transactionType: 'out',
        description: 'Copied Trade',
        transactionId: selectedTrader?.name,
      });

      const newBalance = user.balance - copyRatio;

      await updateUser(user.uid, {
        balance: newBalance,
      });

      setOpened(false);
      setSuccessModalOpen(true);
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: 'Failed to withdraw funds',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
      setOpened(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <Frame>
          <div className="pb-2 border-b">
            <p className="font-semibold">Trending Traders</p>
            <p className="text-gray-500 mt-1 text-sm">
              Trending traders in the last 7 days
            </p>
          </div>
        </Frame>

        {traders.map((trader) => (
          <Frame key={trader.id}>
            <div className="space-y-5">
              <div className="top flex justify-between items-center">
                <div className="left">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${trader.name}`}
                      alt={trader.name}
                      className="size-16"
                    />
                    <div className="">
                      <h1 className="font-bold text-gray-800">{trader.name}</h1>
                      <p className="text-gray-500 text-sm">{trader.strategy}</p>
                    </div>
                  </div>
                </div>
                {/* Copy Button */}
                <Button
                  radius={'md'}
                  size="xs"
                  onClick={() => handleCopyClick(trader)}
                >
                  Copy
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="">
                  <p className="font-bold text-sm text-green-500">
                    {trader.cumulativePnl}
                  </p>
                  <p className="text-xs text-gray-500">Cummulative PnL</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-sm text-green-500">
                    {trader.copiers}
                  </p>
                  <p className="text-xs text-gray-500">Copiers</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-green-500">
                    {trader.winRatio}
                  </p>
                  <p className="text-xs text-gray-500">Win Ratio</p>
                </div>
              </div>
            </div>
          </Frame>
        ))}

        {/* Modal for Copying Trader */}
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title={`Copy ${selectedTrader?.name || 'Trader'}`}
          size="lg"
        >
          {selectedTrader && (
            <div className="space-y-4">
              {/* Trader Details */}
              <div className="flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${selectedTrader.name}`}
                  alt={selectedTrader.name}
                  className="size-16"
                />
                <div className="">
                  <h1 className="font-bold text-gray-800">
                    {selectedTrader.name}
                  </h1>
                  <p className="text-gray-500 text-sm">
                    {selectedTrader.strategy}
                  </p>
                </div>
              </div>

              {/* Copy-by-Position Ratio */}
              <div className="flex text-xs items-center justify-between">
                <p>Copy by Balance</p>${user?.balance?.toLocaleString()}
              </div>
              <NumberInput
                label=""
                placeholder="Enter percentage"
                min={500}
                max={1000000}
                value={copyRatio}
                onChange={(value) =>
                  setCopyRatio(typeof value === 'number' ? value : 0)
                }
                size="sm"
              />
              <p className="text-xs text-gray-500">
                Min: $500 and Max: $1,000,000
              </p>

              <div className="pt-7 space-y-4">
                {/* Copy Trading Agreement */}
                <Checkbox
                  label="I agree to the Copy Trading Customer Agreement"
                  checked={agreementChecked}
                  onChange={(e) => setAgreementChecked(e.currentTarget.checked)}
                  size="xs"
                />

                {/* Risk Disclaimer */}
                <Checkbox
                  label="I acknowledge the risks involved in copy trading"
                  checked={riskDisclaimerChecked}
                  onChange={(e) =>
                    setRiskDisclaimerChecked(e.currentTarget.checked)
                  }
                  size="xs"
                />
              </div>

              {/* Copy Button */}
              <Button
                fullWidth
                onClick={handleCopySubmit}
                disabled={
                  !agreementChecked || !riskDisclaimerChecked || copyRatio <= 0
                }
                loaderProps={{ type: 'bars' }}
                loading={isLoading}
              >
                Confirm Copy
              </Button>
            </div>
          )}
        </Modal>
        <SuccessModal
          open={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}

export default CopyTrading;
