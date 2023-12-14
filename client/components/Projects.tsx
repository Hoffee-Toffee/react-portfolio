import { useEffect } from 'react'
import { useProjects } from '../hooks/useProjects'
import '../styles/projects.scss'

export default function ProjectsPage() {
  useEffect(() => {
    document.title = 'Tristan Bulmer | Projects'
    document.body.parentElement.id = 'projectsPage'
  }, [])

  const { data, isError, isLoading } = useProjects()

  if (!data || isError || isLoading) {
    return (
      <div id="loading-projects" className="loading">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
        <span className="scanline"></span>
      </div>
    )
  }

  const { repos, me } = data

  return (
    <>
      <h1>Featured Projects</h1>

      <div id="featured" className="projects">
        {repos.featured.map((repo) => (
          <div id={repo.name} key={repo.name} className="project">
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
            <div className="project-links">
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                View Repo
              </a>
              <a
                href={`/${repo.name}/index.html`}
                target="_blank"
                rel="noreferrer"
              >
                Run Repo
              </a>
              <img
                src={`https://raw.githubusercontent.com/${me}/${repo.name}/main/screenshot.png`}
                alt={`Screenshot of ${repo.name}`}
              />
            </div>
          </div>
        ))}
      </div>

      <h1>Other Repositories</h1>

      <div id="other" className="projects">
        {repos.other.map((repo) => (
          <a
            id={repo.name}
            key={repo.name}
            className="project"
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
          >
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
          </a>
        ))}
      </div>
    </>
  )
}
