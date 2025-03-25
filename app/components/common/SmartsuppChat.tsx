// components/SmartsuppChat.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router';

// Extend the Window interface to include smartsupp
declare global {
  interface Window {
    smartsupp?: any;
    _smartsupp?: { key?: string; hideWidget?: boolean };
  }
}

export function SmartsuppChat() {
  const location = useLocation();
  const shouldShowChat = location.pathname.startsWith('/dashboard');

  useEffect(() => {
    // Initialize Smartsupp only on client-side
    if (typeof window !== 'undefined') {
      window._smartsupp = window._smartsupp || {};
      window._smartsupp.key = 'a255f797ab0907f22e8d262d8502c3fffb4beb33';

      if (!window.smartsupp) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = true;
        script.src = 'https://www.smartsuppchat.com/loader.js';
        document.body.appendChild(script);
      }
    }
  }, []);

  return null;
}
