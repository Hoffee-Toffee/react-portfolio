import * as Path from 'node:path'
import express from 'express'
import * as tsImport from 'ts-import'

const server = express()

server.use(express.json())

const projectsDir = Path.resolve('projects')

const loadServerModule = async (project) => {
  for (let i = 0; i < 4; i++) {
    const sects = ['projects', project]
    if (i % 2) sects.push('server')
    const ext = i < 2 ? '.ts' : '.js'
    sects.push(`server${ext}`)
    const file = Path.resolve(...sects)
    if (fs.existsSync(file)) {
      const modulePath = Path.join(
        '..',
        'projects',
        ...sects.filter((_, i) => i),
      )
      console.log(`Attempting to load module from ${modulePath}`)
      try {
        // Use tsImport to load TypeScript file
        const serverModule = await tsImport.load(modulePath)
        console.log(`Module loaded successfully from ${modulePath}`)
        server.use(`/${project}`, serverModule.default)
        console.log(`Loaded ${modulePath} for ${project}`)
        return
      } catch (err) {
        console.error(`Error loading module from ${modulePath}: ${err}`)
      }
    }
  }
  console.log(
    `No server file found for ${project}, assuming it's a static project`,
  )
  server.use(`/${project}`, express.static(Path.resolve('projects', project)))
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
