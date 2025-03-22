import React from 'react';
import { tradeHistoryItems } from '../pages/dashboard/data';

interface TransactionDataCompProps {
  active: number;
}

function TransactionDataComp({ active }: TransactionDataCompProps) {
  const filteredTransactions = tradeHistoryItems.filter((record) => {
    if (active === 1) return true;
    if (active === 2) return record.type === 'deposit';
    if (active === 3) return record.type === 'withdraw';
    if (active === 4) return record.type === 'commission';
    return false;
  });

  return (
    <div className="space-y-3">
      {filteredTransactions.map((record) => {
        const amountColor =
          record.transactionType === 'in' ? 'text-green-600' : 'text-red-600';
        const amountSign = record.transactionType === 'in' ? '+' : '-';

        return (
          <div
            key={record.id}
            className="px-5 py-3 bg-white shadow-md border rounded-xl space-y-3"
          >
            <div className="flex items-center space-x-3 justify-between">
              <div className="flex items-center space-x-3">
                <img src="/images/record.png" alt="" className="size-12" />
                <div className="">
                  <h1 className="font-bold text-lg text-gray-800">
                    {record.description}
                  </h1>
                  <p>
                    <span className="text-gray-500 text-xs">Trx: </span>
                    <span className="text-xs text-green-600">
                      {record.trxId}
                    </span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    {record.date} | {record.timeAgo}
                  </p>
                </div>
              </div>
              <p className={`text-right font-semibold ${amountColor}`}>
                {amountSign} {record.amount.toLocaleString()}$
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TransactionDataComp;
