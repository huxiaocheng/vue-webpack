# 手写vue脚手架
从0到1 手写一个简易版vue脚手架。webpack版本4.29.6
## 准备
安装node(10.15.1)，
<br>初始化npm: 
```
npm init -y
```
<br>安装webpack以及webpack-cli，i是install简写，-D是--save-dev简写<br>
```
npm i -D webpack webpack-cli
```
在根目录下新建一个build文件夹，用于存放配置文件，分别创建三个文件:<br>
```
webpack.base.js、webpack.dev.js、webpack.prod.js
```
webpack.base.js为通用的基本配置，
<br>webpack.dev.js为开发模式独有的配置，
<br>webpack.prod.js为生产模式独有的配置。
<br>根目录下创建一个src目录，用于存放源码。
### 模式
打包的模式分为两种：<br>
生产模式: production <br>
开发模式: development <br>
可以使用环境变量作区分(process.env.NODE_ENV === 'production')，也可以在配置文件里面使用mode属性指定，这里使用mode指定。
<br>下载一个webpack-merge包，用于dev和prod文件内，用于去合并基本配置。
```
npm i -D webpack-merge
```
**package.json** 将该文件内的**scripts**的属性改为：
```
"scripts": {
  "build": "webpack  --config ./build/webpack.prod.js",
  "dev": "webpack --config ./build/webpack.dev.js"
},
```
然后使用npm run build则启动prod生产配置文件打包，
使用npm run dev则启动dev开发配置文件打包。
### 打包入口以及打包后出口
在**webpack.base.js(以下简称base)** 内配置入口以及出口：
```
const path = require('path');

const baseConfig = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].js', // 入口的文件名既是出口文件名
    path: path.resolve(__dirname, '../dist') // 打包到dist目录下
  }
}

module.exports = baseConfig;
```
**在dev文件内写入以下代码：**
```
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const devConfig = {
  mode: 'development'
};

module.exports = merge(baseConfig, devConfig);

```
让npm run dev的启动配置文件生效。

**在prod文件写入以下代码：**
```
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const prodConfig = {
  mode: 'production'
};

module.exports = merge(baseConfig, prodConfig);

```
让npm run dev的启动配置文件生效。
<br>在src目录下新建一个index.js文件作为入口文件，在里面写点什么，然后 npm run dev打包试试吧~
### 配置html模板
经过上面打包完毕之后会生成一个dist目录下有一个main.js文件，这个时候我们要让webpack生成一个html文件能正确使用main.js文件。
```
npm i -D html-webpack-plugin
```
用于帮助我们生成一个html文件到dist目录内，因为两种模式都需要，我们在base文件添加配置：
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};
```
在根目录下新建一个index.html文件，在里面写入一个div元素，用于vue的挂载点：
```
<div id='app'></div>
```
### 打包自动清除原有dist目录
每次打包不会清除之前打包的文件，所以我们每次要删除dist目录重新打包，可以用一个插件自动清除
```
npm i -D clean-webpack-plugin
```
在base目录下的插件选项内增加以下配置：
```
const CleanWebpackPlugin = require('clean-webpack-plugin');

plugins: [
  new CleanWebpackPlugin()
]
```
### 解析各种文件
webpack是只会处理js文件的，所以如果要打包其他的包括图片、字体、css等需要借助loader的帮助，安装解析各种文件所需的loader以及相关包
```
npm i -D @babel/core @babel/preset-env babel-loader css-loader file-loader url-loader vue-loader vue-template-compiler core-js
```
**无论开发模式还是生产模式我们都需要处理这些文件，所以在base文件下写入以下代码：**
```
const { VueLoaderPlugin } = require('vue-loader');
plugins: [
  new VueLoaderPlugin() //处理vue插件
],
module: {
  rules: [
    {
      test: /\.vue$/, // vue文件
      loader: 'vue-loader'
    },
    {
      test: /\.(png|jpe?g|gif|)$/, // 图片
      use: [
        {
          loader: 'url-loader',
          options: {
            name: 'image/[name].[hash:8].[ext]',
            limit: 10000,
            fallback: 'file-loader'
          }
        },
      ]
    },
    {
      test: /\.js$/, // js
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/, // 字体
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:8].[ext]'
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 媒体
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'media/[name].[hash:8].[ext]'
      }
    },
  ]
}
```
**在根目录下新建一个.babelrc**<br>
因为babel的options的配置以后可能会比较多，所以我们单独用一个文件来放置babel的配置
```
{
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "usage",
      "corejs": 3
    }]
  ]
}
```
### webpack-dev-server提高开发效率
目前情况我们是打包一次才可以在dist目录看到打包后的效果，借助webpack-dev-server就可以根据代码的改变实时观测到页面的变化了。
```
npm i -D webpack-dev-server
```
在dev文件下配置：
```
devServer: {
  contentBase: path.resolve(__dirname, 'dist'), //监听目录
  hot: true, // 热更新
  open: true, // 自动打开浏览器
  compress: false,  
  historyApiFallback: true  //单页路由
},
```
这一块配置还是挺多的，只是做了简单的配置

### 热更新HRM
启用了devServer后每次保存会刷新页面，我们可以用热更新让局部改变而不更新其他未改变的页面。在dev文件内配置一个webpack的插件，并启动devServer的hot属性。针对的是css部分，js部分会有loader来处理，或者需要手动实现，具体可查看webpack官网。
```
const webpack = require('webpack');

plugins: [
  new webpack.HotModuleReplacementPlugin()
],
```

### css处理
正常的打包css是会被打包到出口的js文件内，如果是生产模式我们需要将css分离出来并提取到单独文件内，是开发模式则不需要，所以我们需要单独配置css-loader的选项。
```
npm i -D mini-css-extract-plugin optimize-css-assets-webpack-plugin css-loader postcss-loader autoprefixer
```
在prod文件进行以下配置：
```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module: {
  rules: [
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use:[
        MiniCssExtractPlugin.loader,
        'css-loader', 
        'postcss-loader'
      ]
    }
  ]
}
plugins: [
  new MiniCssExtractPlugin({ //css分离
    filename: 'css/[name].[hash].css',
    chunkFilename: 'css/[name].[hash].css'
  })
],
optimization: {
  minimizer: [
    new UglifyJsPlugin({ // js 压缩
      cache: true,
      parallel: true,
      sourceMap: true
    }),
    new OptimizeCssAssetsPlugin({}) // css压缩
  ] 
}
```
**而在dev文件内的配置会简单很多：**
```
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
    }
  ]
}
```
如果需要处理sass、less、stylus则需要配置相关的loader，这个baidu一下就出来了~

### 代码分割
面对重复引入的文件或者包的时候，我们需要单独将它打包，这样可以优化不必要的重复引入。在base文件配置以下代码：
```
optimization: {
  splitChunks: {
    chunks: 'all'
  }
}
```
这里只是最简单的配置，其他的交给默认参数。
**然后在.babelrc文件内添加以下配置：**
``
npm i -D @babel/plugin-syntax-dynamic-import
<br>
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
``

### 省略引入文件后缀名以及添加别名
```
resolve: {
  extensions: ['.js', '.vue'],
  alias: {
    '@': resolve('src')
  }
},
```
这个相信大家在用官方脚手架的都遇到过，省略后缀以及增加别名方便引入文件。
<br>以上就是手写简易vue的脚手架了，注意是学习熟悉webpack的相关配置。其他还有些点没有写入，具体的大家可以clone下来看下吧~ ⭐

