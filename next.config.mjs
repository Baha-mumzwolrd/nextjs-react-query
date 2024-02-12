/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  rewrites: () => {
    return [
      {
        source: "/graphql",
        destination: "https://magento-test.ci.mumz.io/graphql",
      },
    ];
  },
};

export default nextConfig;
