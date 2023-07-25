/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['antd'],
}

module.exports = nextConfig
module.exports = {
  transpilePackages: ['antd'],
  env: {
    API_BASE_URL: process.env.MAIN_API_URL === 'production' ? 'https://jgt0ls7201.execute-api.ap-northeast-2.amazonaws.com/prod/camps' : 'https://jgt0ls7201.execute-api.ap-northeast-2.amazonaws.com/dev/camps',
    // Add other environment variables as needed
  },
}
