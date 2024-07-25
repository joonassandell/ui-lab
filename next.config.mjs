const { IGNORE_ERRORS } = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: IGNORE_ERRORS ? true : false,
  },
  typescript: {
    ignoreBuildErrors: IGNORE_ERRORS ? true : false,
  },
};

export default nextConfig;
