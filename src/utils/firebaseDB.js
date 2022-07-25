import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
  apiKey: "AIzaSyB6ECZ-RmcA7lJ930RR5tedIAntenV3rfA",
  authDomain: "note-it-f6b35.firebaseapp.com",
  projectId: "note-it-f6b35",
  storageBucket: "note-it-f6b35.appspot.com",
  messagingSenderId: "548866437996",
  appId: "1:548866437996:web:40566bdf9942a922333949"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);
export const auth = getAuth(app)
