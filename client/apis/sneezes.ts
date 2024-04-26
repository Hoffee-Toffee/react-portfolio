import request from 'superagent'
import { SneezeData } from '../../models/sneezeData'
const rootUrl = '/api/v1'

export function getSneezes(): Promise<SneezeData> {
  return request.get(rootUrl + '/sneezes').then((res) => {
    return res.body
  })
}
