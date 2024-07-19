import { type Dispatch, type SetStateAction } from 'react';
import { type HTMLMotionProps } from 'framer-motion';

export interface CardProps
  extends Omit<HTMLMotionProps<'div'>, 'children'>,
    Pick<CardsProps, 'ccv' | 'setCcv' | 'setOverflow' | 'overflow'> {
  index: number;
  variant?: 'visa' | 'mastercard';
}

export interface CardInnerProps
  extends Omit<CardProps, 'index' | 'overflow' | 'setOverflow'> {}

export interface CardsProps {
  ccv: string;
  overflow: boolean;
  setCcv: Dispatch<SetStateAction<string>>;
  setOverflow: Dispatch<SetStateAction<boolean>>;
  setSwitchCard: Dispatch<SetStateAction<boolean>>;
  switchCard?: boolean;
}
