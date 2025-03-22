import {
  IconHome,
  IconChartCandle,
  IconCoin,
  IconTrendingUp,
  IconCopy,
  IconWallet,
} from '@tabler/icons-react';

export const sidebarItems = [
  { icon: IconHome, label: 'Home', href: '/dashboard' },
  { icon: IconChartCandle, label: 'Market', href: '/dashboard/market' },
  { icon: IconCoin, label: 'Deposit', href: '/dashboard/deposit' },
  { icon: IconTrendingUp, label: 'Withdraw', href: '/dashboard/withdraw' },
  { icon: IconCopy, label: 'Copy Trading', href: '/dashboard/copy' },
  { icon: IconWallet, label: 'Transactions', href: '/dashboard/transactions' },
];
