const express = require('express')
const path = require('path')

module.exports = app => {
  app.use(express.static('build'))

  app.get('/bundle.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/bundle.js'))
  })
  app.get('/manifest.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/manifest.json'))
  })

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'))
  })
}
