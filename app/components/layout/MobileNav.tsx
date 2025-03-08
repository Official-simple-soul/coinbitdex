import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

import { motion, AnimatePresence } from 'framer-motion';
import { MenuButton } from '~/utils/Svgs';
import { Link, NavLink } from 'react-router';
import { navigationData } from './Nav';

interface MobileNavProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  close: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  isMenuOpen,
  toggleMenu,
  close,
}) => {
  return (
    <div className="md:hidden relative">
      <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
        {isMenuOpen ? '' : <MenuButton />}
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.div
              className="fixed top-0 left-0 w-[80%] h-full bg-white shadow-md z-40 p-6 flex flex-col gap-5"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            >
              <button onClick={close} className="self-end text-gray-700">
                ✕
              </button>
              {navigationData.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.href}
                  className="text-black font-normal"
                  onClick={close}
                >
                  {item.label}
                </NavLink>
              ))}

              <Link
                onClick={close}
                to="/login"
                className="border border-blue-400 rounded bg-transparent text-blue-400 text-center py-1.5 mt-4"
              >
                Log in
              </Link>
              <Link
                onClick={close}
                to="/signup"
                className="bg-blue-400 rounded text-white text-center py-1.5"
              >
                Register
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
