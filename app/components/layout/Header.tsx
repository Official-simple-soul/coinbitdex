import React, { useState } from "react";
import NavOne from "./Nav";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <header className="sticky top-0 shadow-md h-auto text-black font-semibold z-50 bg-white">
      <NavOne />
    </header>
  );
};

export default Header;
