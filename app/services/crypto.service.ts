import { useQuery } from '@tanstack/react-query';
import { fetchMarketData } from './axios';

export const useFetchMarketData = () => {
  return useQuery({
    queryKey: ['marketData'],
    queryFn: fetchMarketData,
  });
};
