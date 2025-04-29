import { convertFirestoreTimestampToDate } from '~/utils/helper';
import type { TransactionDataCompProps } from './types';
import { IconCheck, IconClock } from '@tabler/icons-react';
import { Button, Card, Text } from '@mantine/core';
import { useAuth } from '~/providers/AuthProvider';

function TransactionDataComp({
  active,
  tradeHistoryItems,
  setConfirmApproveWithdraw,
  setWithdrawData,
}: TransactionDataCompProps) {
  const filteredTransactions = tradeHistoryItems?.filter((record) => {
    if (active === 1) return true;
    if (active === 2) return record.type === 'deposit';
    if (active === 3) return record.type === 'withdraw';
    if (active === 4) return record.type === 'commission';
    return false;
  });

  const { user } = useAuth();

  if (tradeHistoryItems?.length < 1) {
    return <Text size="xs">No deposit from this user</Text>;
  }

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
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <div className="flex items-center space-x-3 w-full">
              <img src="/images/record.png" alt="" className="size-10" />
              <div className="w-full">
                <div className="flex justify-between items-center w-full">
                  <Text className="font-bold text-gray-800">
                    {record.description}
                  </Text>
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
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500 text-xs">Trx: </span>
                  <p className="text-xs text-green-600 w-40 overflow-hidden">
                    {record.transactionId}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-[10px]">
                    {convertFirestoreTimestampToDate(record.createdAt)}
                  </p>
                  <p
                    className={`text-right text-sm font-semibold ${amountColor}`}
                  >
                    {amountSign} {record.amount.toLocaleString()}$
                  </p>
                </div>
              </div>
            </div>
            {user?.role === 'admin' &&
              record.type === 'withdraw' &&
              record.status === 'pending' && (
                <div className="flex justify-end mt-3">
                  <Button
                    size="xs"
                    onClick={() => {
                      setConfirmApproveWithdraw(true), setWithdrawData(record);
                    }}
                  >
                    Approve Withdrawal
                  </Button>
                </div>
              )}
          </Card>
        );
      })}
    </div>
  );
}

export default TransactionDataComp;
