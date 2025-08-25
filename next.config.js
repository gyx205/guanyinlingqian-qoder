/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  env: {
    LINGQIAN_API_ID: '10007267',
    LINGQIAN_API_KEY: 'f412cd662f4613e7b3f651bc38094d91',
    DEEPSEEK_API_KEY: 'sk-e965f6232d684a2d90192a957d32f6bb'
  }
}

module.exports = nextConfig