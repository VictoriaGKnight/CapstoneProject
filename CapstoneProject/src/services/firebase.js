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
  apiKey: "AIzaSyCKQ_PqYwjV9XeejKfUggJ9NiIoFHg_WJM",
  authDomain: "capstoneproject-5e59d.firebaseapp.com",
  projectId: "capstoneproject-5e59d",
  storageBucket: "capstoneproject-5e59d.firebasestorage.app",
  messagingSenderId: "770946280918",
  appId: "1:770946280918:web:1a318648478d4c07e24877",
  measurementId: "G-Z8MPE38VH3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
