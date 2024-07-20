import { type ComponentPropsWithoutRef } from 'react';

export interface SpinnerProps extends ComponentPropsWithoutRef<'svg'> {
  screenReaderText?: string | boolean;
}
