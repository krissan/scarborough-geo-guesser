import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontSize: {
      xs: ['10px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['32px', '40px'],
    },
    colors: {
      'white': '#fffbf2',
      'orange': '#ed7f1a',
      'black': '#1b1b1b',
      'blue': '#3366CC',
      'darkBlue': '#0067db',
      'green':'#56aa55',
      'red': '#f87060',
      'gray': '#E5E1D9',
      'darkGray': '#757472',
      'darkPurple': '#8F4B9B',
      'purple': '#D8BADE'
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'], // Add Poppins as the default sans font
    },
    extend: {
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
      },
    }
  },
  plugins: [],
};
export default config;
