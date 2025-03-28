import { convertFirestoreTimestampToDate } from '~/utils/helper';
import type { TransactionDataCompProps } from './types';
import { IconCheck, IconClock } from '@tabler/icons-react';
import { Card, Text } from '@mantine/core';

function TransactionDataComp({
  active,
  tradeHistoryItems,
}: TransactionDataCompProps) {
  const filteredTransactions = tradeHistoryItems?.filter((record) => {
    if (active === 1) return true;
    if (active === 2) return record.type === 'deposit';
    if (active === 3) return record.type === 'withdraw';
    if (active === 4) return record.type === 'commission';
    return false;
  });

  return (
    <div className="space-y-3">
      {filteredTransactions?.map((record) => {
        const amountColor =
          record.type !== 'copyTrade'
            ? record.transactionType === 'in'
              ? 'text-green-600'
              : 'text-red-600'
            : 'text-gray-600';
        const amountSign =
          record.type !== 'copyTrade'
            ? record.transactionType === 'in'
              ? '+'
              : '-'
            : '';

        return (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div className="flex items-center space-x-3 justify-between">
              <div className="flex items-center space-x-3">
                <img src="/images/record.png" alt="" className="size-10" />
                <div className="">
                  <Text className="font-bold text-gray-800">
                    {record.description}
                  </Text>
                  <p>
                    <span className="text-gray-500 text-xs">Trx: </span>
                    <p className="text-xs text-green-600 max-w-64 line-clamp-1">
                      {record.transactionId}
                    </p>
                  </p>
                  <p className="text-gray-500 text-xs">
                    {convertFirestoreTimestampToDate(record.createdAt)}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {record.status === 'completed' && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                    <IconCheck size={12} /> Completed
                  </span>
                )}
                {record.status === 'pending' && (
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full flex items-center gap-1">
                    <IconClock size={12} /> Pending
                  </span>
                )}
                <p className={`text-right font-semibold ${amountColor}`}>
                  {amountSign} {record.amount.toLocaleString()}$
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default TransactionDataComp;
