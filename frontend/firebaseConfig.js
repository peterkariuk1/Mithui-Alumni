// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbc1sOcYtEcXxzi7qEDoreebNlnHtWG1E",
  authDomain: "mithui-7e759.firebaseapp.com",
  projectId: "mithui-7e759",
  storageBucket: "mithui-7e759.firebasestorage.app",
  messagingSenderId: "937319455193",
  appId: "1:937319455193:web:880f97b2ca8511623fe1c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };