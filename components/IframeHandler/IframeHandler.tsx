'use client';

import { ALLOWED_IFRAME_URLS, REDIRECT_URL } from '@/lib/config';
import { redirect, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { useTheme } from 'next-themes';

const IframeHandler = () => {
  const queryParamScale = useSearchParams().get('scale') === 'true';
  const { setTheme } = useTheme();

  /**
   * Handle theme changing from iframe
   */
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (!ALLOWED_IFRAME_URLS?.split(', ').includes(event.origin)) return;
      setTheme(event.data);
    };

    window.addEventListener('message', handler);

    return () => window.removeEventListener('message', handler);
  }, [setTheme]);

  /**
   * Redirect unless used in an iframe
   */
  useEffect(() => {
    if (!REDIRECT_URL) return;
    if (window.self === window.top && REDIRECT_URL != 'false') {
      redirect(REDIRECT_URL);
    }
  }, []);

  /**
   * Scale UI if the param is set
   */
  useEffect(() => {
    if (!queryParamScale) return;
    const root = document.documentElement;
    root.classList.add('u-scale');

    return () => root.classList.remove('u-scale');
  }, [queryParamScale]);

  return null;
};

const IframeHandlerSuspense = () => {
  return (
    <Suspense>
      <IframeHandler />
    </Suspense>
  );
};

export { IframeHandlerSuspense as IframeHandler };
