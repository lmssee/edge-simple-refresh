import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'node:path';

export default function ({ dev }) {
  /** 当前是否为开发环境 */
  /** 入口 */
  const entry = {
    background: {
      import: './src/background/index.ts',
      filename: 'background/index.js',
    },
    popup: {
      import: './src/popup/root.tsx',
      filename: 'popup/[id].[contenthash].js',
    },
    content: {
      import: './src/content/root.tsx',
      filename: 'content/index.js',
    },
    debuggingPage: {
      import: './src/dev/root.tsx',
      filename: 'dev/[id].[contenthash].js',
    },
    reload: {
      import: './src/content/development.ts',
      filename: 'content/development.js',
    },
  };

  /** 出口 */
  const output = {
    path: path.join(import.meta.dirname, 'dist'),
    charset: true,
    compareBeforeEmit: true,
    clean: true,
    // publicPath: '/assets/', // 在配置的路径会添加前缀，但不会实际处理
  };
  /** 模块解析方式 */
  const resolve = {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      src: path.join(import.meta.dirname, 'src/'),
    },
  };

  /** 模块配置 */
  const module = {
    /** 这里的配置会覆盖具体的配置，灰掉 */
    // generator: {
    //   asset: {
    //     publicPath: 'src/',
    //     outputPath: 'cdn/assets/',
    //   },
    // },
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
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      // 配置 文件
      {
        test: /\.svg$/,
        type: 'asset/inline',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: '[name].[hash:8][ext]',
          outputPath: 'asset/images',
          publicPath: '../asset/images/',
        },
      },
    ],
  };
  /** 插件 */
  const plugins = [
    /** 调试页面 */
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'dev/index.html',
      chunks: ['debuggingPage'],
      inject: 'body',
      templateParameters: {
        title: '定时刷新-开发块',
      },
    }),
    /// 弹窗
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'popup/index.html',
      chunks: ['shared', 'popup'],
      inject: 'body',
      templateParameters: {
        title: '定时刷新',
      },
    }),
    /// 文件复制
    new CopyPlugin({
      patterns: [
        { from: `manifest${(dev && '-dev') || ''}.json`, to: 'manifest.json' },
        { from: 'src/icons', to: 'icons' },
        { from: 'src/_locales', to: '_locales' },
      ],
    }),
  ];

  /** 优化配置 */
  const optimization = {
    mangleExports: 'size',
    mangleWasmImports: false,
    // runtimeChunk: 'single',
    splitChunks: {
      // chunks: 'all',
      cacheGroups: {
        /// react 相关
        reactCommons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'commons',
          chunks: 'all',
          enforce: true,
        },
        mainGroup: {
          test: /[\\/]src[\\/]popup[\\/]/,
          // name: 'main-common',
          chunks: 'all',
          minSize: 0,
          priority: 10,
        },
      },
    },
  };

  /** 开发服务
   *
   */
  const devServer = {
    static: './dist',
    hot: true,
    host: '0.0.0.0',
    open: true,
  };

  /** 配置文件 */
  const config = {
    entry,
    output,
    resolve,
    module,
    plugins,
    optimization,
    mode: (dev && 'development') || 'production',
    devtool: 'source-map',
    devServer,
  };

  /// 生产环境
  if (!dev) {
    plugins[0] = undefined;
    // plugins.shift(); // 删除调试页面创建
    // plugins.splice(0, 1); // 删除调试页面创建
    delete entry.reload; /// 清理测试使用的扩展重加载
    delete entry.debuggingPage; // 清除调试 js 创建
    delete config.devtool; /// 清理测试
    delete config.devServer; /// 清理测试的服务
  }

  return config;
}
