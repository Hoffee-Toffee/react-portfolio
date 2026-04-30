import { useEffect } from 'react'
import { useProjects } from '../hooks/useProjects'
import '../styles/projects.scss'

export default function ProjectsPage() {
  useEffect(() => {
    document.title = 'Tristan Bulmer | Projects'
    document.body.parentElement.id = 'projectsPage'
  }, [])

  const { data, isError, isLoading } = useProjects()

  const { repos, me, info } = data || { repos: {}, me: '', info: {} }

  function projectCard(repo) {
    return (
      <div id={repo.name} key={repo.name} className="project">
        <h3>{repo.name}</h3>
        <p>{repo.description}</p>
        <img
          src={`https://raw.githubusercontent.com/${me}/${repo.name}/main/screenshot.png`}
          alt={`Screenshot of ${repo.name}`}
          onError={(e) => e.target.classList.add('hidden')}
        />
        <video
          src={`https://raw.githubusercontent.com/${me}/${repo.name}/main/demo.mp4`}
          onError={(e) => e.target.classList.add('hidden')}
          controls
        />
        <div className="project-links">
          <a href={repo.html_url} target="_blank" rel="noreferrer">
            View Repo
          </a>
          {repo.hosted && (
            <a href={`projects/${repo.name}/`} target="_blank" rel="noreferrer">
              Run Repo
            </a>
          )}
          {repo.article && (
            <a href={'/blog/' + repo.name} rel="noreferrer">
              Project Blog
            </a>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      {repos.featured && <h1>Featured Projects</h1>}

      <div id="loading-projects" className={isLoading ? 'loading' : 'loaded'}>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
        <span className="scanline"></span>
      </div>

      <div id="featured" className="projects">
        {repos.featured?.map((repo) => projectCard(repo))}
      </div>

      {repos.projects && <h1>Other Projects</h1>}

      <div id="projects" className="projects">
        {repos.projects?.map((repo) => projectCard(repo))}
      </div>

      {repos.other && <h1>Other Repositories</h1>}

      <div id="other" className="projects">
        {repos.other?.map((repo) => (
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
