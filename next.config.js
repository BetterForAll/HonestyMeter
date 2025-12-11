/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    staleTimes: {
      dynamic: 30, // Cache dynamic pages for 30 seconds on client
      static: 180, // Cache static pages for 3 minutes on client
    },
  },
  env: {
    customKey: 'my-value',
  },
  images: {
    domains: ['random.imagecdn.app', 'picsum.photos', 'images.unsplash.com'],
  },
  // webpack: (config, { isServer, dev }) => {
  //   // Only enable detailed source maps in production and not for the server
  //   if (!isServer && !dev) {
  //     config.devtool = 'source-map';
  //   }
  //   return config;
  // },
  async rewrites() {
    return [
      { source: '/sitemap.xml', destination: '/api/sitemaps/main' },
      { source: '/sitemaps/people.xml', destination: '/api/sitemaps/people' },
      { source: '/sitemaps/reports/:id.xml', destination: '/api/sitemaps/reports/:id' },
    ];
  },
}

module.exports = nextConfig
