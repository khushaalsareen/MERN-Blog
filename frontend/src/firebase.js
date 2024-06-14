// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "full-stack-blog-ffdb1.firebaseapp.com",
  projectId: "full-stack-blog-ffdb1",
  storageBucket: "full-stack-blog-ffdb1.appspot.com",
  messagingSenderId: "207607065926",
  appId: "1:207607065926:web:3aa316aff533d72a678947"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);