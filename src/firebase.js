import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { initializeApp, getApp, getApps } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwQqQjjzxR6wO4ZVOcW10VEn4EDt0yHdA",
  authDomain: "olive-46d2a.firebaseapp.com",
  projectId: "olive-46d2a",
  storageBucket: "olive-46d2a.appspot.com",
  messagingSenderId: "451671871637",
  appId: "1:451671871637:web:5bfbfd553e67d6c7c58b9c",
  measurementId: "G-JZWL9J09YV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export { db, auth, storage};