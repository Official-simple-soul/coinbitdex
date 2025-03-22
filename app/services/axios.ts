import axios from 'axios';
import type { MarketDataItem } from './types';
import { crypto_list } from './data';

// export const fetchMarketData = async (): Promise<MarketDataItem[] | null> => {
//   try {
//     const response = await axios.get(
//       `https://api.coingecko.com/api/v3/simple/price?ids=${crypto_list.join(
//         ','
//       )}&vs_currencies=usd&include_24hr_change=true`
//     );

//     const result: { [key: string]: { usd: number; usd_24h_change: number } } =
//       response.data;

//     const array: MarketDataItem[] = Object.keys(result).map((key: string) => {
//       return {
//         symbol: key,
//         price: result[key].usd,
//         change: result[key].usd_24h_change,
//       };
//     });

//     return array;
//   } catch (err: any) {
//     console.error('Unexpected error:', err);
//     return null;
//   }
// };

export async function fetchMarketData() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
    );
    const data = await response.json();
    const tether_image = data.find((e: any) => e.symbol === 'usdt').image;

    const array = data
      ?.filter((e: any) => e.name !== 'Tether')
      ?.map((e: any) => {
        return {
          name: e.name,
          symbol: e.symbol,
          price: e.current_price,
          change: e.price_change_percentage_24h,
          image: e.image,
          tether_image,
        };
      });
    console.log({ array });
    return array;
  } catch (error) {
    console.error(error);
  }
}
