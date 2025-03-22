import { useQuery } from '@tanstack/react-query';
import { fetchMarketData } from './axios';

// export const useFetchMarketData = () => {
//   return useQuery({
//     queryKey: ['marketData'],
//     queryFn: fetchMarketData,
//     // refetchInterval: 10000,
//     // staleTime: 0,
//   });
// };

export const useFetchMarketData = () => {
  return useQuery({
    queryKey: ['marketData'],
    queryFn: fetchMarketData,
    // refetchInterval: 10000,
    // staleTime: 0,
  });
};
