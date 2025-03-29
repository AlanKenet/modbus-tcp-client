import express from 'express'

import indexRoutes from './routes/index.routes'

const app = express()

app.use(express.json())

app.use(indexRoutes)

app.use((_req, res, _next) => {
  res.status(404).json({
    message: 'Endpoint not found'
  })
})

app.listen(5656)
console.log('Server running on port 5656')
