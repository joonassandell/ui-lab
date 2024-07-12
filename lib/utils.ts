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

/**
 * @link https://github.com/granteagon/move/blob/master/src/index.js
 */
export const move = (array: any[], moveIndex: number, toIndex: number) => {
  const item = array[moveIndex];
  const length = array.length;
  const diff = moveIndex - toIndex;

  if (diff > 0) {
    return [
      ...array.slice(0, toIndex),
      item,
      ...array.slice(toIndex, moveIndex),
      ...array.slice(moveIndex + 1, length),
    ];
  } else if (diff < 0) {
    const targetIndex = toIndex + 1;
    return [
      ...array.slice(0, moveIndex),
      ...array.slice(moveIndex + 1, targetIndex),
      item,
      ...array.slice(targetIndex, length),
    ];
  }

  return array;
};
