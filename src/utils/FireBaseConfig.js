// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBDfxGZjhHeKhUNkBFo9EKpxFPX4g6asro",
  authDomain: "training-content-material.firebaseapp.com",
  projectId: "training-content-material",
  storageBucket: "training-content-material.appspot.com",
  messagingSenderId: "489395104292",
  appId: "1:489395104292:web:c1381325dfe30da78ac6b1",
  measurementId: "G-2Q979SDT5K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
