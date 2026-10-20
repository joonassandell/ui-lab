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
        className={cn('u:peer u:sr-only')}
        defaultChecked={checked}
        id={variant}
        name="payment-method"
        type="radio"
      />
      <label
        className={cn(
          'u:flex u:h-12 u:items-center u:justify-between u:rounded-lg u:border u:px-3 u:transition-colors u:active:scale-[0.98] u:xs:px-4',
          'u:border-zinc-200 u:bg-zinc-200/60 u:peer-checked:border-blue-200 u:peer-checked:bg-sky-100 u:peer-checked:text-sky-700 u:hover:border-zinc-200 u:hover:text-sky-700',
          'u:dark:border-zinc-800 u:dark:bg-zinc-800/50 u:dark:peer-checked:border-sky-900 u:dark:peer-checked:bg-sky-950/70 u:dark:peer-checked:text-sky-400 u:dark:hover:border-zinc-700/40 u:dark:hover:text-sky-400',
        )}
        htmlFor={variant}
      >
        {variant === 'googlePay' && (
          <>
            <p className={cn('u:truncate u:text-xs u:xs:text-sm')}>
              Google Pay
            </p>
            <GooglePay className={cn('u:h-5')} />
          </>
        )}
        {variant === 'applePay' && (
          <>
            <p className={cn('u:truncate u:text-xs u:xs:text-sm')}>Apple Pay</p>
            <ApplePay className={cn('u:relative u:top-[2px] u:h-5')} />
          </>
        )}
        {variant === 'paypal' && (
          <>
            <p className={cn('u:truncate u:text-xs u:xs:text-sm')}>PayPal</p>
            <Paypal className={cn('u:size-4')} />
          </>
        )}
        {variant === 'cashApp' && (
          <>
            <p className={cn('u:truncate u:text-xs u:xs:text-sm')}>Cash App</p>
            <CashApp className={cn('u:size-4')} />
          </>
        )}
        {variant === 'klarna' && (
          <>
            <p className={cn('u:truncate u:text-xs u:xs:text-sm')}>Klarna</p>
            <Klarna className={cn('u:size-4')} />
          </>
        )}
        {variant === 'amazonPay' && (
          <>
            <p className={cn('u:truncate u:text-xs u:xs:text-sm')}>
              Amazon Pay
            </p>
            <AmazonPay className={cn('u:h-6')} />
          </>
        )}
      </label>
    </div>
  );
};
