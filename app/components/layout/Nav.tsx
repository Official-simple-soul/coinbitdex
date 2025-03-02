import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router';
import { Button, type MantineTheme } from '@mantine/core';
import MobileNav from './MobileNav';
import logo from '/images/logo.avif';

type NavItem = {
  id: number;
  label: string;
  href: string;
};

// navigations data
const navigationData: NavItem[] = [
  { id: 1, label: 'Home', href: 'hero-section' },
  {
    id: 2,
    label: 'Crypto Markets',
    href: 'info-section',
  },
  {
    id: 3,
    label: 'Copy Trading',
    href: 'charts-section',
  },
  { id: 4, label: 'AI/Grid Bot', href: 'card-section' },
  {
    id: 5,
    label: 'Buy Crypto',
    href: 'getStarted-section',
  },
  // { id: 6, label: "More", href: "#", variant: "light" },
];

const NavOne: React.FC = () => {
  const [active, setActive] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const close = () => setIsMenuOpen(false);

  return (
    <nav className="flex items-center justify-between px-2 py-2 mx-auto w-[95%] md:w-[88%] lg:w-[90%] xl:w-[70%] max-w-[1300px]">
      <div className="flex justify-between items-center w-full">
        <img src={logo} onClick={close} alt="Logo" className="-ml-8 h-12" />

        <ul className="hidden md:flex flex-wrap items-center gap-0.5">
          {navigationData.map((item) => (
            <li key={item.id} className="whitespace-nowrap">
              <ScrollLink
                to={item.href}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                // onClick={() => setActive(item.label)}
                onSetActive={() => setActive(item.label)}
              >
                <Button
                  variant="unstyled"
                  size="compact-md"
                  // color={active === item.label ? "blue" : "gray"}
                  // onClick={() => setActive(item.label)}
                  styles={(theme: MantineTheme) => ({
                    root: {
                      fontSize: theme.fontSizes.xs,
                      fontWeight: active === item.label ? 900 : 400,
                      backgroundColor:
                        active === item.label
                          ? theme.colors.blue[6]
                          : 'transparent',
                      color: active === item.label ? theme.white : theme.black,
                      padding: '2px 12px',
                      borderRadius: theme.radius.sm,
                      transition: 'background-color 0.2s ease, color 0.2s ease',
                      // "&:hover": {
                      //   backgroundColor: theme.colors.red[6],
                      //   color: theme.white,
                      // },
                      '&:hover': {
                        backgroundColor: `${theme.colors.blue[6]} !important`,
                        color: `${theme.white} !important`,
                      },
                    },
                  })}
                >
                  {item.label}
                </Button>
              </ScrollLink>
            </li>
          ))}
        </ul>

        <ul className="hidden md:flex justify-between items-center gap-1">
          <li className="whitespace-nowrap">
            <Link to={'/signup'}>
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
        />
      </div>
    </nav>
  );
};

// export const NavTwo = () => {
//   return (
//     <nav>
//       <ul className="flex justify-between items-center gap-1">
//         <li className="whitespace-nowrap">
//           <Button component="a" href="" variant="outline">
//             Log in
//           </Button>
//         </li>
//         <li className="whitespace-nowrap">
//           <Button component="a" href="" variant="">
//             Register
//           </Button>
//         </li>
//       </ul>
//     </nav>
//   );
// };

export default NavOne;

// {
//   isMobile ? (
//     <Button>Menu</Button>
//   ) : (
//     <div>
//       <Button
//         component={Link}
//         to="/"
//         // variant="light"
//         className="text-black"
//       >
//         Home
//       </Button>
//       <Link to={"#"}>
//         <Button variant="light" className="text-black">
//           Crypto Markets
//         </Button>
//       </Link>
//       <Link to={"#"}>
//         <Button variant="light" className="text-black">
//           Copy Trading
//         </Button>
//       </Link>
//       <Link to={"#"}>
//         <Button variant="light" className="text-black">
//           AI/Grid Bot
//         </Button>
//       </Link>
//       <Link to={"#"}>
//         <Button variant="light" className="text-black">
//           Buy Crypto
//         </Button>
//       </Link>
//       <Link to={"#"}>
//         <Button variant="light" className="text-black">
//           More
//         </Button>
//       </Link>
//       <Link to={"#"}>
//         <Button className="text-black">Register</Button>
//       </Link>
//     </div>
//   );
// }
