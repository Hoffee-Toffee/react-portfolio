import { Route, useNavigate } from 'react-router-dom'
import * as Path from 'node:path'
import fs from 'fs'

export default function ProjectRoutes() {
  const navigate = useNavigate()

  const reload = (project) => {
    // add 'projects' to the start of the path and redirect to it
    const path = window.location.pathname.replace(
      `/${project}`,
      `/projects/${project}`,
    )
    navigate(path, { replace: true })
  }
  const routes = []

  // Loop through all projects, creating routes for each
  // const routes = require(`../../projects/${project}/client/routes.tsx`)
  const projectsDir = Path.resolve('projects')
  fs.readdirSync(projectsDir).forEach((project) => {
    // Check for 'client/routes.tsx' in each project, otherwise route all subdirectories to that of the project directory
    const routesFile = Path.resolve(projectsDir, project, 'client/routes.tsx')
    if (fs.existsSync(routesFile)) {
      const projectRoutes = require(
        `../../projects/${project}/client/routes.tsx`,
      )
      routes.push(
        <>
          <Route path={`/${project}`}>projectRoutes.default</Route>
        </>,
      )
      console.log(`Found routes file for ${project}`)
    } else {
      routes.push(<Route path={`/${project}/*`} onEnter={reload(project)} />)
      console.log(`Static redirect established for ${project}`)
    }
  })
}
