import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config';

const twConfig = resolveConfig(tailwindConfig);
const twMerge = extendTailwindMerge<'text-shadow' | 'text-shadow-color'>({
  extend: {
    classGroups: {
      'text-shadow': ['text-shadow'],
      'text-shadow-color': Object.keys(twConfig.theme.colors).map(
        key => `text-shadow-${key}`,
      ),
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
