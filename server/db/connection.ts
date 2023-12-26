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
const datacord = getFirestore(
  initializeApp(
    {
      apiKey: process.env.DATACORD_KEY,
      authDomain: 'datacord-db.firebaseapp.com',
      projectId: 'datacord-db',
      storageBucket: 'datacord-db.appspot.com',
      messagingSenderId: '590361883150',
      appId: '1:590361883150:web:cf62a24d59b3b71173825f',
      measurementId: 'G-X5FM6KYXKM',
    },
    'datacord',
  ),
)

// Portfolio Firebase setup
const portfolio = getFirestore(
  initializeApp(
    {
      apiKey: process.env.PORTFOLIO_KEY,
      authDomain: 'portfolio-storage-db.firebaseapp.com',
      projectId: 'portfolio-storage-db',
      storageBucket: 'portfolio-storage-db.appspot.com',
      messagingSenderId: '87319847877',
      appId: '1:87319847877:web:4df2873ab307916251a1ac',
    },
    'portfolio',
  ),
)

export default {
  datacord,
  portfolio,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
}
