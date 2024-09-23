import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'node:path';

export default {
  entry: {
    background: './src/background/index.ts',
    popup: './src/popup/root.tsx',
    content: './src/content/root.tsx',
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
        test: /\.s?css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
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
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: '../dev/index.html',
      chunks: [],
      inject: 'body',
      templateParameters: {
        title: '定时刷新-开发块',
      },
    }),
    /// 文件复制
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json', to: '../manifest.json' },
        { from: 'src/icons', to: '../icons' },
        { from: 'src/images', to: '../images' },
        { from: 'src/_locales', to: '../_locales' },
      ],
    }),
  ],
};
