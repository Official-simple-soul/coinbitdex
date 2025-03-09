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
  { icon: IconCoin, label: 'Spot', href: '/dashboard/spot' },
  { icon: IconTrendingUp, label: 'Futures', href: '/dashboard/futures' },
  { icon: IconCopy, label: 'Copy Trading', href: '/dashboard/copy' },
  { icon: IconWallet, label: 'Assets', href: '/dashboard/assets' },
];
