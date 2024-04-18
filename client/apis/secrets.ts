import request from 'superagent'

const rootUrl = '/api/v1'

export function guessSecret(guess): Promise<string | null> {
  return request.get(rootUrl + '/secret/' + guess).then((res) => {
    return res.body
  })
}
