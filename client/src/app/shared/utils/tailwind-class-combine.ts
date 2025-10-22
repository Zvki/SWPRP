import {ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export const tailwindClassCombine = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}
