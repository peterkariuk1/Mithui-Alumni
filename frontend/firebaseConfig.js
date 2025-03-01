// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCYPXdlWFnm_1SlsPtdJRd6tm9V1gOyHHA",
    authDomain: "alumni-dcf0c.firebaseapp.com",
    projectId: "alumni-dcf0c",
    storageBucket: "alumni-dcf0c.firebasestorage.app",
    messagingSenderId: "466290476694",
    appId: "1:466290476694:web:83809bbe52e3cb66f3e4b7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };