
// firebase.js (or wherever you have the Firebase configuration)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "realestate-mern-6e436.firebaseapp.com",
  projectId: "realestate-mern-6e436",
  storageBucket: "realestate-mern-6e436.appspot.com",
  messagingSenderId: "714976465484",
  appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
