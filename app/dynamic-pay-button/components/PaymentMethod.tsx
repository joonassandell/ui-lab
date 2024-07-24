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
          'ul-flex ul-h-12 ul-items-center ul-justify-between ul-gap-3 ul-rounded-lg ul-border ul-px-4 ul-transition-colors active:ul-scale-[0.98]',
          'ul-border-zinc-200 ul-bg-zinc-200/60 hover:ul-border-zinc-200 hover:ul-text-sky-700 peer-checked:ul-border-blue-200 peer-checked:ul-bg-sky-100 peer-checked:ul-text-sky-700',
          'dark:ul-border-zinc-800 dark:ul-bg-zinc-800/50 dark:hover:ul-border-zinc-700/40 dark:hover:ul-text-sky-400 dark:peer-checked:ul-border-sky-900 dark:peer-checked:ul-bg-sky-950/70 dark:peer-checked:ul-text-sky-400',
        )}
        htmlFor={variant}
      >
        {variant === 'googlePay' && (
          <>
            <div>Google Pay</div>
            <GooglePay className={cn('ul-h-5')} />
          </>
        )}
        {variant === 'applePay' && (
          <>
            <div>Apple Pay</div>
            <ApplePay className={cn('ul-relative ul-top-[2px] ul-h-5')} />
          </>
        )}
        {variant === 'paypal' && (
          <>
            <div>PayPal</div>
            <Paypal className={cn('ul-size-4')} />
          </>
        )}
        {variant === 'cashApp' && (
          <>
            <div>Cash App</div>
            <CashApp className={cn('ul-size-4')} />
          </>
        )}
        {variant === 'klarna' && (
          <>
            <div>Klarna</div>
            <Klarna className={cn('ul-size-4')} />
          </>
        )}
        {variant === 'amazonPay' && (
          <>
            <div>Amazon Pay</div>
            <AmazonPay className={cn('ul-h-6')} />
          </>
        )}
      </label>
    </div>
  );
};
