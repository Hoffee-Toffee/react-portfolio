import fs from 'fs'
import * as Path from 'node:path'
import express from 'express'
import { buildSync } from 'esbuild' // Import esbuild to handle TypeScript compilation
import { fileURLToPath } from 'url' // Import fileURLToPath function to convert file URL to file path
const __filename = fileURLToPath(import.meta.url) // Get the current file's URL and convert it to a file path
const __dirname = Path.dirname(__filename) // Get the directory name of the current file

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
      let modulePath
      if (compile) {
        console.log(`Compiling TypeScript file at ${fullPath}`)
        const compiledPath = compileTs(fullPath)
        modulePath = Path.relative(__dirname, compiledPath)
      } else {
        modulePath = Path.relative(__dirname, fullPath)
      }

      console.log(`Attempting to load module from ${modulePath}`)
      try {
        const serverModule = require(modulePath)
        server.use(`/${project}`, serverModule.default)
        console.log(
          `Module loaded successfully from ${modulePath} for project ${project}`,
        )
        return
      } catch (err) {
        console.error(`Error loading module from ${modulePath}: ${err}`)
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
