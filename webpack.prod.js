import webpackCommon from './webpack.common.js';
export default {
  ...webpackCommon,
  mode: 'production',
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     minSize: 20000,
  //     maxSize: 0, // 0 表示没有限制
  //     minChunks: 1,
  //     maxAsyncRequests: 30,
  //     automaticNameDelimiter: '~',
  //     enforceSizeThreshold: 50000,
  //     cacheGroups: {
  //       defaultVendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10,
  //         reuseExistingChunk: true,
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true,
  //       },
  //     },
  //   },
  // },
};
