import firebase from './connection.ts'
import { SneezeData } from '../../models/sneezeData.ts'

export async function getSneezeData(): Promise<SneezeData[]> {
  const docRef = firebase.collection(firebase.datacord, 'data')
  const docSnap = await firebase.getDocs(docRef)
  const doc = docSnap.docs.find((doc) => doc.id == 'sneezeData')
  return JSON.parse(doc.data().data)
}
