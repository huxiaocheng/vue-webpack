// const merge = require('webpack-merge');
// const baseConfig = require('./webpack.base.js');

// const devConfig = {
//   mode: 'development',
//   output: {
//     filename: '[name].js',
//     chunkFilename: '[name].chunk.js',
//   },
//   module: {
//     rules: [{
//       test: /\.css$/,
//       use: ['style-loader', 'css-loader', 'postcss-loader']
//     }, {
//       test: /\.scss$/,
//       use: [
//         'style-loader',
//         {
//           loader: 'css-loader',
//           options: {
//             importLoaders: 2  
//           }
//         },
//         'sass-loader',
//         'postcss-loader'
//       ]
//     }]
//   }
// }

// module.exports = merge(baseConfig, devConfig);