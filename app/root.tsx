import {
  Outlet,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import type { Route } from './+types/root';
import stylesheet from './app.css?url';
import { AuthProvider } from './providers/AuthProvider';
import { FunctionsProvider } from './providers/FunctionsProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { SmartsuppChat } from './components/common/SmartsuppChat';
import GoogleTranslateWidget from './components/common/GoogleTranslateWidget';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  { rel: 'stylesheet', href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
        <title>Coinbitdex</title>
        <meta
          name="description"
          content="Your one stop trading assist platform"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.coinbitdex.com/" />
        <meta property="og:title" content="Coinbitdex" />
        <meta
          property="og:description"
          content="Your one stop trading assist platform"
        />
        <meta
          property="og:image"
          content="https://static.wixstatic.com/media/c9104a_b53ba5d542704e1585e7e64705c7d349~mv2.png/v1/fill/w_480,h_114,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo_4_wht-removebg-preview.png"
        />
        <meta property="og:image:type" content="image/avif" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="315" />
        <link rel="icon" href="/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <GoogleTranslateWidget />
        <ScrollRestoration />
        <Scripts />
        <SmartsuppChat />
      </body>
    </html>
  );
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider>
      <Notifications position="top-right" />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <FunctionsProvider>
            <I18nextProvider i18n={i18n}>
              <Outlet />
            </I18nextProvider>
          </FunctionsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
