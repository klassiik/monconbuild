// Load configuration from environment or config file
const path = require('path');

// Environment variable overrides
const config = {
  disableHotReload: process.env.DISABLE_HOT_RELOAD === 'true',
};

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      // Enable code splitting for better performance
      webpackConfig.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\\\/]node_modules[\\\\/]/,
            name: 'vendors',
            chunks: 'all',
            enforce: true,
            priority: 20
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
            priority: 10
          }
        }
      };
      
      // Enable tree shaking and remove unused code
      webpackConfig.optimization.usedExports = true;
      webpackConfig.optimization.sideEffects = false;
      webpackConfig.optimization.providedExports = true;
      webpackConfig.optimization.innerGraph = true;
      
      // Remove unused modules
      webpackConfig.optimization.mangleExports = 'size';
      
      // Better module concatenation
      webpackConfig.optimization.concatenateModules = true;
      
      // Add compression for production
      if (process.env.NODE_ENV === 'production') {
        try {
          const CompressionPlugin = require('compression-webpack-plugin');
          
          // Brotli compression
          webpackConfig.plugins.push(
            new CompressionPlugin({
              filename: '[path][base].br',
              algorithm: 'brotliCompress',
              test: /\\.(js|css|html|svg)$/,
              compressionOptions: {
                level: 11,
              },
              threshold: 10240,
              minRatio: 0.8,
            })
          );
          
          // Gzip compression
          webpackConfig.plugins.push(
            new CompressionPlugin({
              algorithm: 'gzip',
              test: /\\.(js|css|html|svg)$/,
              threshold: 8192,
              minRatio: 0.8
            })
          );
        } catch (e) {
          console.log('CompressionPlugin not available, skipping compression');
        }
      }
      
      // Fix source-map-loader issues - ignore problematic packages
      webpackConfig.ignoreWarnings = [
        function ignoreSourcemapsloaderWarnings(warning) {
          return (
            warning.module &&
            warning.module.resource.includes('node_modules') &&
            warning.details &&
            warning.details.includes('source-map-loader')
          );
        },
      ];

      // Disable hot reload completely if environment variable is set
      if (config.disableHotReload) {
        // Remove hot reload related plugins
        webpackConfig.plugins = webpackConfig.plugins.filter(plugin => {
          return !(plugin.constructor.name === 'HotModuleReplacementPlugin');
        });
        
        // Disable watch mode
        webpackConfig.watch = false;
        webpackConfig.watchOptions = {
          ignored: /.*/, // Ignore all files
        };
      } else {
        // Add ignored patterns to reduce watched directories
        webpackConfig.watchOptions = {
          ...webpackConfig.watchOptions,
          ignored: [
            '**/node_modules/**',
            '**/.git/**',
            '**/build/**',
            '**/dist/**',
            '**/coverage/**',
            '**/public/**',
          ],
        };
      }
      
      return webpackConfig;
    },
  },
};