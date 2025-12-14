// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATVWLVcEBoX3nywWb_fzA_5UH8mre7G4Y",
  authDomain: "learnovaproj.firebaseapp.com",
  projectId: "learnovaproj",
  storageBucket: "learnovaproj.appspot.com",  // <-- FIXED!!!
  messagingSenderId: "535449833584",
  appId: "1:535449833584:web:24543c33d7aa5c2da224b5",
  measurementId: "G-CDQGZB1M6M"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
