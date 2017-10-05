const path = require('path')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config.js')

module.exports = app => {
  const compiler = webpack(require('./webpack.config.js'))

  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))

  app.use('/bundle.js', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'bundle.js')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/javascript')
      res.send(result)
      res.end()
    })
  })

  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
}
