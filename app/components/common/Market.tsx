import React from 'react';

const style: React.CSSProperties = {
  userSelect: 'none',
  boxSizing: 'border-box',
  display: 'block',
  height: '100%',
  width: '100%',
  pointerEvents: 'none',
};

const Market: React.FC = () => {
  return (
    <div className="relative my-10 p-2 text-sm bg-white rounded-md shadow-md border overflow-hidden">
      <div className="h-[65vh] w-full">
        <iframe
          src="https://www.tradingview-widget.com/embed-widget/market-overview/?locale=en#%7B%22colorTheme%22%3A%22dark%22%2C%22dateRange%22%3A%2212M%22%2C%22showChart%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22largeChartUrl%22%3A%22%22%2C%22isTransparent%22%3Atrue%2C%22showSymbolLogo%22%3Atrue%2C%22showFloatingTooltip%22%3Atrue%2C%22tabs%22%3A%5B%7B%22title%22%3A%22Crypto%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22BINANCE%3ABTCUSDT%22%7D%2C%7B%22s%22%3A%22BINANCE%3ASOLUSDT%22%7D%2C%7B%22s%22%3A%22BINANCE%3AETHUSDT%22%7D%2C%7B%22s%22%3A%22BINANCE%3AXRPUSDT%22%7D%2C%7B%22s%22%3A%22BINANCE%3AMATICUSDT%22%7D%2C%7B%22s%22%3A%22BINANCE%3AAVAXUSDT%22%7D%2C%7B%22s%22%3A%22BINANCE%3AFTMUSDT%22%7D%2C%7B%22s%22%3A%22BINANCE%3ADOGEUSDT%22%7D%2C%7B%22s%22%3A%22BINANCE%3ASHIBUSDT%22%7D%2C%7B%22s%22%3A%22BINANCE%3ATRXUSDT%22%7D%5D%2C%22originalTitle%22%3A%22Forex%22%7D%5D%2C%22utm_source%22%3A%22aitrading.grokprofit.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22market-overview%22%2C%22page-uri%22%3A%22aitrading.grokprofit.com%2F%22%7D"
          title="market overview TradingView widget"
          lang="en"
          style={style}
        ></iframe>
        <div className="bg-white size-10 absolute right-0 bottom-0 w-full"></div>
      </div>
    </div>
  );
};

export default Market;
