import request from 'superagent'

const rootUrl = '/api/v1'

export function getSneezes(): Promise<string[]> {
  return request.get(rootUrl + '/sneezes').then((res) => {
    return res.body
  })
}
