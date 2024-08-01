import { cn } from '@/lib/utils';
import { DynamicPayButton } from './DynamicPayButton';
import { Header } from '@/components/Header';

export default function Page() {
  return (
    <>
      <Header displayWithQueryParamOnly />
      <main
        className={cn(
          'u-grid u-min-h-svh u-place-content-center u-overflow-hidden',
        )}
      >
        <DynamicPayButton />
      </main>
    </>
  );
}
