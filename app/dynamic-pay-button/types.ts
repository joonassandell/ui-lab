import {
  type ComponentPropsWithRef,
  type Dispatch,
  type JSX,
  type SetStateAction,
} from 'react';
import { type HTMLMotionProps } from 'framer-motion';

export interface DynamicBuyButtonContextProps {
  ccv: string;
  handleOpen: () => void;
  open: boolean;
  overflow: boolean;
  selectedTab: string;
  setCcv: Dispatch<SetStateAction<string>>;
  setOverflow: Dispatch<SetStateAction<boolean>>;
  setSwitchCard: Dispatch<SetStateAction<boolean>>;
  switchCard: boolean;
}

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  icon: JSX.Element;
}

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  index: number;
  variant?: 'visa' | 'mastercard';
}

export interface CardInnerProps {
  front: boolean;
}
