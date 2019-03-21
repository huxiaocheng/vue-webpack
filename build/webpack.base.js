const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      _: 'lodash'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          filename: 'vendors/vendors.js',
        },
        default: {
          filename: 'common.js',
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader', 
          'imports-loader?this=>window'
        ]
      },
      {
        test: /\.(gif|jpg|png|webp)$/, //图片
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash:8].[ext]",
            outputPath: "image",
            limit: 2048
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,  // 字体
        use: {
          loader: "file-loader",
          options: {
            outputPath: "iconfont"
          }
        }
      }
    ]
  },
  performance: false
};
