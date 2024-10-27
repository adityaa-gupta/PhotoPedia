// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbKCXaD3iWBtlGnNQYJ8gux6Xehvpsnws",
  authDomain: "photoapp-62498.firebaseapp.com",
  projectId: "photoapp-62498",
  storageBucket: "photoapp-62498.appspot.com",
  messagingSenderId: "924523786296",
  appId: "1:924523786296:web:97ede35b3ea196f516b6cd",
  measurementId: "G-EDTX9MKCJG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const storage = getStorage(app);

export default db;