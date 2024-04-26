import fs from 'fs'
import * as Path from 'node:path'
import express from 'express'

const server = express()

server.use(express.json())

const projectsDir = Path.resolve('projects')

const loadServerModule = async (project) => {
  for (let i = 0; i < 4; i++) {
    const sects = [projectsDir, project]
    if (i % 2) sects.push('server')
    const ext = i < 2 ? '.ts' : '.js'
    sects.push(`server${ext}`)
    const file = Path.resolve(...sects)
    if (fs.existsSync(file)) {
      const modulePath = `../../projects/${sects.filter((_, i) => i).join('/')}`
      console.log(`Attempting to load module from ${modulePath}`)
      try {
        const serverModule = await import(modulePath)
        console.log(`Module loaded successfully from ${modulePath}`)
        server.use(`/${project}`, serverModule.default)
        console.log(`Loaded ${modulePath} for ${project}`)
        return
      } catch (err) {
        console.error(`Error loading module from ${modulePath}: ${err}`)
        return
      }
    }
  }
  console.log(
    `No server file found for ${project}, assuming it's a static project`,
  )
  server.use(`/${project}`, express.static(Path.resolve(projectsDir, project)))
}

fs.readdir(projectsDir, async (err, projects) => {
  if (err) {
    console.error(`Error reading projects directory: ${err}`)
    return
  }
  for (const project of projects) {
    await loadServerModule(project)
  }
})

export default server
