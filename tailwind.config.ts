import { type Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{jsx,tsx}',
    './components/**/*.{jsx,tsx}',
    './app/**/*.{jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        pop: 'var(--ul-shadow-pop)',
      },
      fontFamily: {
        cc: ['CC font'],
      },
      fontSize: {
        '2xs': ['10px', '20px'],
      },
    },
  },
};

export default config;
