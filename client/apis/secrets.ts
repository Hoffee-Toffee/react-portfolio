import request from 'superagent'

const rootUrl = '/api/v1'

export function guessSecret(guess: string): Promise<object | null> {
  return request.get(rootUrl + '/secret/' + guess).then((res) => {
    return res.body
  })
}
