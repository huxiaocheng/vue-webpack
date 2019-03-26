const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    open: true,
    compress: false,
    historyApiFallback: true,
    clientLogLevel: "none"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use:[
          'vue-style-loader',
          'css-loader', 
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2  
            }
          }, 
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  }
};

module.exports = merge(baseConfig, devConfig);