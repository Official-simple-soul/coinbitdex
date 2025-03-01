import { Button } from "@mantine/core";
import React from "react";
import { Link } from "react-scroll";

import { motion, AnimatePresence } from "framer-motion";
import { MenuButton } from "~/utils/Svgs";

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
        {isMenuOpen ? "" : <MenuButton />}
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* <motion.div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden"> */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.div
              className="fixed top-0 left-0 w-[80%] h-full bg-white shadow-md z-40 p-6 flex flex-col gap-5"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              {/* <div className="flex flex-col items-start p-4 space-y-4"> */}
              <button onClick={close} className="self-end text-gray-700">
                ✕
              </button>
              {[
                { label: "Home", href: "hero-section" },
                { label: "Crypto Markets", href: "info-section" },
                { label: "Copy Trading", href: "charts-section" },
                { label: "AI/Grid Bot", href: "card-section" },
                { label: "Buy Crypto", href: "getStarted-section" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onClick={close}
                >
                  {item.label}
                </Link>
              ))}

              {/* <Link onClick={close} to="/login">
                <Button
                  component="a"
                  href=""
                  variant="outline"
                  size="compact-md"
                >
                  Log in
                </Button>
              </Link>
              <Link onClick={close} to="/signup">
                <Button component="a" href="" variant="" size="compact-md">
                  Register
                </Button>
              </Link> */}

              <div className="flex flex-col gap-2 mt-4">
                <Button component="a" href="/login" variant="outline">
                  Log in
                </Button>
                <Button component="a" href="/signup" variant="filled">
                  Register
                </Button>
              </div>
              {/* </div> */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;

{
  /* <Link
to={"/"}
spy={true}
smooth={true}
offset={-70}
duration={500}
// onClick={() => setActive(item.label)}
// onSetActive={() => setActive(item.label)}
>
{" "}
Home
</Link>
<Link
to={"info-section"}
spy={true}
smooth={true}
offset={-70}
duration={500}
>
Crypto Markets
</Link>
<Link
to={"charts-section"}
spy={true}
smooth={true}
offset={-70}
duration={500}
>
{" "}
Copy Trading
</Link>
<Link
to={"card-section"}
spy={true}
smooth={true}
offset={-70}
duration={500}
>
{" "}
AI/Grid Bot
</Link>
<Link
to={"getStarted-section"}
spy={true}
smooth={true}
offset={-70}
duration={500}
>
{" "}
Buy Crypto
</Link> */
}
