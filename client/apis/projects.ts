import request from 'superagent'

const githubAPI = 'https://api.github.com'
const me = 'Hoffee-Toffee'

export async function getProjects(): Promise<string[]> {
  const featured = await getStarred()
  const owned = await getOwnedRepos()

  const names = featured.map((repo) => repo.name)
  const other = owned.filter((repo) => !names.includes(repo.name))

  return {
    me,
    repos: {
      featured,
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

//https://api.github.com/users/Hoffee-Toffee/repos
