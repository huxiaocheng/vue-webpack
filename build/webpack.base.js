const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: "development",
  // mode: "production",
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, "../dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    
  },
  module: {
    rules: [
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
      },
      {
        test: /\.css$/,  // css
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.scss$/,  // scss
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          "sass-loader",
          "postcss-loader"
        ]
      }
    ]
  }
};
