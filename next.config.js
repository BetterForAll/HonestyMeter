/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
