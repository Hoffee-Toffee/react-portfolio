import fs from 'fs'
import * as Path from 'node:path'
import express from 'express'
import { spawnSync } from 'child_process'

const server = express()

const transpileTsToJs = (tsFilePath: string) => {
  const jsFilePath = tsFilePath.replace(/\.ts$/, '.js')
  spawnSync('tsc', [tsFilePath, '--outFile', jsFilePath])
  return jsFilePath
}

server.use(express.json())

const projectsDir = Path.resolve('projects')

const loadServerModule = async (project: string) => {
  for (let i = 0; i < 3; i++) {
    const sects = ['projects', project]
    if (i % 2) sects.push('server')
    if (i == 2) sects.push('dist')

    sects.push(`server.js`)
    const file = Path.resolve(...sects)
    if (fs.existsSync(file)) {
      const modulePath = `../projects/${sects.filter((_, i) => i).join('/')}`
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
