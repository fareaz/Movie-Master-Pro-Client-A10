
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrS9sPjZrIGf7CjSN-zCKbn-LKaZKCeyg",
  authDomain: "moviemaster-pro.firebaseapp.com",
  projectId: "moviemaster-pro",
  storageBucket: "moviemaster-pro.firebasestorage.app",
  messagingSenderId: "941732202855",
  appId: "1:941732202855:web:4cec4c904b8a2e8bd987c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);