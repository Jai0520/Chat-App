import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeuKISWNpNZcESLVSUlp8-a9zRiN11Bco",
  authDomain: "chat-appliaction-8293d.firebaseapp.com",
  projectId: "chat-appliaction-8293d",
  storageBucket: "chat-appliaction-8293d.appspot.com",
  messagingSenderId: "1029012483610",
  appId: "1:1029012483610:web:5b92a78a65b1b8a33deba3",
  measurementId: "G-JP860039NY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();