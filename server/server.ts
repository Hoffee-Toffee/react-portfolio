import express from 'express'
import * as fs from 'node:fs'
import * as Path from 'node:path'

import sneezeRoutes from './routes/sneezes.ts'
import projectRoutes from './routes/projects.ts'
import secretRoutes from './routes/secrets.ts'
import subRoutes from './routes/subs.ts'

const server = express()

server.use(express.json({ limit: '50mb' }))
server.use(express.urlencoded({ extended: true, limit: '50mb' }))

server.use('/api/v1/sneezes', sneezeRoutes)
server.use('/api/v1/projects', projectRoutes)
server.use('/api/v1/secret', secretRoutes)
server.use('/projects', subRoutes)
server.get('/ping', (_, res) => res.json({ message: 'pong' }))

// CV links
// GET: /Basic_CV -> /client/files/Tristan Bulmer CV (General).pdf
server.get('/Basic_CV', (_, res) => {
  const file = Path.resolve('./client/files/Tristan Bulmer CV (General).pdf')
  fs.readFile(file, (err, data) => {
    if (err) {
      res.status(500).send('Error reading file')
    } else {
      res.contentType('application/pdf')
      res.send(data)
    }
  })
})

// GET: /Tech_CV -> /client/files/Tristan Bulmer CV (Technical).pdf
server.get('/Tech_CV', (_, res) => {
  const file = Path.resolve('./client/files/Tristan Bulmer CV (Technical).pdf')
  fs.readFile(file, (err, data) => {
    if (err) {
      res.status(500).send('Error reading file')
    } else {
      res.contentType('application/pdf')
      res.send(data)
    }
  })
})

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (_, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
