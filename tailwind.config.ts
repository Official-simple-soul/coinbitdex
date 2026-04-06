import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#3b82f6',
          violet: '#8b5cf6',
          cyan: '#06b6d4',
          gold: '#f59e0b',
          green: '#10b981',
          red: '#ef4444',
        },
        dark: {
          50: '#f0f4ff',
          100: '#d9e2fa',
          200: '#8b9dc3',
          300: '#4a5980',
          400: '#1e2d52',
          500: '#0d1224',
          600: '#0a0f1e',
          700: '#060914',
          800: '#040710',
          900: '#02040a',
        },
      },
      backgroundImage: {
        'hero-bg': "url('/images/background.avif')",
        'auth-bg': "url('/images/authBg.jpeg')",
        'gradient-primary': 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        'gradient-gold': 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
        'gradient-cyan': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'orb-pulse': 'orb-pulse 6s ease-in-out infinite',
        shimmer: 'shimmer 4s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'fade-in-up': 'fade-in-up 0.7s ease forwards',
        'fade-in': 'fade-in 0.5s ease forwards',
        'border-glow': 'border-glow 3s ease-in-out infinite',
        'ticker-scroll': 'ticker-scroll 30s linear infinite',
        'particle-float': 'particle-float 8s ease-in-out infinite',
        'grid-glow': 'grid-glow 4s ease-in-out infinite',
        'scan-line': 'scan-line 3s ease-in-out infinite',
        'blob-pulse': 'blob-pulse 8s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'text-reveal': 'text-reveal 0.6s ease forwards',
        'float-rotate': 'float-rotate 7s ease-in-out infinite',
        'intense-glow': 'intense-glow 3s ease-in-out infinite',
        'rainbow-border': 'rainbow-border 4s ease infinite',
        'scale-bounce': 'scale-bounce 2s ease-in-out infinite',
        drift: 'drift 8s ease-in-out infinite',
        'orb-rotate-pulse': 'orb-rotate-pulse 8s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s ease-in-out infinite',
        'hero-shimmer': 'hero-shimmer 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-18px) rotate(1deg)' },
          '66%': { transform: 'translateY(-8px) rotate(-1deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-25px)' },
        },
        'orb-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(59,130,246,0.3),0 0 40px transparent',
          },
          '50%': {
            boxShadow:
              '0 0 40px rgba(59,130,246,0.5),0 0 80px rgba(59,130,246,0.15)',
          },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(59,130,246,0.2)' },
          '50%': { borderColor: 'rgba(59,130,246,0.6)' },
        },
        'ticker-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'blob-pulse': {
          '0%, 100%': { borderRadius: '58% 42% 37% 63% / 67% 35% 65% 33%' },
          '25%': { borderRadius: '42% 58% 65% 35% / 33% 67% 35% 65%' },
          '50%': { borderRadius: '35% 65% 42% 58% / 65% 33% 67% 35%' },
          '75%': { borderRadius: '63% 37% 58% 42% / 35% 65% 33% 67%' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'text-reveal': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'float-rotate': {
          '0%, 100%': { transform: 'translateY(0px) rotateZ(-5deg)' },
          '33%': { transform: 'translateY(-30px) rotateZ(5deg)' },
          '66%': { transform: 'translateY(-15px) rotateZ(-3deg)' },
        },
        'intense-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.2), 0 0 40px transparent',
            opacity: '0.8',
          },
          '50%': {
            boxShadow:
              '0 0 60px rgba(59, 130, 246, 0.6), 0 0 100px rgba(139, 92, 246, 0.3)',
            opacity: '1',
          },
        },
        'rainbow-border': {
          '0%': {
            borderColor: '#3b82f6',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
          },
          '25%': {
            borderColor: '#8b5cf6',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
          },
          '50%': {
            borderColor: '#06b6d4',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
          },
          '75%': {
            borderColor: '#f59e0b',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)',
          },
          '100%': {
            borderColor: '#3b82f6',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
          },
        },
        'scale-bounce': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
          '25%': { transform: 'translateX(20px) translateY(-10px)' },
          '50%': { transform: 'translateX(0px) translateY(20px)' },
          '75%': { transform: 'translateX(-20px) translateY(-5px)' },
        },
        'orb-rotate-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1) rotateZ(0deg)' },
          '50%': { opacity: '0.7', transform: 'scale(1.15) rotateZ(180deg)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.4)' },
          '50%': { boxShadow: '0 0 0 20px rgba(59, 130, 246, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' },
        },
        'hero-shimmer': {
          '0%': {
            backgroundPosition: '-200% center',
            color: 'rgba(240, 244, 255, 0.5)',
          },
          '50%': {
            backgroundPosition: '0% center',
            color: 'rgba(240, 244, 255, 0.9)',
          },
          '100%': {
            backgroundPosition: '200% center',
            color: 'rgba(240, 244, 255, 0.5)',
          },
        },
        'particle-float': {
          '0%, 100%': {
            transform: 'translateY(0) translateX(0)',
            opacity: '0.3',
          },
          '25%': {
            transform: 'translateY(-20px) translateX(10px)',
            opacity: '0.6',
          },
          '50%': {
            transform: 'translateY(-40px) translateX(-5px)',
            opacity: '0.2',
          },
          '75%': {
            transform: 'translateY(-20px) translateX(-10px)',
            opacity: '0.5',
          },
        },
        'grid-glow': {
          '0%, 100%': { opacity: '0.03' },
          '50%': { opacity: '0.07' },
        },
        'scan-line': {
          '0%': { top: '-100%' },
          '100%': { top: '100%' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(59,130,246,0.4)',
        'glow-violet': '0 0 30px rgba(139,92,246,0.4)',
        'glow-cyan': '0 0 30px rgba(6,182,212,0.4)',
        'glow-gold': '0 0 30px rgba(245,158,11,0.4)',
        card: '0 20px 60px rgba(0,0,0,0.5)',
        'card-hover':
          '0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.15)',
      },
    },
  },
  plugins: [],
} satisfies Config;
