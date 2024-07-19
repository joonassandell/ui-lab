import { type Dispatch, type SetStateAction } from 'react';
import { type HTMLMotionProps } from 'framer-motion';

export interface DynamicBuyButtonContextProps {
  ccv: string;
  overflow: boolean;
  setCcv: Dispatch<SetStateAction<string>>;
  setOverflow: Dispatch<SetStateAction<boolean>>;
  setSwitchCard: Dispatch<SetStateAction<boolean>>;
  switchCard?: boolean;
}

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  index: number;
  variant?: 'visa' | 'mastercard';
}

export interface CardInnerProps {
  front: boolean;
}
