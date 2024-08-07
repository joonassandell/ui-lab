import {
  AmazonPay,
  ApplePay,
  CashApp,
  GooglePay,
  Klarna,
  Paypal,
} from '@/components/Logo';
import { cn } from '@/lib/utils';
import { type PaymentMethodProps } from '../';

export const PaymentMethod = ({ checked, variant }: PaymentMethodProps) => {
  return (
    <div>
      <input
        className={cn('u-peer u-sr-only')}
        defaultChecked={checked}
        id={variant}
        name="payment-method"
        type="radio"
      />
      <label
        className={cn(
          'u-flex u-h-12 u-items-center u-justify-between u-rounded-lg u-border u-px-3 u-transition-colors active:u-scale-[0.98] xs:u-px-4',
          'u-border-zinc-200 u-bg-zinc-200/60 hover:u-border-zinc-200 hover:u-text-sky-700 peer-checked:u-border-blue-200 peer-checked:u-bg-sky-100 peer-checked:u-text-sky-700',
          'dark:u-border-zinc-800 dark:u-bg-zinc-800/50 dark:hover:u-border-zinc-700/40 dark:hover:u-text-sky-400 dark:peer-checked:u-border-sky-900 dark:peer-checked:u-bg-sky-950/70 dark:peer-checked:u-text-sky-400',
        )}
        htmlFor={variant}
      >
        {variant === 'googlePay' && (
          <>
            <p className={cn('u-truncate u-text-xs xs:u-text-sm')}>
              Google Pay
            </p>
            <GooglePay className={cn('u-h-5')} />
          </>
        )}
        {variant === 'applePay' && (
          <>
            <p className={cn('u-truncate u-text-xs xs:u-text-sm')}>Apple Pay</p>
            <ApplePay className={cn('u-relative u-top-[2px] u-h-5')} />
          </>
        )}
        {variant === 'paypal' && (
          <>
            <p className={cn('u-truncate u-text-xs xs:u-text-sm')}>PayPal</p>
            <Paypal className={cn('u-size-4')} />
          </>
        )}
        {variant === 'cashApp' && (
          <>
            <p className={cn('u-truncate u-text-xs xs:u-text-sm')}>Cash App</p>
            <CashApp className={cn('u-size-4')} />
          </>
        )}
        {variant === 'klarna' && (
          <>
            <p className={cn('u-truncate u-text-xs xs:u-text-sm')}>Klarna</p>
            <Klarna className={cn('u-size-4')} />
          </>
        )}
        {variant === 'amazonPay' && (
          <>
            <p className={cn('u-truncate u-text-xs xs:u-text-sm')}>
              Amazon Pay
            </p>
            <AmazonPay className={cn('u-h-6')} />
          </>
        )}
      </label>
    </div>
  );
};
