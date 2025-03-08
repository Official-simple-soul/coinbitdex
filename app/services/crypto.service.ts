import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCryptocurrencyData } from './axios';
import type { lastPage } from './types';

export const useCryptocurrencyData = () => {
  return useInfiniteQuery({
    queryKey: ['cryptocurrencyData'],
    queryFn: ({ pageParam = 1 }) => fetchCryptocurrencyData({ pageParam }),
    getNextPageParam: (lastPage: lastPage) => lastPage.data,
    initialPageParam: 1,
  });
};
