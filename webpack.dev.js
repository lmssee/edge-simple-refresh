import webpackCommon from './webpack.common.js';
import CopyPlugin from 'copy-webpack-plugin';

export default {
  ...webpackCommon,
  entry: {
    ...webpackCommon.entry,
    reload: './src/content/development.ts',
  },
  plugins: [
    webpackCommon.plugins[0],
    webpackCommon.plugins[1], /// 文件复制
    new CopyPlugin({
      patterns: [
        { from: 'manifest-dev.json', to: '../manifest.json' },
        { from: 'src/icons', to: '../icons' },
        { from: 'src/images', to: '../images' },
        { from: 'src/_locales', to: '../_locales' },
      ],
    }),
  ],
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
};
