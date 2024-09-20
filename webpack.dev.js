import webpackCommon from './webpack.common.js';
export default {
  ...webpackCommon,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
};
