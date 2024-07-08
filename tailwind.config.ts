import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{jsx,tsx}',
    './components/**/*.{jsx,tsx}',
    './app/**/*.{jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        pop: `var(--ul-shadow-pop)`,
      },
    },
  },
};

export default config;
