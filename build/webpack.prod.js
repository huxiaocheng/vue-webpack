const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const baseConfig = require('./webpack.base.js');

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].chunk.js',
  },
  plugins: [
    new MiniCssExtractPlugin({ // 单独提取css
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].chunk.css',
    })
  ],
optimization: {
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true
    }),
    new OptimizeCssAssetsPlugin({}) // css压缩
  ] 
},
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader ,
          'css-loader' ,
          'postcss-loader'
        ]
      }, 
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader ,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
    ]
  }
}

module.exports = merge(baseConfig, prodConfig);