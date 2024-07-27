import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  webpack(config, { dev, isServer }) {
    return config;
  },
};

export default bundleAnalyzer(nextConfig);
