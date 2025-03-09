// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCKVefsYtGZIXVqk_3BbrdFZH-5dTPz9uw',
  authDomain: 'coinbitdex.firebaseapp.com',
  projectId: 'coinbitdex',
  storageBucket: 'coinbitdex.firebasestorage.app',
  messagingSenderId: '384638688643',
  appId: '1:384638688643:web:965d2825772223cf486ab6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
