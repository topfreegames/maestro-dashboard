const express = require('express')
const cors = require('cors')
const path = require('path')
const graph = require('./graph')

const env = process.env.NODE_ENV
require('dotenv').config({ path: `.env.${env}` })

const app = express()

app.use(cors())

graph(app)

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/bundle.js'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
})

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})
