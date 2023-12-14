import firebase from './connection.ts'
import { SneezeData } from '../../models/sneezeData.ts'

export async function getSneezeData(): Promise<SneezeData[]> {
  if (true)
    return {
      count: 2003,
      updated: 1700092155656,
      calendar: {
        '31/10/2023': { count: 21, confirmed: true },
        '1/11/2023': { count: 10, confirmed: true },
        '2/11/2023': { count: 17, confirmed: true },
        '3/11/2023': { count: 17, confirmed: true },
        '4/11/2023': { count: 3, confirmed: true },
        '5/11/2023': { count: 1, confirmed: true },
        '6/11/2023': { count: 7, confirmed: true },
        '7/11/2023': { count: 13, confirmed: true },
        '8/11/2023': { count: 12, confirmed: true },
        '9/11/2023': { count: 8, confirmed: true },
        '10/11/2023': { count: 16, confirmed: true },
        '11/11/2023': { count: 5, confirmed: true },
        '12/11/2023': { count: 1, confirmed: true },
        '13/11/2023': { count: 10, confirmed: true },
        '14/11/2023': { count: 10, confirmed: true },
        '15/11/2023': { count: 7, confirmed: true },
        '16/11/2023': { count: 4, confirmed: false },
      },
    }
  const docRef = firebase.collection(firebase.datacord, 'data')
  const docSnap = await firebase.getDocs(docRef)
  const doc = docSnap.docs.find((doc) => doc.id == 'sneezeData')
  return JSON.parse(doc.data().data)
}
