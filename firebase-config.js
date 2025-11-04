// firebase-config.js
// Replace with your own Firebase config keys
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyArChDRFsV9V-PmpDdhYxB3FnqN69RVnAI",
  authDomain: "shukku-list.firebaseapp.com",
  projectId: "shukku-list",
  storageBucket: "shukku-list.firebasestorage.app",
  messagingSenderId: "11625002783",
  appId: "1:11625002783:web:8776c517ff9bc4d266222a",
  measurementId: "G-7SW8GVLQ90"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
