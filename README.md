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
plugins: [
  new CleanWebpackPlugin()
]
```
### 配置解析各种文件的loader
**图片**
<br>
