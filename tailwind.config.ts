import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  // content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   'priGray': "#131722"
      // },

      backgroundImage: {
        "hero-bg": "url('/images/background.avif')",
        "auth-bg": "url('/images/authBg.jpeg')",
      },

      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      // backgroundImage: {
      //   'auth-bg': "url('/images/authBg.jpeg')",
      // },
    },
  },
  plugins: [],
} satisfies Config;
