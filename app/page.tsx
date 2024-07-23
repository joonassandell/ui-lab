import { Header } from '@/components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <iframe height={640} src="/dynamic-pay-button" width={640} />
      </main>
    </>
  );
}
