// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAulstEeHaUxByH3bvu5pQQKk3l68lGqrQ",
  authDomain: "motor-vehicles-world-ad307.firebaseapp.com",
  projectId: "motor-vehicles-world-ad307",
  storageBucket: "motor-vehicles-world-ad307.appspot.com",
  messagingSenderId: "1095434315458",
  appId: "1:1095434315458:web:20fd970eb1d50aa86afd5b"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();