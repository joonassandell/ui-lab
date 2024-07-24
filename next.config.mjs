/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    /**
     * Related to tailwindcss-scoped-preflight causing issues together with 
     * tailwinds resolveConfig
     * 
     * @link https://stackoverflow.com/a/70995196
     */
    config.resolve.fallback = {
      ...config.resolve.fallback,  
      fs: false,
    };
    return config;
  },
};

export default nextConfig;
