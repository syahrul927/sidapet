import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  webpack(config, { dev, isServer }) {
    if (dev) {
      config.stats = {
        all: false,
        modules: true,
        errors: true,
        warnings: true,
        moduleTrace: true,
        errorDetails: true,
      };

      config.plugins.push({
        apply(compiler) {
          compiler.hooks.compilation.tap("LogModulesPlugin", (compilation) => {
            compilation.hooks.buildModule.tap("LogModulesPlugin", (module) => {
              if (module.resource) {
                console.log("Compiling module:", module.resource);
              }
            });
          });
        },
      });
    }
    return config;
  },
};

export default bundleAnalyzer(nextConfig);
