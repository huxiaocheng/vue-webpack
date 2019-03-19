const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [{
      test: /\.(gif|jpg|png|webp)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name]_[hash:8].[ext]',
          outputPath: 'image/',
          limit: 1024
        }
      }
    }]
  }
}