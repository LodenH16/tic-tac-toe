/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    reactRemoveProperties: {
      properties: ["data-testId"],
    },
  },
};

export default nextConfig;
