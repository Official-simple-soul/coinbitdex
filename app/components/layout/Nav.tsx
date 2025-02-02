import React, { useState } from "react";
import { Link } from "react-scroll";
import { Button, type MantineTheme } from "@mantine/core";

export const NavOne = () => {
  const [active, setActive] = useState("Home");

  return (
    <nav>
      <ul className="flex flex-wrap items-center gap-0.5">
        {navigationData.map((item) => (
          <li key={item.id} className="whitespace-nowrap">
            <Link
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
                        : "transparent",
                    color: active === item.label ? theme.white : theme.black,
                    padding: "2px 12px",
                    borderRadius: theme.radius.sm,
                    transition: "background-color 0.2s ease, color 0.2s ease",
                    // "&:hover": {
                    //   backgroundColor: theme.colors.red[6],
                    //   color: theme.white,
                    // },
                    "&:hover": {
                      backgroundColor: `${theme.colors.blue[6]} !important`,
                      color: `${theme.white} !important`,
                    },
                  },
                })}
              >
                {item.label}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const NavTwo = () => {
  return (
    <nav>
      <ul className="flex justify-between items-center gap-1">
        <li className="whitespace-nowrap">
          <Button component="a" href="" variant="outline">
            Log in
          </Button>
        </li>
        <li className="whitespace-nowrap">
          <Button component="a" href="" variant="">
            Register
          </Button>
        </li>
      </ul>
    </nav>
  );
};


// navigations data
const navigationData = [
  { id: 1, label: "Home", href: "hero-section", variant: "unstyled" },
  {
    id: 2,
    label: "Crypto Markets",
    href: "info-section",
    variant: "unstyled",
  },
  {
    id: 3,
    label: "Copy Trading",
    href: "charts-section",
    variant: "unstyled",
  },
  { id: 4, label: "AI/Grid Bot", href: "card-section", variant: "unstyled" },
  {
    id: 5,
    label: "Buy Crypto",
    href: "getStarted-section",
    variant: "unstyled",
  },
  // { id: 6, label: "More", href: "#", variant: "light" },
];

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

