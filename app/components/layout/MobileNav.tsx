import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router';
import { navigationData } from './Nav';

interface MobileNavProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  close: () => void;
  handleChangeLanguageVisibility: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  isMenuOpen,
  toggleMenu,
  close,
  handleChangeLanguageVisibility,
}) => {
  return (
    <div className="md:hidden relative">
      {/* Hamburger */}
      <button
        onClick={toggleMenu}
        className="w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg transition-all duration-200"
        style={{
          background: 'rgba(6, 9, 20, 0.92)',
          border: '1px solid rgba(255,255,255,0.14)',
        }}
        aria-label="Toggle menu"
      >
        <motion.span
          animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className="block w-4.5 h-0.5 rounded-full bg-white"
          style={{
            width: '18px',
            height: '2px',
            borderRadius: '2px',
            background: 'white',
          }}
        />
        <motion.span
          animate={isMenuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="block rounded-full bg-white"
          style={{
            width: '14px',
            height: '2px',
            borderRadius: '2px',
            background: 'rgba(255,255,255,0.6)',
          }}
        />
        <motion.span
          animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className="block rounded-full bg-white"
          style={{
            width: '18px',
            height: '2px',
            borderRadius: '2px',
            background: 'white',
          }}
        />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-[70]"
              style={{
                background: 'rgba(6, 9, 20, 0.84)',
                backdropFilter: 'blur(10px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 w-[80%] max-w-[320px] h-full z-[80] flex flex-col p-6"
              style={{
                background: 'rgba(10, 15, 30, 1)',
                backdropFilter: 'blur(14px)',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '-12px 0 40px rgba(0, 0, 0, 0.45)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col leading-none">
                  <span
                    className="font-display text-base font-bold tracking-wide"
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
                    className="text-[10px] font-medium tracking-[0.18em] uppercase mt-1"
                    style={{ color: 'rgba(203, 213, 225, 0.78)' }}
                  >
                    Trade Smarter
                  </span>
                </div>
                <button
                  onClick={close}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[#8b9dc3] hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  ✕
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-1 flex-1">
                {navigationData.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 + 0.1 }}
                  >
                    <NavLink
                      to={item.href}
                      onClick={close}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                            : 'text-[#8b9dc3] hover:text-white hover:bg-white/5'
                        }`
                      }
                      style={{
                        background: 'rgba(5, 2, 24, 0.98)',
                        border: '1px solid rgba(255, 255, 255, 0.29)',
                      }}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom Actions */}
              <motion.div
                className="flex flex-col gap-3 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <button
                  onClick={handleChangeLanguageVisibility}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-[#8b9dc3] hover:text-white transition-colors"
                  style={{
                    background: 'rgba(5, 2, 24, 0.98)',
                    border: '1px solid rgba(255, 255, 255, 0.29)',
                  }}
                >
                  🌐 Change Language
                </button>
                <Link onClick={close} to="/login">
                  <button
                    className="w-full btn-outline text-sm py-3"
                    style={{
                      background: 'rgba(5, 2, 24, 0.98)',
                      border: '1px solid rgba(255, 255, 255, 0.29)',
                    }}
                  >
                    Log in
                  </button>
                </Link>
                <Link onClick={close} to="/signup">
                  <button
                    className="w-full btn-primary text-sm py-3"
                    style={{
                      background: 'rgba(83, 63, 214, 0.98)',
                      border: '1px solid rgba(255, 255, 255, 0.29)',
                    }}
                  >
                    Get Started Free
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
