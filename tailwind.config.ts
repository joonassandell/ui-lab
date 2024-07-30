import { type Config } from 'tailwindcss';
import { parseColor } from 'tailwindcss/lib/util/color';
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './pages/**/*.{jsx,tsx}',
    './components/**/*.{jsx,tsx}',
    './app/**/*.{jsx,tsx}',
  ],
  darkMode: 'selector',
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': value => ({ textShadow: value }),
        },
        { values: theme('textShadow') },
      );
      matchUtilities(
        {
          'text-shadow': value => {
            const { alpha, color } = parseColor(value);

            return {
              '--tw-text-shadow': `rgb(${color[0]} ${color[1]} ${color[2]}${alpha ? ' / ' + alpha : ''})`,
            };
          },
        },
        { type: 'color', values: flattenColorPalette(theme('colors')) },
      );
    }),
  ],
  prefix: 'u-',
  theme: {
    extend: {
      boxShadow: {
        pop: 'var(--u-shadow-pop-md)',
        'pop-md': 'var(--u-shadow-pop-md)',
        'pop-sm': 'var(--u-shadow-pop-sm)',
      },
      fontFamily: {
        cc: ['CC font'],
      },
      fontSize: {
        '2xs': ['0.625rem', '1.25rem'],
      },
      textShadow: {
        DEFAULT: '0 1px 1px var(--tw-text-shadow)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
} satisfies Config;
