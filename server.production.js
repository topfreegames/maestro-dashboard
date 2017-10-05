const path = require('path')

module.exports = app => {
  app.get('/bundle.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/bundle.js'))
  })

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'))
  })
}
