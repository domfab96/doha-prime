// src/firebase.js
// ─── Firebase configuration (same project as FarmTrack app) ───────────────
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, onSnapshot, getDoc } from 'firebase/firestore'

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyCImrn14zzGZE8u8ruhYn2dOMiD6sMFz1U",
  authDomain:        "doha-farms.firebaseapp.com",
  projectId:         "doha-farms",
  storageBucket:     "doha-farms.firebasestorage.app",
  messagingSenderId: "423700456092",
  appId:             "1:423700456092:web:88dec462aa08ae8af00359",
  measurementId:     "G-ZT7H44DR4C"
}

// Pond definitions (must match FarmTrack exactly)
export const POND_DEFS = [
  { id: 'P1', name: 'Pond 1', capacity: 8000 },
  { id: 'P2', name: 'Pond 2', capacity: 4000 },
  { id: 'P3', name: 'Pond 3', capacity: 3000 },
  { id: 'P4', name: 'Pond 4', capacity: 1005 },
  { id: 'P5', name: 'Pond 5', capacity: 1005 },
]

const app = initializeApp(FIREBASE_CONFIG)
export const db  = getFirestore(app)

// The single Firestore document that holds ALL farm data
export const FARM_DOC_REF = doc(db, 'farm', 'data')

export { onSnapshot, getDoc }
