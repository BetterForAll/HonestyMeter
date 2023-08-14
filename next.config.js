/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    customKey: 'my-value',
  },
  images: {
    domains: ['random.imagecdn.app', 'picsum.photos'],
  },
}

module.exports = nextConfig
