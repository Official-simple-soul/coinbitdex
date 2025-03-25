import { Button, Loader } from '@mantine/core';
import { useState } from 'react';
import Frame from '~/components/common/Frame';
import DashboardLayout from '~/layouts/DashboardLayout';
import { recordOptions } from './data';
import TransactionDataComp from '~/components/common/TransactionDataComp';
import { useListRecords } from '~/services/record.service';
import { useAuth } from '~/providers/AuthProvider';

function Transactions() {
  const [active, setActive] = useState(1);
  const { user } = useAuth();
  const { data: transactions, isLoading } = useListRecords(user?.uid || '');

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <Frame>
          <p className="text-center border-b pb-2 font-bold">Records</p>
          <div className="grid grid-cols-3 gap-3">
            {recordOptions.map((record) => {
              return (
                <Button
                  key={record.id}
                  radius={'md'}
                  size="xs"
                  color={active === record.id ? 'dark' : 'blue'}
                  onClick={() => setActive(record.id)}
                >
                  {record.label}
                </Button>
              );
            })}
          </div>
        </Frame>
        {isLoading ? (
          <div className="h-[70vh] w-full flex justify-center items-center">
            <Loader size={50} />
          </div>
        ) : transactions.length < 1 ? (
          <div className="h-[70vh] w-full flex justify-center items-center">
            <p className="text-center text-gray-500">No transactions found.</p>
          </div>
        ) : (
          <TransactionDataComp
            active={active}
            tradeHistoryItems={transactions}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

export default Transactions;
