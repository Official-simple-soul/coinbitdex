import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about', 'routes/about.tsx'),
  route('login', 'routes/login.tsx'),
  route('signup', 'routes/signup.tsx'),
  route('copy-trading', 'routes/copyTrading.tsx'),
  route('crypto-market', 'routes/crypto_market.tsx'),
  route('buy-crypto', 'routes/buy_crypto.tsx'),
  route('ai', 'routes/ai.tsx'),
  route('dashboard', 'routes/dashboard.tsx'),
  route('dashboard/market', 'routes/market.tsx'),
  route('dashboard/spot', 'routes/spot.tsx'),
  route('dashboard/futures', 'routes/futures.tsx'),
  route('dashboard/copy', 'routes/copy.tsx'),
  route('dashboard/deposit', 'routes/deposit.tsx'),
  route('dashboard/withdraw', 'routes/withdraw.tsx'),
  route('dashboard/transactions', 'routes/transactions.tsx'),
  route('dashboard/accounts', 'routes/accounts.tsx'),
  route('dashboard/kyc', 'routes/kyc.tsx'),
  route('dashboard/account_info', 'routes/account_info.tsx'),
  route('dashboard/referral', 'routes/referral.tsx'),
] satisfies RouteConfig;
