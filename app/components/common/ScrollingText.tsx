import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useCryptocurrencyData } from '~/services/crypto.service';
import type { CryptoData } from './types';

const ScrollingTextAnimation = () => {
  const { data, isLoading } = useCryptocurrencyData();

  const cryptoElement: CryptoData[] | undefined = data?.pages.flatMap(
    (page) => page?.data?.[0]?.screen_data?.crypto_data
  );

  return (
    <div className="scrolling-text-container space-x-3 bg-white py-2">
      {isLoading ? (
        <div className="text-xs text-white text-center">...</div>
      ) : (
        <Marquee>
          {cryptoElement?.map((data, index) => (
            <div className="text-[10px] mx-3 flex items-center" key={index}>
              <img src={data?.logo_url} alt={data?.name} className="w-3 h-3" />
              <h1 className="mx-1 text-blue-800">{data?.name}</h1>
              <h1 className="text-gray-600">[{data?.currency_symbol}]</h1>
              <h1 className="mx-1">${data?.inst_price_usd}</h1>
              <h1 style={{ color: data?.change_percent_7d_color }}>
                {data?.change_percent_1d}
              </h1>
            </div>
          ))}
        </Marquee>
      )}
    </div>
  );
};

export default ScrollingTextAnimation;
