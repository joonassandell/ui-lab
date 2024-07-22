import {
  AmazonPay,
  ApplePay,
  CashApp,
  GooglePay,
  Klarna,
  Paypal,
} from '@/components/Logo';
import { cn } from '@/lib/utils';
import { type PaymentMethodProps } from './';

export const PaymentMethod = ({ checked, variant }: PaymentMethodProps) => {
  return (
    <div>
      <input
        className={cn('peer hidden')}
        defaultChecked={checked}
        id={variant}
        name="payment-method"
        type="radio"
      />
      <label
        className={cn(
          'flex h-12 items-center justify-between gap-3 rounded-lg border px-4 transition-colors active:scale-[0.98]',
          'border-zinc-200 bg-zinc-200/60 hover:border-zinc-200 hover:text-sky-700 peer-checked:border-blue-200 peer-checked:bg-sky-100 peer-checked:text-sky-700',
          'dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-zinc-700/40 dark:hover:text-sky-400 dark:peer-checked:border-sky-900 dark:peer-checked:bg-sky-950/70 dark:peer-checked:text-sky-400',
        )}
        htmlFor={variant}
      >
        {variant === 'googlePay' && (
          <>
            <div>Google Pay</div>
            <GooglePay className={cn('h-5')} />
          </>
        )}
        {variant === 'applePay' && (
          <>
            <div>Apple Pay</div>
            <ApplePay className={cn('relative top-[2px] h-5')} />
          </>
        )}
        {variant === 'paypal' && (
          <>
            <div>PayPal</div>
            <Paypal className={cn('size-4')} />
          </>
        )}
        {variant === 'cashApp' && (
          <>
            <div>Cash App</div>
            <CashApp className={cn('size-4')} />
          </>
        )}
        {variant === 'klarna' && (
          <>
            <div>Klarna</div>
            <Klarna className={cn('size-4')} />
          </>
        )}
        {variant === 'amazonPay' && (
          <>
            <div>Amazon Pay</div>
            <AmazonPay className={cn('h-6')} />
          </>
        )}
      </label>
    </div>
  );
};
