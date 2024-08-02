const { IGNORE_ERRORS, NEXT_PUBLIC_ALLOWED_IFRAME_URLS } = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: IGNORE_ERRORS ? true : false,
  },
  typescript: {
    ignoreBuildErrors: IGNORE_ERRORS ? true : false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `frame-ancestors 'self' ${NEXT_PUBLIC_ALLOWED_IFRAME_URLS.split(', ').join(' ')}`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
