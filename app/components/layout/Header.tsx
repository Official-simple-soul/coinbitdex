import React from 'react';
import Nav from './Nav';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 sticky top-0 shadow-md h-16 text-black font-semibold">
      <h1>My Website</h1>
      <Nav />
    </header>
  );
};

export default Header;
