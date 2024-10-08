import {
  type Dispatch,
  type InputHTMLAttributes,
  type JSX,
  type PropsWithChildren,
  type RefObject,
  type SetStateAction,
} from 'react';
import { type DragHandlers, type HTMLMotionProps } from 'framer-motion';
import { type TabsContentProps } from '@radix-ui/react-tabs';

export interface DynamicBuyButtonContextProps {
  ccv: string;
  handleOpen: () => void;
  inputRef: RefObject<HTMLInputElement>;
  loading: boolean;
  open: boolean;
  overflow: boolean;
  selectedTab: string;
  setCcv: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setOverflow: Dispatch<SetStateAction<boolean>>;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  setSwitchCard: Dispatch<SetStateAction<boolean>>;
  success: boolean;
  switchCard: boolean;
  tabInitialAnim: boolean;
}

export interface ButtonProps {
  icon: JSX.Element;
}

export interface ContentProps extends PropsWithChildren {}

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  index: number;
  onDragEndOffset: DragHandlers['onDragEnd'];
  variant?: 'visa' | 'mastercard';
}

export interface CardInnerProps {
  front: boolean;
}

export interface TabContentProps extends TabsContentProps {}

export interface PayButtonProps {
  className?: string | undefined;
}

export interface PaymentMethodProps
  extends Pick<InputHTMLAttributes<HTMLInputElement>, 'checked'> {
  variant:
    | 'googlePay'
    | 'applePay'
    | 'paypal'
    | 'cashApp'
    | 'klarna'
    | 'amazonPay';
}
