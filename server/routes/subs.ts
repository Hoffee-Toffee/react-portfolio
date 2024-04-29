import fs from 'fs'
import * as Path from 'node:path'
import express from 'express'
import { buildSync } from 'esbuild' // Import esbuild to handle TypeScript compilation

const server = express()

server.use(express.json())

const projectsDir = Path.resolve('projects')

const compileTs = (tsPath) => {
  const outFile = tsPath.replace(/\.ts$/, '.js')
  buildSync({
    entryPoints: [tsPath],
    outfile: outFile,
    bundle: true,
    platform: 'node',
    format: 'cjs', // CommonJS format suitable for Node.js
    external: ['express'], // Make express external to avoid bundling it
  })
  return outFile
}

const loadServerModule = async (project) => {
  const basePaths = [
    { path: 'server/server.ts', compile: true },
    { path: 'server/server.js', compile: false },
    { path: 'server.ts', compile: true },
    { path: 'server.js', compile: false },
  ]

  for (const { path, compile } of basePaths) {
    const fullPath = Path.resolve(projectsDir, project, path)
    if (fs.existsSync(fullPath)) {
      console.log(`Found file at ${fullPath}`)
      if (compile) {
        console.log(`Compiling TypeScript file at ${fullPath}`)
        const compiledPath = compileTs(fullPath)
        const modulePath = require.resolve(compiledPath) // Get the absolute path of the compiled file
        const serverModule = require(modulePath)
        server.use(`/${project}`, serverModule.default)
        console.log(
          `Module loaded successfully from ${modulePath} for project ${project}`,
        )
        return
      } else {
        const modulePath = require.resolve(fullPath) // Get the absolute path of the JavaScript file
        const serverModule = require(modulePath)
        server.use(`/${project}`, serverModule.default)
        console.log(
          `Module loaded successfully from ${modulePath} for project ${project}`,
        )
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
