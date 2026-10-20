import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: { classGroups: { 'text-shadow': ['text-shadow'] } },
  prefix: 'u',
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

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

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const rem = (rem: number) =>
  rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
