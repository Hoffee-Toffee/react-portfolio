import firebase from './connection.ts'

export async function getSneezeData(): Promise<object | null> {
  const docRef = firebase.collection(firebase.datacord, 'data')
  const docSnap = await firebase.getDocs(docRef)
  const doc = docSnap.docs.find((doc) => doc.id == 'sneezeData')
  return doc ? JSON.parse(doc.data().data) : null
}

export async function getProjectData(): Promise<object> {
  const docRef = firebase.collection(firebase.portfolio, 'projects')
  const docSnap = await firebase.getDocs(docRef)
  const docs: { [key: string]: object } = {}
  docSnap.docs.forEach((doc) => (docs[doc.id] = doc.data()))
  return docs
}

export async function checkSecret(secret: string): Promise<string | null> {
  const docRef = firebase.collection(firebase.portfolio, 'secrets')
  const docSnap = await firebase.getDocs(docRef)
  return docSnap.docs.find((doc) => doc.id == secret)?.data().location
}
