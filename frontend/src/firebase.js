// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHxoNWOlKp3QJJaJI6i-4Hbq-Zhg-RGJg",
  authDomain: "proiectgcc.firebaseapp.com",
  projectId: "proiectgcc",
  storageBucket: "proiectgcc.firebasestorage.app",
  messagingSenderId: "915103543065",
  appId: "1:915103543065:web:1a1481a50be0ca11fadf88",
  measurementId: "G-KBF3P5DV6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };