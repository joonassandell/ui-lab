import { type CardProps } from './types';

export const CARDS: {
  id: number;
  variant: CardProps['variant'];
}[] = [
  { id: 1, variant: 'visa' },
  { id: 2, variant: 'mastercard' },
];

export const TABS = [{ label: 'Credit Card' }, { label: 'Other Methods' }];
