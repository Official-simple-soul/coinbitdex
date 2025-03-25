import {
  Button,
  Modal,
  Checkbox,
  NumberInput,
  Progress,
  TextInput,
} from '@mantine/core';
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
  riskScore: number;
  copyCode: string;
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
  // const [traderCopyCode, setTraderCopyCode] = useState('');

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

    // if (traderCopyCode !== selectedTrader?.copyCode) {
    //   notifications.show({
    //     title: 'Error',
    //     message: 'Invalid copy code',
    //     color: 'red',
    //   });
    //   return;
    // }

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
              Trending 10 traders in the last 30 days
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
                placeholder="Enter amount"
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
              {/* <TextInput
                placeholder="Trader copying code"
                onChange={(e) => setTraderCopyCode(e.target.value)}
              /> */}
              <div className="pt-7 space-y-4">
                <Checkbox
                  label="I agree to the Copy Trading Customer Agreement"
                  checked={agreementChecked}
                  onChange={(e) => setAgreementChecked(e.currentTarget.checked)}
                  size="xs"
                />
                <Checkbox
                  label="I acknowledge the risks involved in copy trading"
                  checked={riskDisclaimerChecked}
                  onChange={(e) =>
                    setRiskDisclaimerChecked(e.currentTarget.checked)
                  }
                  size="xs"
                />
              </div>
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
              <div className="mt-6 bg-blue-50 p-3 rounded text-xs space-y-2">
                <h4 className="font-semibold text-blue-800">
                  Copy Trading Tips
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-blue-700">
                  <li>Diversify by copying multiple traders</li>
                  <li>Monitor performance weekly</li>
                  <li>Contact support for more tip on trade copying</li>
                </ul>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>Risk Level</span>
                  <span>Moderate</span>
                </div>
                <Progress
                  value={selectedTrader.riskScore || 65}
                  color={
                    selectedTrader.riskScore > 80
                      ? 'red'
                      : selectedTrader.riskScore > 50
                      ? 'yellow'
                      : 'green'
                  }
                />
              </div>
              <div className="mt-6 space-y-4">
                {/* Performance Metrics */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-sm mb-2">
                    Trader Statistics
                  </h3>
                  {/* ... metrics grid from suggestion 1 ... */}
                </div>

                {/* Risk Assessment */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Risk Assessment</span>
                    <span className="font-medium">{'Medium Risk'}</span>
                  </div>
                  {/* ... progress bar from suggestion 2 ... */}
                </div>

                {/* Educational Tips */}
                <div className="bg-yellow-50 p-3 rounded border border-yellow-100">
                  <h4 className="font-semibold text-sm mb-1">
                    ⚠️ Important Notice
                  </h4>
                  <p className="text-xs text-yellow-800">
                    Past performance doesn't guarantee future results. Consider
                    diversifying your copy trading portfolio.
                  </p>
                </div>
              </div>
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
