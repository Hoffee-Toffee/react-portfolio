import firebase from './connection.ts'
import { SneezeData } from '../../models/sneezeData.ts'

export async function getSneezeData(): Promise<SneezeData[]> {
  const docRef = firebase.collection(firebase.datacord, 'data')
  const docSnap = await firebase.getDocs(docRef)
  const doc = docSnap.docs.find((doc) => doc.id == 'sneezeData')
  return JSON.parse(doc.data().data)
}

export async function getProjectData(): Promise<string[]> {
  const docRef = firebase.collection(firebase.portfolio, 'projects')
  const docSnap = await firebase.getDocs(docRef)
  const docs = {}
  docSnap.docs.forEach((doc) => (docs[doc.id] = doc.data()))
  return docs
}

export async function checkSecret(secret: string): Promise<string | null> {
  const docRef = firebase.collection(firebase.portfolio, 'secrets')
  const docSnap = await firebase.getDocs(docRef)
  return docSnap.docs.find((doc) => doc.id == secret)?.data().location
}
