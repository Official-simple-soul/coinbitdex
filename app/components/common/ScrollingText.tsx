import Marquee from 'react-fast-marquee';
import { useFetchMarketData } from '~/services/crypto.service';
import type { MarketData } from './types';

const ScrollingTextAnimation = () => {
  const { data: cryptoElement, isLoading } = useFetchMarketData();

  return (
    <div className="scrolling-text-container space-x-3 bg-white py-1.5 md:max-w-[80vw]">
      {isLoading ? (
        <div className="text-xs text-white text-center">...</div>
      ) : (
        <Marquee>
          {cryptoElement?.map((data: MarketData, index: number) => (
            <div className="text-[10px] mx-3 flex items-center" key={index}>
              <h1 className="mx-1 text-blue-800">{data?.name}</h1>
              <h1 className="mx-1">${data?.price}</h1>
              <h1 style={{ color: data?.change < 0 ? 'red' : 'green' }}>
                {data?.change}
              </h1>
            </div>
          ))}
        </Marquee>
      )}
    </div>
  );
};

export default ScrollingTextAnimation;
