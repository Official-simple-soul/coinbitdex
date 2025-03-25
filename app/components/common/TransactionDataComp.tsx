import { convertFirestoreTimestampToDate } from '~/utils/helper';
import type { TransactionDataCompProps } from './types';

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
          record.transactionType === 'in' ? 'text-green-600' : 'text-red-600';
        const amountSign = record.transactionType === 'in' ? '+' : '-';

        return (
          <div
            key={record.id}
            className="px-5 py-3 bg-white shadow-md border rounded-xl space-y-3"
          >
            <div className="flex items-center space-x-3 justify-between">
              <div className="flex items-center space-x-3">
                <img src="/images/record.png" alt="" className="size-10" />
                <div className="">
                  <h1 className="font-bold text-gray-800">
                    {record.description}
                  </h1>
                  <p>
                    <span className="text-gray-500 text-xs">Trx: </span>
                    <span className="text-xs text-green-600">
                      {record.transactionId}
                    </span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    {convertFirestoreTimestampToDate(record.createdAt)}
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
