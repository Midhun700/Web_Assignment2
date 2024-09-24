// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';          // Import getAuth
import { getFirestore } from 'firebase/firestore'; // Import getFirestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcrVhu49r4lTlByqSl43Q6AM_zxQ4dzv8",
  authDomain: "movie-rating-3ccad.firebaseapp.com",
  projectId: "movie-rating-3ccad",
  storageBucket: "movie-rating-3ccad.appspot.com",
  messagingSenderId: "224307191614",
  appId: "1:224307191614:web:35406601bf11899010166f",
  measurementId: "G-Y1T7CYVKJH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // Firestore

export { auth };
export { db };