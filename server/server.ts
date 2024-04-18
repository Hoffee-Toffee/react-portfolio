import express from 'express'
import * as Path from 'node:path'

import sneezeRoutes from './routes/sneezes.ts'
import projectRoutes from './routes/projects.ts'
import secretRoutes from './routes/secrets.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/sneezes', sneezeRoutes)
server.use('/api/v1/projects', projectRoutes)
server.use('/api/v1/secret', secretRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
