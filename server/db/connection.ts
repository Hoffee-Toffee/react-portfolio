import { initializeApp } from '@firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from '@firebase/firestore'

// Datacord Firebase setup
const datacordConfig = {
  apiKey: process.env.DATACORD_KEY,
  authDomain: 'datacord-db.firebaseapp.com',
  projectId: 'datacord-db',
  storageBucket: 'datacord-db.appspot.com',
  messagingSenderId: '590361883150',
  appId: '1:590361883150:web:cf62a24d59b3b71173825f',
  measurementId: 'G-X5FM6KYXKM',
}
const datacord = getFirestore(initializeApp(datacordConfig, 'datacord'))

export default {
  datacord: datacord,
  collection: collection,
  getDocs: getDocs,
  doc: doc,
  getDoc: getDoc,
  setDoc: setDoc,
}
