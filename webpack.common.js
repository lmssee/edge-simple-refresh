import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export default {
  entry: {
    background: './src/background/index.ts',
    popup: './src/popup/app.tsx',
    content: './src/content/index.ts',
  },
  output: {
    path: path.join(import.meta.dirname, 'dist/js'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      // Component: path.join()
      src: path.join(import.meta.dirname, 'src/'),
    },
  },
  module: {
    rules: [
      // 配置 ts loader
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      // 配置 scss
      {
        test: /\.scss$/,
        // 加载是至下而上，也就是说 webpack 使用数组是 pop
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // 配置 文件
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 16129,
              name: 'images/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: '../popup/index.html',
      chunks: ['popup'],
      inject: 'body',
      templateParameters: {
        title: '定时刷新',
      },
    }),
    /// 文件复制
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json', to: '../manifest.json' },
        // { from: 'src/css', to: '../css' },
        { from: 'src/icons', to: '../icons' },
        { from: 'src/images', to: '../images' },
        // { from: 'src/popup/index.css', to: '../popup/index.css' },
        // { from: 'src/newtab/index.css', to: '../newtab/index.css' },
        { from: 'src/_locales', to: '../_locales' },
      ],
    }),
  ],
};
