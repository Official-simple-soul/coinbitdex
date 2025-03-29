import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Button, type MantineTheme } from '@mantine/core';
import MobileNav from './MobileNav';
import logo from '/images/logo.avif';

type NavItem = {
  id: number;
  label: string;
  href: string;
};

export const navigationData: NavItem[] = [
  { id: 1, label: 'Home', href: '/' },
  {
    id: 2,
    label: 'Crypto Markets',
    href: '/crypto-market',
  },
  {
    id: 3,
    label: 'Copy Trading',
    href: '/copy-trading',
  },
  { id: 4, label: 'AI/Grid Bot', href: '/ai' },
  {
    id: 5,
    label: 'Buy Crypto',
    href: '/buy-crypto',
  },
];

const NavOne: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const close = () => setIsMenuOpen(false);

  const handleChangeLanguageVisibility = () => {
    close();
    const google_box = document.getElementById('google-box');
    console.log('box', google_box);
    if (google_box) {
      google_box.style.display =
        google_box.style.display === 'none' ? 'block' : 'none';
    }
  };

  return (
    <nav className="flex items-center justify-between px-2 py-2 mx-auto w-[95%] md:w-[88%] lg:w-[90%] xl:w-[70%] max-w-[1300px]">
      <div className="flex justify-between items-center w-full">
        <img
          src={logo}
          onClick={close}
          alt="Logo"
          className="-ml-8 h-10 md:h-12"
        />
        <ul className="hidden md:flex items-center gap-5 overflow-y-hidden overflow-x-auto mr-4 h-12">
          {navigationData.map((item) => (
            <li key={item.id} className="whitespace-nowrap">
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  isActive
                    ? 'px-3 py-2 bg-blue-500 rounded-md text-white font-normal text-sm'
                    : 'text-black font-normal text-sm'
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <ul className="hidden md:flex justify-between items-center gap-1">
          <button
            className="w-full text-left text-sm font-normal underline mr-2"
            onClick={handleChangeLanguageVisibility}
          >
            Change Language
          </button>
          <li className="whitespace-nowrap">
            <Link to={'/login'}>
              <Button component="a" type="button" variant="outline">
                Log in
              </Button>
            </Link>
          </li>
          <li className="whitespace-nowrap">
            <Link to={'/signup'}>
              <Button component="a" type="button" variant="">
                Register
              </Button>
            </Link>
          </li>
        </ul>

        <MobileNav
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          close={close}
          handleChangeLanguageVisibility={handleChangeLanguageVisibility}
        />
      </div>
    </nav>
  );
};

export default NavOne;
