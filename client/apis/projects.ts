import request from 'superagent'

const githubAPI = 'https://api.github.com'
const rootUrl = '/api/v1'
const me = 'Hoffee-Toffee'

export async function getProjects(): Promise<object> {
  let starred = await getStarred()
  let owned = await getOwnedRepos()

  const info = await getRepoInfo()

  starred = await Promise.all(
    starred.map(async (repo: any) => ({
      ...repo,
      hosted: await checkRepo(repo.name),
    })),
  )
  owned = await Promise.all(
    owned.map(async (repo: any) => ({
      ...repo,
      hosted: await checkRepo(repo.name),
    })),
  )
  console.log(starred, owned)

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

async function getStarred(): Promise<object[]> {
  const response = await request.get(githubAPI + `/users/${me}/starred`)

  const starred = (await response.body).sort(function (a, b) {
    return new Date(b.updated_at) - new Date(a.updated_at)
  })

  return starred
}

async function getOwnedRepos(): Promise<object[]> {
  const response = await request.get(githubAPI + `/users/${me}/repos`)

  const ownedRepos = (await response.body).sort(function (a, b) {
    return new Date(b.updated_at) - new Date(a.updated_at)
  })

  return ownedRepos
}

async function getRepoInfo(): Promise<object[]> {
  const response = await request.get(rootUrl + '/projects')

  return await response.body
}

async function checkRepo(name: string): Promise<boolean> {
  const response = await request.get(rootUrl + '/projects/' + name)

  return await response.body
}
