import { useQuery } from '@tanstack/react-query';
import { listRecords } from './axios';

export const useListRecords = (uid: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['userRecords', uid],
    queryFn: () => listRecords(uid),
    enabled: !!uid,
  });

  return { data: data || [], isLoading, error };
};
