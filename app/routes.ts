import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about', 'routes/about.tsx'),
  route('login', 'routes/login.tsx'),
  route('signup', 'routes/signup.tsx'),
  route('crypto-market', 'routes/crypto_market.tsx'),
  route('buy-crypto', 'routes/buy_crypto.tsx'),
  route('ai', 'routes/ai.tsx'),
  route('dashboard', 'routes/dashboard.tsx'),
  route('dashboard/market', 'routes/market.tsx'),
  route('dashboard/spot', 'routes/spot.tsx'),
  route('dashboard/futures', 'routes/futures.tsx'),
  route('dashboard/copy', 'routes/copy.tsx'),
  route('dashboard/assets', 'routes/assets.tsx'),
] satisfies RouteConfig;
