import { type Dispatch, type SetStateAction } from 'react';
import { type HTMLMotionProps } from 'framer-motion';

export interface CardProps
  extends Omit<HTMLMotionProps<'div'>, 'children'>,
    Pick<CardsProps, 'ccv' | 'setCcv'> {
  index: number;
  variant?: 'visa' | 'mastercard';
}

export interface CardInnerProps extends Omit<CardProps, 'index'> {}

export interface CardsProps {
  ccv: string;
  setCcv: Dispatch<SetStateAction<string>>;
  setSwitchCard: Dispatch<SetStateAction<boolean>>;
  switchCard?: boolean;
}
