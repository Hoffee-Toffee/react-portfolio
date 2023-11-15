import firebase from './connection.ts'
import { Fruit } from '../../models/fruit.ts'

export async function getAllFruits(): Promise<Fruit[]> {
  const docRef = firebase.collection(firebase.datacord, 'data')
  const docSnap = await firebase.getDocs(docRef)
  const doc = docSnap.docs.find((doc) => doc.id == 'sneezeData')
  return JSON.parse(doc.data().data)
}
