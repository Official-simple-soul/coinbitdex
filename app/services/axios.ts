import axios from 'axios';
import type { MarketDataItem } from './types';
import { crypto_list } from './data';

export const fetchMarketData = async (): Promise<MarketDataItem[] | null> => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${crypto_list.join(
        ','
      )}&vs_currencies=usd&include_24hr_change=true`
    );

    const result: { [key: string]: { usd: number; usd_24h_change: number } } =
      response.data;

    const array: MarketDataItem[] = Object.keys(result).map((key: string) => {
      return {
        symbol: key,
        price: result[key].usd,
        change: result[key].usd_24h_change,
      };
    });

    return array;
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return null;
  }
};
