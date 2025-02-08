/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.sanity.io',
            port: '',
            pathname: '/images/**',
          },
        ],
        domains: ['upload.wikimedia.org', 'images.unsplash.com'], //update this
      },
  };;

export default nextConfig;
