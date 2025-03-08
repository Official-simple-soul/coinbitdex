import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about', 'routes/about.tsx'),
  route('login', 'routes/login.tsx'),
  route('signup', 'routes/signup.tsx'),
  route('crypto-market', 'routes/crypto_market.tsx'),
  route('buy-crypto', 'routes/buy_crypto.tsx'),
  route('ai', 'routes/ai.tsx'),
] satisfies RouteConfig;
