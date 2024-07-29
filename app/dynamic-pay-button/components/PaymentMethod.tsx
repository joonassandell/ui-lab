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
        className={cn('ul-peer ul-hidden')}
        defaultChecked={checked}
        id={variant}
        name="payment-method"
        type="radio"
      />
      <label
        className={cn(
          'ul-flex ul-h-12 ul-items-center ul-justify-between ul-rounded-lg ul-border ul-px-3 ul-transition-colors active:ul-scale-[0.98] sm:ul-px-4',
          'ul-border-zinc-200 ul-bg-zinc-200/60 hover:ul-border-zinc-200 hover:ul-text-sky-700 peer-checked:ul-border-blue-200 peer-checked:ul-bg-sky-100 peer-checked:ul-text-sky-700',
          'dark:ul-border-zinc-800 dark:ul-bg-zinc-800/50 dark:hover:ul-border-zinc-700/40 dark:hover:ul-text-sky-400 dark:peer-checked:ul-border-sky-900 dark:peer-checked:ul-bg-sky-950/70 dark:peer-checked:ul-text-sky-400',
        )}
        htmlFor={variant}
      >
        {variant === 'googlePay' && (
          <>
            <p className={cn('ul-truncate ul-text-xs sm:ul-text-sm')}>
              Google Pay
            </p>
            <GooglePay className={cn('ul-h-5')} />
          </>
        )}
        {variant === 'applePay' && (
          <>
            <p className={cn('ul-truncate ul-text-xs sm:ul-text-sm')}>
              Apple Pay
            </p>
            <ApplePay className={cn('ul-relative ul-top-[2px] ul-h-5')} />
          </>
        )}
        {variant === 'paypal' && (
          <>
            <p className={cn('ul-truncate ul-text-xs sm:ul-text-sm')}>PayPal</p>
            <Paypal className={cn('ul-size-4')} />
          </>
        )}
        {variant === 'cashApp' && (
          <>
            <p className={cn('ul-truncate ul-text-xs sm:ul-text-sm')}>
              Cash App
            </p>
            <CashApp className={cn('ul-size-4')} />
          </>
        )}
        {variant === 'klarna' && (
          <>
            <p className={cn('ul-truncate ul-text-xs sm:ul-text-sm')}>Klarna</p>
            <Klarna className={cn('ul-size-4')} />
          </>
        )}
        {variant === 'amazonPay' && (
          <>
            <p className={cn('ul-truncate ul-text-xs sm:ul-text-sm')}>
              Amazon Pay
            </p>
            <AmazonPay className={cn('ul-h-6')} />
          </>
        )}
      </label>
    </div>
  );
};
