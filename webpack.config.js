const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}) => {
  const MODE = env.mode || 'development';
  const DEV = MODE === 'development';

  return {
    mode: MODE,
    devtool: DEV ? 'inline-source-map' : false,

    entry: {
      index: './src/index.js'
    },

    devServer: {
      host: '0.0.0.0',
      port: 1337,
      static: './dist',
      hot: true
    },

    optimization: {
      runtimeChunk: 'single',
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
    ],

    output: {
      filename: DEV ? '[name].js' : '[name].[contenthash:8].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      chunkFilename: DEV ? '[name].js' : '[name].[contenthash:8].js',
      assetModuleFilename: 'assets/[name].[contenthash:8].[ext]'
    },
  }
};
