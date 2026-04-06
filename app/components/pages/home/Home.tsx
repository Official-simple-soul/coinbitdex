import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import UnAuthLayout from '../../../layouts/UnAuthLayout';
import Marquee from 'react-fast-marquee';
import smallTradeChart from '/images/small-trading-chart.gif';
import laptopPhone from '/images/laptop-phone.webp';
import chart1 from '/images/chart-1.png';
import chart2 from '/images/chart-2.png';
import chart3 from '/images/chart-3.png';
import chart4 from '/images/chart-4.png';
import chart5 from '/images/chart-5.png';
import chart6 from '/images/chart-6.png';
import { Advcash, Banxa, MoonPay, TradingView, Xanpool } from '~/utils/Svgs';

/* ─── Animated Counter Hook ─── */
function useCounter(target: number, duration = 2000, inView = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, inView]);
  return count;
}

/* ─── Section reveal wrapper ─── */
const RevealSection: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Crypto Ticker Data ─── */
const tickerItems = [
  { symbol: 'BTC', price: '$84,320', change: '+2.4%', up: true },
  { symbol: 'ETH', price: '$3,201', change: '+1.8%', up: true },
  { symbol: 'SOL', price: '$142.5', change: '-0.9%', up: false },
  { symbol: 'BNB', price: '$612', change: '+3.1%', up: true },
  { symbol: 'XRP', price: '$0.542', change: '+5.2%', up: true },
  { symbol: 'ADA', price: '$0.391', change: '-1.2%', up: false },
  { symbol: 'AVAX', price: '$38.7', change: '+4.3%', up: true },
  { symbol: 'DOGE', price: '$0.128', change: '-2.1%', up: false },
  { symbol: 'MATIC', price: '$0.872', change: '+1.5%', up: true },
  { symbol: 'DOT', price: '$7.24', change: '+0.8%', up: true },
];

/* ─── Product Cards ─── */
const products = [
  {
    icon: '🤖',
    title: 'AI/Grid Bot Trading',
    description:
      'Intelligent auto-trading bots powered by AI. Buy & sell 24/7 with pre-programmed strategies while you live your life.',
    gradient: 'from-blue-600/20 to-violet-600/20',
    borderColor: 'rgba(139, 92, 246, 0.3)',
    glowColor: 'rgba(139, 92, 246, 0.15)',
    href: '/ai',
    badge: 'AI Powered',
  },
  {
    icon: '📈',
    title: 'Derivatives & Futures',
    description:
      'Long/short positions with leverage up to 150x. Profit from market volatility in any direction.',
    gradient: 'from-cyan-600/20 to-blue-600/20',
    borderColor: 'rgba(6, 182, 212, 0.3)',
    glowColor: 'rgba(6, 182, 212, 0.15)',
    href: '/dashboard/futures',
    badge: '150x Leverage',
  },
  {
    icon: '🔁',
    title: 'Copy / Mirror Trading',
    description:
      'Automatically replicate the strategies of elite traders in real-time. Perfect for beginners and passive investors.',
    gradient: 'from-green-600/20 to-cyan-600/20',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    href: '/copy-trading',
    badge: '2000+ Traders',
  },
  {
    icon: '💳',
    title: 'Buy Crypto Instantly',
    description:
      'Purchase over 300+ cryptocurrencies with 80% of fiat currencies worldwide. Fast, secure, on-ramp and off-ramp.',
    gradient: 'from-gold-400/20 to-orange-600/20',
    borderColor: 'rgba(245, 158, 11, 0.3)',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    href: '/buy-crypto',
    badge: '300+ Cryptos',
  },
];

/* ─── Platform Stats ─── */
const platformStats = [
  {
    value: 1000000,
    suffix: 'M+',
    label: 'Global Users',
    display: '1M+',
    icon: '🌐',
  },
  {
    value: 4600000000,
    suffix: 'B+',
    label: '24h Trading Volume',
    display: '$4.6B+',
    icon: '📊',
  },
  {
    value: 220,
    suffix: '+',
    label: 'Listed Cryptocurrencies',
    display: '220+',
    icon: '🪙',
  },
  {
    value: 150,
    suffix: 'x',
    label: 'Max Leverage',
    display: '150x',
    icon: '⚡',
  },
];

/* ─── Elite Trader Cards ─── */
const eliteTraders = [
  {
    name: 'Alex_Crypto',
    handle: '@alexcrypto',
    roi: '+184%',
    winRate: '87%',
    followers: '12.4K',
    badge: '🥇 Top Trader',
    color: '#f59e0b',
    pnl: '+$48,320',
    tag: 'Scalping',
  },
  {
    name: 'TradeMaster',
    handle: '@trademaster',
    roi: '+127%',
    winRate: '79%',
    followers: '8.2K',
    badge: '🥈 Pro',
    color: '#8b5cf6',
    pnl: '+$31,540',
    tag: 'Swing',
  },
  {
    name: 'Sophie_FX',
    handle: '@sophiefx',
    roi: '+96%',
    winRate: '83%',
    followers: '6.1K',
    badge: '🥉 Expert',
    color: '#06b6d4',
    pnl: '+$22,890',
    tag: 'AI Bot',
  },
];

