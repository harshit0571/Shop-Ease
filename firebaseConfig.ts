// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjYOyP2gH2Cen-NDq9JR4MpLfPaOofE_k",
  authDomain: "shopease-6e338.firebaseapp.com",
  projectId: "shopease-6e338",
  storageBucket: "shopease-6e338.appspot.com",
  messagingSenderId: "69148097591",
  appId: "1:69148097591:web:9e7a7628c19548fdf993b2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
