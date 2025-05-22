import type { summary, SUMMARYDATA } from './types';

function SummaryDataComp({ summaryData }: SUMMARYDATA) {
  return (
    <div className="summary mt-5">
      <div className="grid grid-cols-2 gap-3 text-gray-700">
        {summaryData.map((summaryItem: summary) => (
          <div
            key={summaryItem?.id}
            className={`rounded-xl px-4 py-2 bg-white shadow border`}
          >
            <div
              className={`flex ${
                summaryItem?.id % 2 === 0 ? 'flex-row-reverse' : ''
              } justify-between items-center`}
            >
              <img
                src={summaryItem?.icon}
                alt=""
                className="size-6 opacity-80"
              />
              <div
                className={`${
                  summaryItem?.id % 2 === 0 ? 'text-left' : 'text-right'
                }`}
              >
                <p className="font-bold text-xs">{summaryItem?.title}</p>
                <p
                  className={`font-bold text-sm ${
                    summaryItem?.slug === 'withdraw'
                      ? 'text-red-500'
                      : summaryItem.slug === 'deposit'
                      ? 'text-green-500'
                      : ''
                  }`}
                >
                  $ {summaryItem?.amount?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SummaryDataComp;
