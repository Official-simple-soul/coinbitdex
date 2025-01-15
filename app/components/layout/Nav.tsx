import React from 'react';

const Nav = () => {
  return (
    <nav>
      <ul className="flex items-center space-x-5">
        {navigationData.map((item) => (
          <li key={item.id}>
            <a href={item.path}>{item.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;

// navigations data
const navigationData = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'About', path: '/about' },
  { id: 3, title: 'Contact', path: '/contact' },
];
