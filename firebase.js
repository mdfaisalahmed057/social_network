 import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
 import { getStorage } from "firebase/storage";
 const firebaseConfig = {
  apiKey: "AIzaSyDTDxFhepT3JSfjypmKbheGLLmptZifLYo",
  authDomain: "social-network-45837.firebaseapp.com",
  projectId: "social-network-45837",
  storageBucket: "social-network-45837.appspot.com",
  messagingSenderId: "272863722128",
  appId: "1:272863722128:web:cf25fdaec191908bdcb615",
  measurementId: "G-X6XP8BVV7Y"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore()
export const auth=getAuth()
