import { Button } from '@mantine/core';
import React, { useState } from 'react';
import Frame from '~/components/common/Frame';
import DashboardLayout from '~/layouts/DashboardLayout';
import { recordOptions, tradeHistoryItems } from './data';
import TransactionDataComp from '~/components/common/TransactionDataComp';

function Transactions() {
  const [active, setActive] = useState(1);

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <Frame>
          <p className="text-center border-b pb-2 font-bold">Records</p>
          <div className="grid grid-cols-4 gap-3">
            {recordOptions.map((record) => {
              return (
                <Button
                  key={record.id}
                  radius={'md'}
                  color={active === record.id ? 'dark' : 'blue'}
                  onClick={() => setActive(record.id)}
                >
                  {record.label}
                </Button>
              );
            })}
          </div>
        </Frame>
        <TransactionDataComp active={active} />
      </div>
    </DashboardLayout>
  );
}

export default Transactions;
