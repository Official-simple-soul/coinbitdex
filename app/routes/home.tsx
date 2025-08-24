import HomePage from '~/components/pages/home/Home';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Coinbitdex' },
    { name: 'description', content: 'Your one stop trading assist platform' },
  ];
}

export default function Home() {
  return <HomePage />;
}
