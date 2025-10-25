import firebaseConfig from '@lib/firebaseConfig'
import { getAnalytics } from 'firebase/analytics'
import { initializeApp, getApp, getApps } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import {
  connectFirestoreEmulator,
  initializeFirestore,
} from 'firebase/firestore'
import { Platform } from 'react-native'

export const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp()

export const platformDevIP =
  Platform.OS === 'web'
    ? '127.0.0.1'
    : Platform.OS === 'android'
    ? '10.0.2.2'
    : '0.0.0.0'

const getFirebaseAuth = () => {
  const firebaseAuth = getAuth(firebaseApp)
  if (process.env.NODE_ENV !== 'production') {
    connectAuthEmulator(firebaseAuth, `http://${platformDevIP}:9099`, {
      disableWarnings: true,
    })
  }
  return firebaseAuth
}

export const auth = firebaseApp ? getFirebaseAuth() : undefined

const getFirebaseStorage = () => {
  const firebaseStorage = getStorage(firebaseApp)
  if (process.env.NODE_ENV !== 'production') {
    connectStorageEmulator(firebaseStorage, platformDevIP, 9199)
  }

  return firebaseStorage
}

export const storage = firebaseApp ? getFirebaseStorage() : undefined

const getFirebaseFirestore = () => {
  const firestoreDb = initializeFirestore(firebaseApp, {
    experimentalForceLongPolling: true,
  })
  if (process.env.NODE_ENV !== 'production') {
    connectFirestoreEmulator(firestoreDb, platformDevIP, 8080)
  }
  return firestoreDb
}

export const db = firebaseApp ? getFirebaseFirestore() : undefined

export const analytics =
  typeof window !== 'undefined' &&
  process.env.NODE_ENV === 'production' &&
  firebaseApp
    ? getAnalytics(firebaseApp)
    : undefined
