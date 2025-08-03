import { useQuery } from '@tanstack/react-query';
import {
  fetchDeposits,
  fetchKYC,
  fetchTransactions,
  fetchUser,
  fetchUsers,
} from './axios';

// export function useListUsers() {
//   return useQuery({
//     queryKey: ['users'],
//     queryFn: fetchUsers,
//   });
// }

export function useListUsers(email?: string) {
  return useQuery({
    queryKey: ['users', email],
    queryFn: () => fetchUsers(email),
  });
}

export function useUser(uid: string) {
  return useQuery({
    queryKey: ['user', uid],
    queryFn: () => fetchUser(uid),
    enabled: !!uid,
  });
}

export function useKYC(uid: string) {
  return useQuery({
    queryKey: ['kyc', uid],
    queryFn: () => fetchKYC(uid),
    enabled: !!uid,
  });
}

export function useDeposits(uid: string) {
  return useQuery({
    queryKey: ['deposits', uid],
    queryFn: () => fetchDeposits(uid),
    enabled: !!uid,
  });
}

export function useTransactions(uid: string) {
  return useQuery({
    queryKey: ['transactions', uid],
    queryFn: () => fetchTransactions(uid),
    enabled: !!uid,
  });
}
