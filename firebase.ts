// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlW0DgCGKCcvR7tyG3oA81HGjpJAdqWIY",
  authDomain: "whatsapp-eac35.firebaseapp.com",
  projectId: "whatsapp-eac35",
  storageBucket: "whatsapp-eac35.appspot.com",
  messagingSenderId: "783924709678",
  appId: "1:783924709678:web:9eade6d77d1a6d43dc92bf",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

export { app, db, auth, storage };