/* ─── Steps ─── */
const steps = [
  {
    step: '01',
    title: 'Create Your Account',
    desc: "Sign up in under 2 minutes with just your email. Verify and you're ready to go.",
    icon: '👤',
    color: 'var(--blue)',
  },
  {
    step: '02',
    title: 'Fund Your Wallet',
    desc: 'Deposit crypto or buy with credit card. Instant processing, 80+ fiat currencies supported.',
    icon: '💳',
    color: 'var(--violet)',
  },
  {
    step: '03',
    title: 'Start Trading',
    desc: 'Trade manually, copy elite traders, or let AI bots do the work. Anytime, anywhere.',
    icon: '🚀',
    color: 'var(--cyan)',
  },
];

/* ─── Partners ─── */
const partners = [
  { logo: Advcash, name: 'Advcash' },
  { logo: Banxa, name: 'Banxa' },
  { logo: Xanpool, name: 'Xanpool' },
  { logo: TradingView, name: 'TradingView' },
  { logo: MoonPay, name: 'MoonPay' },
];

const chartImages = [
  chart1,
  chart2,
  // chart3, chart4, chart5, chart6
];

/* ══════════════════════════════════════
   MAIN HOME COMPONENT
══════════════════════════════════════ */
const Home: React.FC = () => {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <UnAuthLayout>
      <main style={{ backgroundColor: 'var(--bg-primary)' }}>
        {/* ══ 1. HERO SECTION ══ */}
        <section
          id="hero-section"
          className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col justify-center"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          {/* Enhanced Animated Orbs with Morphing */}
          <motion.div
            className="orb w-[600px] h-[600px] -top-32 -left-20 opacity-40 animate-orb-rotate-pulse"
            style={{
              background:
                'radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(139,92,246,0.3) 40%, transparent 70%)',
              filter: 'blur(80px)',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="orb w-[500px] h-[500px] top-20 right-0 opacity-30 animate-orb-rotate-pulse"
            style={{
              background:
                'radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(6,182,212,0.2) 50%, transparent 70%)',
              filter: 'blur(80px)',
              animationDelay: '2s',
            }}
            animate={{
              x: [-50, 0, -50],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
          <motion.div
            className="orb w-[400px] h-[400px] bottom-0 left-1/3 opacity-25 animate-orb-rotate-pulse"
            style={{
              background:
                'radial-gradient(circle, rgba(6,182,212,0.6) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)',
              filter: 'blur(80px)',
              animationDelay: '4s',
            }}
            animate={{
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />

          {/* Extra Crazy Glowing Orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`glow-orb-${i}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: `${80 + i * 60}px`,
                height: `${80 + i * 60}px`,
                background: [
                  'rgba(59,130,246,0.3)',
                  'rgba(139,92,246,0.25)',
                  'rgba(6,182,212,0.2)',
                  'rgba(245,158,11,0.2)',
                  'rgba(139,92,246,0.3)',
                ][i],
                filter: 'blur(60px)',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                scale: [1, 1.3, 0.8, 1],
              }}
              transition={{
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 1.5,
              }}
            />
          ))}

          {/* Grid Background with Animation */}
          <motion.div
            className="absolute inset-0 grid-bg opacity-40"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Particle System */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                background: [
                  '#3b82f6',
                  '#8b5cf6',
                  '#06b6d4',
                  '#f59e0b',
                  '#10b981',
                ][Math.floor(Math.random() * 5)],
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: `0 0 ${10 + Math.random() * 15}px currentColor`,
              }}
              animate={{
                y: [-20, -300 - Math.random() * 200, -20],
                x: [0, (Math.random() - 0.5) * 100, 0],
                opacity: [0, 1, 0.5, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 6,
                repeat: Infinity,
                ease: 'easeOut',
                delay: i * 0.5,
              }}
            />
          ))}

          {/* Enhanced Floating Crypto Bubbles with Complex Motion */}
          {['₿', 'Ξ', '◎', '⬡'].map((sym, i) => (
            <motion.div
              key={i}
              className="absolute font-bold select-none pointer-events-none"
              style={{
                fontSize: `${28 + i * 8}px`,
                color: ['#f59e0b', '#627eea', '#9945ff', '#00d4aa'][i],
                opacity: 0.15,
                top: `${[15, 70, 30, 80][i]}%`,
                left: `${[85, 90, 92, 78][i]}%`,
                filter: `drop-shadow(0 0 ${20 + i * 5}px ${['#f59e0b', '#627eea', '#9945ff', '#00d4aa'][i]}40)`,
              }}
              animate={{
                y: [-20, 30, -20],
                x: [-10, 15, -10],
                rotate: [0, 360, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 7 + i * 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.8,
              }}
            >
              {sym}
            </motion.div>
          ))}

          {/* Hero Content — two-column on lg+ */}
          <div className="container-xl relative z-10 pt-16 pb-20">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* ── Left: Text ── */}
              <div className="flex-1 w-full lg:max-w-[52%]">
                {/* Badge with Enhanced Animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: -20 }}
                  animate={heroVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.05,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 group hover:scale-110 transition-transform relative overflow-hidden cursor-pointer"
                  style={{
                    background: 'rgba(59,130,246,0.12)',
                    border: '1px solid rgba(59,130,246,0.3)',
                    color: '#60a5fa',
                  }}
                >
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                    animate={{ opacity: [0, 0.3, 0], x: [-100, 100, -100] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-green-400 relative z-10"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="relative z-10">
                    #1 Decentralized Trading Platform · Trusted by 1M+ Traders
                  </span>
                </motion.div>

                {/* Enhanced Headline with Staggered Animation */}
                <div className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 overflow-hidden">
                  <motion.span
                    initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
                    animate={
                      heroVisible
                        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                        : {}
                    }
                    transition={{
                      duration: 1,
                      delay: 0.2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="block"
                  >
                    Trade Smarter.
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
                    animate={
                      heroVisible
                        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                        : {}
                    }
                    transition={{
                      duration: 1,
                      delay: 0.35,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="block text-shimmer animate-hero-shimmer bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-[200%_auto]"
                    whileHover={{ scale: 1.05 }}
                  >
                    Earn Bigger.
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
                    animate={
                      heroVisible
                        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                        : {}
                    }
                    transition={{
                      duration: 1,
                      delay: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="block"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    24/7, Anywhere.
                  </motion.span>
                </div>

                {/* Enhanced Subheading */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.55 }}
                  className="text-lg mb-10 max-w-[520px]"
                  style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}
                >
                  The most advanced crypto trading platform. Spot, futures, copy
                  trading, and AI bots — all under one roof.
                </motion.p>

                {/* Enhanced Button Group */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.65 }}
                  className="flex flex-wrap gap-4 mb-12 relative"
                >
                  {/* Animated glow effect behind buttons */}
                  <motion.div
                    className="absolute -inset-20 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
                      filter: 'blur(40px)',
                    }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  <Link to="/signup">
                    <motion.button
                      className="btn-primary text-base px-8 py-4 animate-glow-pulse relative overflow-hidden group z-10"
                      style={{
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: 700,
                      }}
                      whileHover={{
                        scale: 1.08,
                        boxShadow: '0 30px 60px rgba(59,130,246,0.5)',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                        transition={{ duration: 0.3 }}
                      />
                      <motion.span
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Start Trading Free →
                      </motion.span>
                    </motion.button>
                  </Link>
                  <Link to="/crypto-market">
                    <motion.button
                      className="btn-outline text-base px-8 py-4 group hover:shadow-lg relative overflow-hidden z-10"
                      style={{ borderRadius: '12px', fontSize: '16px' }}
                      whileHover={{
                        scale: 1.08,
                        backgroundColor: 'rgba(59,130,246,0.1)',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100"
                        animate={{ x: [-100, 100, -100] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                      <span className="relative z-10">Explore Markets</span>
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Animated Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="flex flex-wrap gap-8"
                >
                  {[
                    { value: '$4.6B+', label: '24h Volume' },
                    { value: '1M+', label: 'Users' },
                    { value: '220+', label: 'Cryptos' },
                    { value: '0.02%', label: 'Fee' },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col"
                      whileHover={{ scale: 1.1 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <motion.span
                        className="font-display text-2xl font-bold text-white"
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        {s.value}
                      </motion.span>
                      <span
                        className="text-xs"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {s.label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* ── Right: Animated Dashboard Widget ── */}
              <motion.div
                className="hidden lg:flex flex-col gap-3 w-full lg:max-w-[44%] flex-shrink-0"
                initial={{ opacity: 0, x: 60 }}
                animate={heroVisible ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {/* Portfolio Card with Enhanced Animation */}
                <motion.div
                  className="rounded-2xl p-5"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    backdropFilter: 'blur(20px)',
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  whileHover={{
                    boxShadow: '0 20px 60px rgba(59,130,246,0.2)',
                    scale: 1.02,
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-semibold"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      PORTFOLIO VALUE
                    </span>
                    <motion.span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        background: 'rgba(16,185,129,0.15)',
                        color: '#6ee7b7',
                      }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ↑ +12.4%
                    </motion.span>
                  </div>
                  <motion.div
                    className="font-display text-4xl font-bold text-white mb-4"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    $48,320.50
                  </motion.div>
                  {/* Mini bar chart with Stagger */}
                  <div className="flex items-end gap-1 h-12">
                    {[40, 65, 45, 80, 55, 90, 70, 95, 75, 100, 82, 110].map(
                      (h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-sm cursor-pointer transition-all hover:brightness-150"
                          style={{
                            background:
                              i === 11
                                ? 'var(--blue)'
                                : 'rgba(59,130,246,0.25)',
                          }}
                          initial={{ height: 0 }}
                          animate={
                            heroVisible ? { height: `${h}%` } : { height: 0 }
                          }
                          transition={{ duration: 0.6, delay: 0.75 + i * 0.05 }}
                          whileHover={{ height: `${Math.min(h + 15, 100)}%` }}
                        />
                      ),
                    )}
                  </div>
                </motion.div>

                {/* Live Prices Row with Stagger */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    {
                      sym: 'BTC',
                      price: '$84,320',
                      chg: '+2.4%',
                      up: true,
                      color: '#f59e0b',
                      icon: '₿',
                    },
                    {
                      sym: 'ETH',
                      price: '$3,201',
                      chg: '+1.8%',
                      up: true,
                      color: '#627eea',
                      icon: 'Ξ',
                    },
                    {
                      sym: 'SOL',
                      price: '$142.5',
                      chg: '-0.9%',
                      up: false,
                      color: '#9945ff',
                      icon: '◎',
                    },
                  ].map((coin, i) => (
                    <motion.div
                      key={i}
                      className="rounded-xl p-3 flex flex-col gap-1 cursor-pointer"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                      }}
                      animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                      transition={{
                        duration: 4.5 + i,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.3,
                      }}
                      whileHover={{
                        background: 'rgba(255,255,255,0.08)',
                        scale: 1.05,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          style={{
                            color: coin.color,
                            fontSize: '14px',
                            filter: `drop-shadow(0 0 6px ${coin.color}60)`,
                          }}
                        >
                          {coin.icon}
                        </span>
                        <span className="text-xs font-bold text-white">
                          {coin.sym}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-white">
                        {coin.price}
                      </span>
                      <motion.span
                        className="text-xs font-semibold"
                        style={{ color: coin.up ? '#10b981' : '#ef4444' }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {coin.chg}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>

                {/* Active Orders with Enhanced Animation */}
                <motion.div
                  className="rounded-2xl p-4"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(12px)',
                  }}
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 6.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                  whileHover={{
                    boxShadow: '0 20px 60px rgba(59,130,246,0.15)',
                    scale: 1.02,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs font-semibold"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      ACTIVE ORDERS
                    </span>
                    <motion.span
                      className="text-xs text-green-400 font-semibold"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ● LIVE
                    </motion.span>
                  </div>
                  {[
                    {
                      pair: 'BTC/USDT',
                      type: 'BUY',
                      amount: '0.042 BTC',
                      val: '$3,541',
                      color: '#10b981',
                    },
                    {
                      pair: 'ETH/USDT',
                      type: 'SELL',
                      amount: '1.2 ETH',
                      val: '$3,841',
                      color: '#ef4444',
                    },
                    {
                      pair: 'SOL/USDT',
                      type: 'BUY',
                      amount: '18 SOL',
                      val: '$2,565',
                      color: '#10b981',
                    },
                  ].map((order, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center justify-between py-2 hover:bg-white/5 px-1 rounded transition-colors"
                      style={{
                        borderBottom:
                          i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      }}
                      initial={{ opacity: 0, x: 15 }}
                      animate={heroVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 1.1 + i * 0.12 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-bold px-1.5 py-0.5 rounded"
                          style={{
                            background: `${order.color}22`,
                            color: order.color,
                          }}
                        >
                          {order.type}
                        </span>
                        <span className="text-xs text-white font-medium">
                          {order.pair}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-white">{order.val}</div>
                        <div
                          className="text-xs"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {order.amount}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* AI Bot Badge with Pulse */}
                <motion.div
                  className="rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer"
                  style={{
                    background: 'rgba(59,130,246,0.1)',
                    border: '1px solid rgba(59,130,246,0.25)',
                  }}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  whileHover={{
                    background: 'rgba(59,130,246,0.15)',
                    boxShadow: '0 8px 30px rgba(59,130,246,0.2)',
                  }}
                >
                  <motion.span
                    className="text-2xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🤖
                  </motion.span>
                  <div>
                    <div className="text-xs font-bold text-white">
                      AI Bot Active
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Monitoring 14 pairs · 99.9% uptime
                    </div>
                  </div>
                  <motion.span
                    className="ml-auto text-xs font-bold"
                    style={{ color: '#10b981' }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    +$1,240 today
                  </motion.span>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, transparent, var(--bg-primary))',
            }}
          />
        </section>

        {/* ══ 2. LIVE TICKER ══ */}
        <section
          className="py-5 relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.025)',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <Marquee speed={50} gradient={false} pauseOnHover>
            {[...tickerItems, ...tickerItems].map((t, i) => (
              <div key={i} className="flex items-center gap-2 mx-6">
                <span className="font-display font-bold text-sm text-white">
                  {t.symbol}
                </span>
                <span className="text-sm text-white/80">{t.price}</span>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    color: t.up ? '#10b981' : '#ef4444',
                    background: t.up
                      ? 'rgba(16,185,129,0.12)'
                      : 'rgba(239,68,68,0.12)',
                  }}
                >
                  {t.change}
                </span>
                <span className="mx-4 opacity-20">|</span>
              </div>
            ))}
          </Marquee>
        </section>

        {/* ══ 3. PLATFORM STATS ══ */}
        <section className="section-padding" ref={statsRef}>
          <div className="container-xl">
            <RevealSection className="text-center mb-16">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'var(--blue)' }}
              >
                By The Numbers
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Trusted by Traders Globally
              </h2>
              <p
                className="text-lg max-w-[480px] mx-auto"
                style={{ color: 'var(--text-secondary)' }}
              >
                Join over a million traders who have chosen CoinbitDex as their
                go-to platform.
              </p>
            </RevealSection>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {platformStats.map((stat, i) => (
                <RevealSection key={i} delay={i * 0.12}>
                  <motion.div
                    className="stat-card group relative overflow-hidden"
                    whileHover={{ y: -8, scale: 1.02 }}
                    onMouseEnter={() => {}}
                  >
                    {/* Animated glow background */}
                    <motion.div
                      className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: [
                          'rgba(59,130,246,0.2)',
                          'rgba(139,92,246,0.2)',
                          'rgba(6,182,212,0.2)',
                          'rgba(245,158,11,0.2)',
                        ][i],
                        filter: 'blur(20px)',
                      }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div
                      className="text-3xl mb-3"
                      style={{
                        filter: 'drop-shadow(0 0 12px rgba(59,130,246,0.4))',
                      }}
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      {stat.icon}
                    </motion.div>
                    <motion.div
                      className="font-display text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-gradient transition-all"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {stat.display}
                    </motion.div>
                    <div
                      className="text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 4. PRODUCTS ══ */}
        <section
          className="section-padding"
          style={{ background: 'rgba(255,255,255,0.015)' }}
        >
          <div className="container-xl">
            <RevealSection className="text-center mb-16">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'var(--violet)' }}
              >
                Our Products
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Everything You Need to Trade
              </h2>
              <p
                className="text-lg max-w-[520px] mx-auto"
                style={{ color: 'var(--text-secondary)' }}
              >
                A complete suite of professional-grade tools for every type of
                trader.
              </p>
            </RevealSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {products.map((product, i) => (
                <RevealSection key={i} delay={i * 0.15}>
                  <Link to={product.href} className="block h-full group">
                    <motion.div
                      whileHover={{ scale: 1.04, y: -6 }}
                      whileTap={{ scale: 0.97 }}
                      className="h-full p-6 md:p-8 rounded-2xl relative overflow-hidden cursor-pointer transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${product.gradient.replace('from-', '').replace(' to-', ', ')})`,
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        border: `1px solid ${product.borderColor}`,
                        boxShadow: `0 4px 30px ${product.glowColor}`,
                      }}
                    >
                      {/* Animated scanline effect */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(rgba(255,255,255,0.02) 50%, transparent 50%)',
                          backgroundSize: '100% 4px',
                        }}
                        animate={{ y: [0, 100, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />

                      <div className="relative z-10">
                        {/* Badge with glow */}
                        <div className="flex items-start justify-between mb-5">
                          <motion.span
                            className="text-4xl"
                            style={{
                              filter: `drop-shadow(0 0 14px ${product.glowColor})`,
                            }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                          >
                            {product.icon}
                          </motion.span>
                          <motion.span
                            className="text-xs font-semibold px-3 py-1 rounded-full"
                            style={{
                              background: product.borderColor,
                              color: 'white',
                              border: `1px solid ${product.borderColor}`,
                            }}
                            whileHover={{ scale: 1.1 }}
                          >
                            {product.badge}
                          </motion.span>
                        </div>

                        <motion.h3
                          className="font-display text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-glow transition-colors"
                          animate={{ opacity: [0.9, 1, 0.9] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          {product.title}
                        </motion.h3>
                        <p
                          className="text-sm leading-relaxed mb-5"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {product.description}
                        </p>
                        <motion.div
                          className="flex items-center gap-2 text-sm font-semibold"
                          style={{ color: '#60a5fa' }}
                          animate={{ x: [0, 6, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Learn More
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          >
                            →
                          </motion.span>
                        </motion.div>
                      </div>
                    </motion.div>
                  </Link>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 5. AI BOT SECTION ══ */}
        <section className="section-padding">
          <div className="container-xl">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Chart GIF */}
              <RevealSection delay={0} className="w-full lg:w-[52%]">
                <div className="relative">
                  {/* Glow behind */}
                  <div
                    className="absolute inset-0 rounded-2xl blur-3xl opacity-30"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)',
                    }}
                  />
                  <motion.div
                    className="relative rounded-2xl overflow-hidden"
                    style={{ border: '1px solid rgba(59,130,246,0.25)' }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {/* Top bar */}
                    <div
                      className="flex items-center gap-2 px-4 py-3"
                      style={{
                        background: 'rgba(59,130,246,0.1)',
                        borderBottom: '1px solid rgba(59,130,246,0.15)',
                      }}
                    >
                      <span className="w-3 h-3 rounded-full bg-red-500/70" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <span className="w-3 h-3 rounded-full bg-green-500/70" />
                      <span
                        className="ml-3 text-xs"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        AI Bot — BTC/USDT Live
                      </span>
                      <span className="ml-auto text-xs text-green-400 font-semibold animate-pulse">
                        ● LIVE
                      </span>
                    </div>
                    <img
                      src={smallTradeChart}
                      className="w-full h-auto"
                      alt="AI Trading Bot Live Chart"
                      style={{ background: 'rgba(0,0,0,0.3)' }}
                    />
                  </motion.div>

                  {/* Floating badge */}
                  <motion.div
                    className="absolute -bottom-4 -right-4 px-4 py-3 rounded-xl text-sm font-semibold"
                    style={{
                      background: 'rgba(16,185,129,0.15)',
                      border: '1px solid rgba(16,185,129,0.3)',
                      color: '#6ee7b7',
                      backdropFilter: 'blur(12px)',
                    }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    ↑ +18.4% this month
                  </motion.div>
                </div>
              </RevealSection>

              {/* Text Content */}
              <RevealSection delay={0.2} className="w-full lg:w-[48%]">
                <p
                  className="text-sm font-semibold uppercase tracking-widest mb-4"
                  style={{ color: 'var(--cyan)' }}
                >
                  AI / Grid Bot
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Let Our AI Work{' '}
                  <span className="text-gradient-cyan">While You Sleep</span>
                </h2>
                <p
                  className="text-lg leading-relaxed mb-8"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Our AI trading bots analyze markets 24/7, execute perfect
                  trades with millisecond precision, and adapt strategies in
                  real-time. Set it once, profit continuously.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: '⚡', text: 'Millisecond execution' },
                    { icon: '🧠', text: 'Machine learning signals' },
                    { icon: '📊', text: 'Backtested strategies' },
                    { icon: '🔒', text: 'Risk management built-in' },
                  ].map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span className="text-lg">{f.icon}</span>
                      {f.text}
                    </div>
                  ))}
                </div>

                <Link to="/ai">
                  <button
                    className="btn-primary px-8 py-4"
                    style={{ borderRadius: '12px' }}
                  >
                    Activate AI Bot →
                  </button>
                </Link>
              </RevealSection>
            </div>
          </div>
        </section>

        {/* ══ 6. COPY TRADING SECTION ══ */}
        <section
          className="section-padding"
          style={{
            background: 'rgba(139,92,246,0.04)',
            borderTop: '1px solid var(--border)',
          }}
        >
          <div className="container-xl">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Text Side */}
              <RevealSection delay={0} className="w-full lg:w-[48%]">
                <p
                  className="text-sm font-semibold uppercase tracking-widest mb-4"
                  style={{ color: 'var(--violet)' }}
                >
                  Copy Trading
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Copy Elite Traders.{' '}
                  <span className="text-gradient">Earn Like a Pro.</span>
                </h2>
                <p
                  className="text-lg leading-relaxed mb-10"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Auto-replicate the positions of our top-ranked traders in
                  real-time. No experience needed — just select a trader and
                  watch your portfolio grow.
                </p>

                {/* Elite Trader Cards */}
                <div className="flex flex-col gap-3 mb-10">
                  {eliteTraders.map((trader, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.04, x: 8 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer group relative overflow-hidden"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        transition: 'all 0.25s ease',
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {/* Animated gradient background on hover */}
                      <motion.div
                        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100"
                        style={{
                          background: `linear-gradient(135deg, ${trader.color}15 0%, transparent 100%)`,
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Avatar with glow */}
                      <motion.div
                        className="w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
                        style={{
                          background: `${trader.color}22`,
                          border: `2px solid ${trader.color}55`,
                          color: trader.color,
                        }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        {trader.name[0]}
                      </motion.div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-bold text-white truncate">
                            {trader.name}
                          </span>
                          <motion.span
                            className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                            style={{
                              background: `${trader.color}18`,
                              color: trader.color,
                            }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          >
                            {trader.badge}
                          </motion.span>
                        </div>
                        <div
                          className="flex items-center gap-3 text-xs"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          <span>Win {trader.winRate}</span>
                          <span className="opacity-40">·</span>
                          <span>{trader.followers} followers</span>
                          <span className="opacity-40">·</span>
                          <span>{trader.tag}</span>
                        </div>
                      </div>

                      {/* ROI + Copy */}
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <motion.span
                          className="font-display text-base font-bold"
                          style={{ color: '#10b981' }}
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {trader.roi}
                        </motion.span>
                        <motion.button
                          className="text-xs px-3 py-1 rounded-lg font-semibold transition-all hover:scale-110"
                          style={{
                            background: 'rgba(139,92,246,0.2)',
                            border: '1px solid rgba(139,92,246,0.35)',
                            color: '#a78bfa',
                          }}
                          whileHover={{
                            scale: 1.15,
                            backgroundColor: 'rgba(139,92,246,0.4)',
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          Copy
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Link to="/copy-trading">
                  <button
                    className="px-8 py-4 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'rgba(139,92,246,0.15)',
                      border: '1px solid rgba(139,92,246,0.4)',
                      color: '#a78bfa',
                      fontSize: '15px',
                    }}
                  >
                    Explore Copy Trading →
                  </button>
                </Link>
              </RevealSection>

              {/* Chart Grid */}
              <RevealSection delay={0.2} className="w-full lg:w-[52%]">
                <div className="grid grid-cols-2 gap-3">
                  {chartImages.map((img, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.04, zIndex: 10 }}
                      className="rounded-xl overflow-hidden relative"
                      style={{
                        transform:
                          i % 2 !== 0 ? 'translateY(24px)' : 'translateY(0)',
                        border: '1px solid rgba(139,92,246,0.2)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                      }}
                      animate={{ y: i % 2 !== 0 ? [24, 14, 24] : [0, -8, 0] }}
                      transition={{
                        duration: 5 + i * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.3,
                      }}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover mix-blend-screen"
                      />
                    </motion.div>
                  ))}
                </div>
              </RevealSection>
            </div>
          </div>
        </section>

        {/* ══ 7. LIVE MARKET WIDGET ══ */}
        <section className="section-padding" id="market-widget">
          <div className="container-xl">
            <RevealSection className="text-center mb-12">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'var(--cyan)' }}
              >
                Live Markets
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Capture Every Opportunity
              </h2>
            </RevealSection>

            <RevealSection>
              <div
                className="rounded-2xl overflow-hidden relative"
                style={{
                  border: '1px solid var(--border)',
                  minHeight: '420px',
                }}
              >
                <iframe
                  height="420"
                  width="100%"
                  src="https://ssltvc.investing.com/?pair_ID=945629&height=420&width=1200&interval=3600&plotStyle=area&domain_ID=72&lang_ID=72&timezone_ID=0"
                  title="Live Market Chart"
                  style={{ border: 'none', display: 'block' }}
                />
                {/* CTA overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-5 px-6"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(6,9,20,0.95) 0%, transparent 100%)',
                  }}
                >
                  <Link to="/signup">
                    <button className="btn-primary px-8 py-3">
                      Start Trading This Chart →
                    </button>
                  </Link>
                </div>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ══ 8. HOW IT WORKS ══ */}
        <section
          className="section-padding"
          style={{
            background: 'rgba(255,255,255,0.015)',
            borderTop: '1px solid var(--border)',
          }}
        >
          <div className="container-xl">
            <RevealSection className="text-center mb-16">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'var(--gold)' }}
              >
                How It Works
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Get Started in Minutes
              </h2>
              <p
                className="text-lg max-w-[480px] mx-auto"
                style={{ color: 'var(--text-secondary)' }}
              >
                Three simple steps to begin your trading journey.
              </p>
            </RevealSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Connector line */}
              <div
                className="hidden md:block absolute top-14 left-1/4 right-1/4 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(139,92,246,0.4), transparent)',
                  marginLeft: '12.5%',
                  width: '75%',
                }}
              />

              {steps.map((s, i) => (
                <RevealSection key={i} delay={i * 0.15}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="p-8 rounded-2xl text-center relative"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {/* Step Number */}
                    <div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: s.color,
                        color: 'white',
                        boxShadow: `0 0 20px ${s.color}60`,
                      }}
                    >
                      {s.step}
                    </div>

                    <div
                      className="text-4xl mb-4 mt-2"
                      style={{ filter: `drop-shadow(0 0 12px ${s.color}60)` }}
                    >
                      {s.icon}
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-3">
                      {s.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {s.desc}
                    </p>
                  </motion.div>
                </RevealSection>
              ))}
            </div>

            <RevealSection delay={0.4} className="text-center mt-12">
              <Link to="/signup">
                <button
                  className="btn-primary px-10 py-4 text-base"
                  style={{ borderRadius: '14px' }}
                >
                  Create Free Account →
                </button>
              </Link>
            </RevealSection>
          </div>
        </section>

        {/* ══ 9. DEVICES SECTION ══ */}
        <section className="section-padding">
          <div className="container-xl">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <RevealSection delay={0} className="w-full lg:w-[50%]">
                <p
                  className="text-sm font-semibold uppercase tracking-widest mb-4"
                  style={{ color: 'var(--gold)' }}
                >
                  Mobile & Desktop
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Trade From Any Device,{' '}
                  <span className="text-gradient-gold">Anytime.</span>
                </h2>
                <p
                  className="text-lg leading-relaxed mb-8"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Seamless experience across all your devices. Your positions,
                  balances, and settings sync instantly — never miss a trade.
                </p>

                <div className="flex flex-col gap-3 mb-10">
                  {[
                    '🔐 Military-grade AES-256 encryption',
                    '📱 iOS & Android native apps',
                    '💻 Professional desktop interface',
                    '🔔 Real-time push notifications',
                  ].map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                        style={{
                          background: 'rgba(245,158,11,0.15)',
                          color: '#f59e0b',
                        }}
                      >
                        ✓
                      </div>
                      {f}
                    </div>
                  ))}
                </div>

                <Link to="/signup">
                  <button
                    className="btn-primary px-8 py-4"
                    style={{ borderRadius: '12px' }}
                  >
                    Register Now →
                  </button>
                </Link>
              </RevealSection>

              <RevealSection delay={0.2} className="w-full lg:w-[50%]">
                <motion.div
                  className="relative"
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl blur-3xl opacity-20"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(245,158,11,0.6) 0%, transparent 70%)',
                    }}
                  />
                  <img
                    src={laptopPhone}
                    alt="CoinbitDex on all devices"
                    className="w-full h-auto relative z-10 drop-shadow-2xl"
                  />
                </motion.div>
              </RevealSection>
            </div>
          </div>
        </section>

        {/* ══ 10. CTA BANNER ══ */}
        <section className="section-padding">
          <div className="container-xl">
            <RevealSection>
              <motion.div
                className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.12) 50%, rgba(6,182,212,0.08) 100%)',
                  border: `1px solid rgba(139,92,246,0.25)`,
                }}
                animate={{
                  boxShadow: [
                    '0 0 60px rgba(59,130,246,0.1)',
                    '0 0 100px rgba(139,92,246,0.2)',
                    '0 0 60px rgba(59,130,246,0.1)',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {/* Animated Orbs */}
                <motion.div
                  className="orb w-72 h-72 -top-20 -left-20 opacity-30"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(59,130,246,0.7) 0%, transparent 70%)',
                  }}
                  animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="orb w-72 h-72 -bottom-20 -right-20 opacity-25"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(139,92,246,0.7) 0%, transparent 70%)',
                  }}
                  animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.5,
                  }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="text-6xl mb-5 inline-block"
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    🎁
                  </motion.div>
                  <motion.h2
                    className="font-display text-4xl md:text-6xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    Claim Up to{' '}
                    <span className="text-gradient-gold">9,125 USDT</span>
                    <br />
                    in Welcome Bonuses
                  </motion.h2>
                  <motion.p
                    className="text-lg max-w-[520px] mx-auto mb-10"
                    style={{ color: 'var(--text-secondary)' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    New users get exclusive rewards. It only takes a few minutes
                    to register and claim your bonus.
                  </motion.p>
                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <Link to="/signup">
                      <motion.button
                        className="btn-primary px-10 py-4 text-lg"
                        style={{ borderRadius: '14px' }}
                        whileHover={{
                          scale: 1.08,
                          boxShadow: '0 20px 60px rgba(59,130,246,0.4)',
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Claim Bonus Now →
                      </motion.button>
                    </Link>
                    <Link to="/about">
                      <motion.button
                        className="btn-outline px-10 py-4 text-base"
                        style={{ borderRadius: '14px' }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </RevealSection>
          </div>
        </section>

        {/* ══ 11. GLOBAL PARTNERS ══ */}
        <section
          className="py-16"
          style={{
            borderTop: '1px solid var(--border)',
            background: 'rgba(255,255,255,0.01)',
          }}
        >
          <div className="container-xl">
            <RevealSection className="text-center mb-10">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'var(--text-muted)' }}
              >
                Trusted Partners
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                Our Global Partners
              </h2>
            </RevealSection>

            <RevealSection>
              <Marquee
                speed={35}
                gradient={false}
                pauseOnHover
                direction="left"
              >
                {[...partners, ...partners].map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center mx-6 px-8 py-5 rounded-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      minWidth: '140px',
                      height: '80px',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div className="opacity-50 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      {React.createElement(p.logo)}
                    </div>
                  </div>
                ))}
              </Marquee>
            </RevealSection>
          </div>
        </section>
      </main>
    </UnAuthLayout>
  );
};

export default Home;
