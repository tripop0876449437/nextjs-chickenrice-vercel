/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  env: {
    baseURLapi: process.env.BASE_URL_API
  }

};

export default nextConfig;
