import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { motion } from 'framer-motion';
import MobileNav from './MobileNav';

type NavItem = {
  id: number;
  label: string;
  href: string;
};

export const navigationData: NavItem[] = [
  { id: 1, label: 'Home', href: '/' },
  { id: 2, label: 'Crypto Markets', href: '/crypto-market' },
  { id: 3, label: 'Copy Trading', href: '/copy-trading' },
  { id: 4, label: 'AI/Grid Bot', href: '/ai' },
  { id: 5, label: 'Buy Crypto', href: '/buy-crypto' },
];

const NavOne: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const close = () => setIsMenuOpen(false);

  const handleChangeLanguageVisibility = () => {
    close();
    const google_box = document.getElementById('google-box');
    if (google_box) {
      google_box.style.display =
        google_box.style.display === '' || google_box.style.display === 'none'
          ? 'block'
          : 'none';
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex items-center justify-between px-4 py-3 mx-auto w-[95%] max-w-[1240px]"
    >
      {/* Logo */}
      <Link to="/" onClick={close} className="group flex items-center">
        <div className="relative rounded-2xl px-3 py-2 transition-all duration-300 group-hover:-translate-y-0.5">
          <div
            className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: 'rgba(59, 130, 246, 0.25)' }}
          />
          <div className="relative z-10 flex flex-col leading-none">
            <span
              className="font-display text-base md:text-lg font-bold tracking-wide"
              style={{
                background:
                  'linear-gradient(135deg, #93c5fd 0%, #60a5fa 45%, #22d3ee 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              COINBITDEX
            </span>
            <span
              className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase mt-1"
              style={{ color: 'rgba(203, 213, 225, 0.78)' }}
            >
              Trade Smarter
            </span>
          </div>
        </div>
      </Link>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex items-center gap-1">
        {navigationData.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                isActive
                  ? 'px-4 py-2 rounded-lg text-sm font-medium relative text-blue-400 bg-blue-500/10'
                  : 'px-4 py-2 rounded-lg text-sm font-medium text-[#8b9dc3] hover:text-white hover:bg-white/5 transition-all duration-200'
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: 'var(--grad-primary)' }}
                    />
                  )}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-3">
        <button
          className="text-sm text-[#8b9dc3] hover:text-white transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/5"
          onClick={handleChangeLanguageVisibility}
        >
          🌐 Language
        </button>
        <Link to="/login">
          <button className="btn-outline text-sm px-5 py-2">Log in</button>
        </Link>
        <Link to="/signup">
          <button className="btn-primary text-sm px-5 py-2">Get Started</button>
        </Link>
      </div>

      {/* Mobile */}
      <MobileNav
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        close={close}
        handleChangeLanguageVisibility={handleChangeLanguageVisibility}
      />
    </motion.nav>
  );
};

export default NavOne;
