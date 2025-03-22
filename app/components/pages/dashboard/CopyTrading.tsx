import { Button, Modal, Checkbox, NumberInput } from '@mantine/core';
import Frame from '~/components/common/Frame';
import DashboardLayout from '~/layouts/DashboardLayout';
import { useState } from 'react';
import { traders } from './data';

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

  const handleCopyClick = (trader: any) => {
    setSelectedTrader(trader);
    setOpened(true);
  };

  const handleCopySubmit = () => {
    if (!agreementChecked || !riskDisclaimerChecked || copyRatio <= 0) {
      alert('Please agree to the terms and specify a valid copy ratio.');
      return;
    }

    console.log('Copying trader:', selectedTrader?.name);
    console.log('Copy ratio:', copyRatio);
    setOpened(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <Frame>
          <div className="pb-2 border-b">
            <p className="font-semibold text-lg">Trending Traders</p>
            <p className="text-gray-500 mt-1">
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
                      <h1 className="font-bold text-lg text-gray-800">
                        {trader.name}
                      </h1>
                      <p className="text-gray-500">{trader.strategy}</p>
                    </div>
                  </div>
                </div>
                {/* Copy Button */}
                <Button radius={'lg'} onClick={() => handleCopyClick(trader)}>
                  Copy
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-lg font-bold">{trader.cumulativePnl}</p>
                  <p className="text text-gray-500">Cummulative PnL</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{trader.copiers}</p>
                  <p className="text text-gray-500">Copiers</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{trader.winRatio}</p>
                  <p className="text text-gray-500">Win Ratio</p>
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
                  <h1 className="font-bold text-lg text-gray-800">
                    {selectedTrader.name}
                  </h1>
                  <p className="text-gray-500">{selectedTrader.strategy}</p>
                </div>
              </div>

              {/* Copy-by-Position Ratio */}
              <NumberInput
                label="Copy-by-Position Ratio (%)"
                placeholder="Enter percentage"
                min={0}
                max={100}
                value={copyRatio}
                onChange={(value) =>
                  setCopyRatio(typeof value === 'number' ? value : 0)
                }
                size="lg"
              />

              {/* Copy Trading Agreement */}
              <Checkbox
                label="I agree to the Copy Trading Customer Agreement"
                checked={agreementChecked}
                onChange={(e) => setAgreementChecked(e.currentTarget.checked)}
              />

              {/* Risk Disclaimer */}
              <Checkbox
                label="I acknowledge the risks involved in copy trading"
                checked={riskDisclaimerChecked}
                onChange={(e) =>
                  setRiskDisclaimerChecked(e.currentTarget.checked)
                }
              />

              {/* Copy Button */}
              <Button
                fullWidth
                size="lg"
                onClick={handleCopySubmit}
                disabled={
                  !agreementChecked || !riskDisclaimerChecked || copyRatio <= 0
                }
              >
                Confirm Copy
              </Button>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default CopyTrading;
