require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'index.html',
  filename: 'index.html',
  inject: 'body'
})

const envVars = ['MAESTRO_URL', 'GA_CALLBACK', 'GA_CLIENT_ID']

const definePluginMap = envVars.reduce((acc, x) => ({
  ...acc,
  [`process.env.${x}`]: JSON.stringify(process.env[x])
}), {})

const constantsPlugin = new webpack.DefinePlugin(definePluginMap)

const BUILD_PATH = path.join(__dirname, 'build')
const SRC_PATH = path.join(__dirname, 'src')

module.exports = {
  context: SRC_PATH,
  entry: './index.js',
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
  plugins: [
    htmlWebpackPluginConfig,
    constantsPlugin
  ],
  devServer: {
    historyApiFallback: true
  }
}
