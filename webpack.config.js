const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const env = process.env.NODE_ENV
require('dotenv').config({ path: `.env.${env}` })

const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'index.html',
  filename: 'index.html',
  inject: false
})

const envVars = ['GA_CALLBACK', 'GA_CLIENT_ID', 'CLUSTERS', 'GRAPH_HOST']

const definePluginMap = envVars.reduce((acc, x) => ({
  ...acc,
  [`process.env.${x}`]: JSON.stringify(process.env[x])
}), {})

const constantsPlugin = new webpack.DefinePlugin(definePluginMap)

const BUILD_PATH = path.join(__dirname, 'build')
const SRC_PATH = path.join(__dirname, 'src')

const entryPrd = [
  'babel-polyfill',
  './index.js'
]

const entryDev = [
  'babel-polyfill',
  'react-hot-loader/patch',
  'webpack-hot-middleware/client',
  './index.js'
]

const entry = process.env.NODE_ENV === 'production' ? entryPrd : entryDev

const pluginsPrd = [
  htmlWebpackPluginConfig,
  constantsPlugin
]

const pluginsDev = pluginsPrd.concat([
  new webpack.HotModuleReplacementPlugin()
])

const plugins = process.env.NODE_ENV === 'production' ? pluginsPrd : pluginsDev

module.exports = {
  context: SRC_PATH,
  entry,
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    mainFiles: ['index'],
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins,
  devServer: {
    historyApiFallback: true
  }
}
