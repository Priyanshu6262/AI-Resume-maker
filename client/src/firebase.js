import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLR89EHQ6z6PJjYrW-_AjyVZhz7wGJMSo",
  authDomain: "resume-maker-cee27.firebaseapp.com",
  projectId: "resume-maker-cee27",
  storageBucket: "resume-maker-cee27.firebasestorage.app",
  messagingSenderId: "785006838202",
  appId: "1:785006838202:web:9d1b0c4c89580b8a4f1d83",
  measurementId: "G-ECB4QZZMFL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
