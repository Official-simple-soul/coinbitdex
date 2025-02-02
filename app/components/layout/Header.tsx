import React, { useState } from "react";
import { NavOne, NavTwo } from "./Nav";

import logo from "/images/logo.avif";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <header className="sticky top-0 shadow-md h-auto text-black font-semibold z-50 bg-white">
      {/* <h1>My Website</h1> */}
      <div className="flex items-center justify-between px-2 py-2  mx-auto w-[90%] lg:w-[90%] xl:w-[70%] max-w-[1300px]">
        <img src={logo} alt="Logo" className="-ml-8 h-12" />
        <NavOne />
        <NavTwo />
      </div>
    </header>
  );
};

export default Header;
