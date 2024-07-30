import { cn } from '@/lib/utils';
import { DynamicPayButton } from './DynamicPayButton';

export default function Page() {
  return (
    <main
      className={cn(
        'u-grid u-min-h-svh u-place-content-center u-overflow-hidden',
      )}
    >
      <DynamicPayButton />
    </main>
  );
}
