/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images2.imgbox.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com', // optional: allow multiple sources if needed
      },
    ],
  },
};

module.exports = nextConfig;
