import type { UserData } from '~/providers/types';

export const mainWalletItems = [
  {
    title: 'Deposit',
    img: '/images/deposit.png',
    to: '/dashboard/deposit',
  },
  {
    title: 'Withdraw',
    img: '/images/withdraw.png',
    to: '/dashboard/withdraw',
  },
  {
    title: 'Records',
    img: '/images/records.png',
    to: '/dashboard/transactions',
  },
  {
    title: 'Account',
    img: '/images/account.png',
    to: '/dashboard/accounts',
  },
];

export const summaryItems = (data: UserData) => {
  return [
    {
      id: 1,
      title: 'Total Deposit',
      amount: data?.total_deposit,
      icon: '/images/deposit-summary.png',
      slug: 'deposit',
    },
    {
      id: 2,
      title: 'Total Withdraw',
      amount: data?.total_withdraw,
      icon: '/images/withdraw-summary.png',
      slug: 'withdraw',
    },

    {
      id: 3,
      title: 'CopyTrade Profit',
      amount: data?.copy_trading_profit,
      icon: '/images/copy-profit-summary.png',
      slug: '',
    },
    {
      id: 4,
      title: 'Total Profit',
      amount: data?.total_profit,
      icon: '/images/profit-summary.png',
      slug: '',
    },
  ];
};

export const methods = [
  {
    type: 'btc',
    icon: '/images/bitcoin.png',
    qr: '/wallet/btc.jpeg',
    wallet_address: 'bc1qgknfvf0tm6kkurcgs3v9tjashqkvy493ns7eva',
  },
  {
    type: 'eth',
    icon: '/images/ethereum.png',
    qr: '/wallet/eth.jpeg',
    wallet_address: '0x562985F9a0aAd0Ffc3381Ad0b13dD8cF76444b9B',
  },
  {
    type: 'usdt-eth',
    icon: '/images/tether.png',
    qr: '/wallet/usdt-eth.jpeg',
    wallet_address: '0x562985F9a0aAd0Ffc3381Ad0b13dD8cF76444b9B',
  },
  {
    type: 'usdt-tron',
    icon: '/images/tether.png',
    qr: '/wallet/usdt-tron.jpeg',
    wallet_address: 'TZAVxf3qpQ1LCb8H8ZAz4Ci3jQiVJDVTd8',
  },
];

export const tradeHistoryItems = [
  {
    id: 1,
    type: 'deposit',
    transactionType: 'in',
    description: 'Deposit Successful',
    amount: 1200,
    trxId: 'TDDREVJQQ2QY9R9',
    date: '24-01-2025',
    timeAgo: '16 minutes ago',
  },
  {
    id: 2,
    type: 'withdraw',
    transactionType: 'out',
    description: 'Withdrawal Request',
    amount: 500,
    trxId: 'WTHDRAW12345678',
    date: '23-01-2025',
    timeAgo: '2 hours ago',
  },
  {
    id: 3,
    type: 'commission',
    transactionType: 'in',
    description: 'Copy Trading Profit',
    amount: 300,
    trxId: 'COPYTRD98765432',
    date: '22-01-2025',
    timeAgo: '1 day ago',
  },
  {
    id: 4,
    type: 'deposit',
    transactionType: 'in',
    description: 'Trading Profit',
    amount: 750,
    trxId: 'TRADEPROF112233',
    date: '21-01-2025',
    timeAgo: '2 days ago',
  },
  {
    id: 5,
    type: 'withdraw',
    transactionType: 'out',
    description: 'Withdrawal Request',
    amount: 200,
    trxId: 'WTHDRAW87654321',
    date: '20-01-2025',
    timeAgo: '3 days ago',
  },
];

export const recordOptions = [
  {
    label: 'All',
    id: 1,
    key: 'all',
  },
  {
    label: 'Deposit',
    id: 2,
    key: 'deposit',
  },
  {
    label: 'Withdraw',
    id: 3,
    key: 'withdraw',
  },
  // {
  //   label: 'Commission',
  //   id: 4,
  //   key: 'commission',
  // },
];

export const traders = [
  {
    id: 1,
    name: 'OmarHassan',
    strategy: 'Perpetual Futures',
    cumulativePnl: '+92,378.12',
    copiers: 1923,
    winRatio: '58.4%',
    riskScore: 20,
    copyCode: '3291Hassan0Omar1',
  },
  {
    id: 2,
    name: 'LenaSchmidt',
    strategy: 'Spot Trading',
    cumulativePnl: '+85,764.45',
    copiers: 1654,
    winRatio: '72.1%',
    riskScore: 15,
    copyCode: '4516Schmidt0Lena2',
  },
  {
    id: 3,
    name: 'Cy Watson',
    strategy: 'Perpetual Futures',
    cumulativePnl: '+4,462,600.52',
    copiers: 43653,
    winRatio: '98.9%',
    riskScore: 15,
    copyCode: '2441Xiang0Wei3',
  },
  {
    id: 4,
    name: 'DiegoMartínez',
    strategy: 'Spot Trading',
    cumulativePnl: '+67,542.89',
    copiers: 1321,
    winRatio: '74.9%',
    riskScore: 44,
    copyCode: '1312Martinez0Diego4',
  },
  {
    id: 5,
    name: 'Up&Down Involio',
    strategy: 'Perpetual Futures',
    cumulativePnl: '+120,987.42',
    copiers: 1210,
    winRatio: '91.7%',
    riskScore: 6,
    copyCode: '2110Up&Down0Involio5',
  },
  {
    id: 6,
    name: 'KenjiTanaka',
    strategy: 'Spot Trading',
    cumulativePnl: '+48,765.10',
    copiers: 1056,
    winRatio: '82.5%',
    riskScore: 20,
    copyCode: '1065Tanaka0Kenji7',
  },
  {
    id: 7,
    name: 'Anne FX',
    strategy: 'Perpetual Futures',
    cumulativePnl: '+70,432.33',
    copiers: 1923,
    winRatio: '87.8%',
    riskScore: 12,
    copyCode: '239Larsen0Sven7',
  },
  {
    id: 8,
    name: 'AishaKone',
    strategy: 'Spot Trading',
    cumulativePnl: '+29,874.66',
    copiers: 812,
    winRatio: '85.2%',
    riskScore: 41,
    copyCode: '812Kone0Aisha8',
  },
  {
    id: 9,
    name: 'Dmitry Ivanov',
    strategy: 'Perpetual Futures',
    cumulativePnl: '+18,542.78',
    copiers: 678,
    winRatio: '83.9%',
    riskScore: 55,
    copyCode: '867Ivanov0Dmitry9',
  },
  {
    id: 10,
    name: 'NiaWilliams',
    strategy: 'Spot Trading',
    cumulativePnl: '+10,987.23',
    copiers: 543,
    winRatio: '88.6%',
    riskScore: 34,
    copyCode: '345Williams0Nia10',
  },
];

export const menuItems = [
  {
    id: 1,
    icon: '/images/account-icon.png',
    label: 'Account Info',
    to: '/dashboard/account_info',
  },
  {
    id: 2,
    icon: '/images/kyc.png',
    label: 'KYC Status',
    to: '/dashboard/kyc',
  },
  {
    id: 3,
    icon: '/images/referrals.png',
    label: 'Referrals (10%)',
    to: '/dashboard/referral',
  },
];
