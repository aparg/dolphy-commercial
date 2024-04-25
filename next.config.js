/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pricetrackernepal.com",
        port: "",
        pathname: "/commercialPhotos/**",
      },
    ],
  },
};

module.exports = nextConfig;
