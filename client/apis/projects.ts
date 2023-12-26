import request from 'superagent'

const githubAPI = 'https://api.github.com'
const rootUrl = '/api/v1'
const me = 'Hoffee-Toffee'

export async function getProjects(): Promise<string[]> {
  const starred = await getStarred()
  const owned = await getOwnedRepos()
  const info = await getRepoInfo()

  const names = starred.map((repo) => repo.name)
  const projects = starred.filter((repo) => !info[repo.node_id])
  const other = owned.filter((repo) => !names.includes(repo.name))
  const featured = starred.filter((repo) => info[repo.node_id])

  return {
    me,
    info,
    repos: {
      featured,
      projects,
      other,
    },
  }
}

export async function getStarred(): Promise<string[]> {
  const response = await request.get(githubAPI + `/users/${me}/starred`)

  const starred = (await response.body).sort(function (a, b) {
    return new Date(b.updated_at) - new Date(a.updated_at)
  })

  return starred
}

export async function getOwnedRepos(): Promise<string[]> {
  const response = await request.get(githubAPI + `/users/${me}/repos`)

  const ownedRepos = (await response.body).sort(function (a, b) {
    return new Date(b.updated_at) - new Date(a.updated_at)
  })

  return ownedRepos
}

export async function getRepoInfo(): Promise<string[]> {
  const response = await request.get(rootUrl + '/projects')

  return await response.body
}
