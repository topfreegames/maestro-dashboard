const express = require('express')
const cors = require('cors')
const graph = require('./graph')

const app = express()

app.use(cors())

graph(app)

require(`./server.${process.env.NODE_ENV}`)(app)

app.listen(process.env.PORT || 8080, () => {
  console.log(`listening on port ${process.env.PORT}`)
})
