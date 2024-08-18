
// firebase.js (or wherever you have the Firebase configuration)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFkW628qUZn2zahE9pMVTuUqfKrh5Qvoo",
  authDomain: "realestate-mern-6e436.firebaseapp.com",
  projectId: "realestate-mern-6e436",
  storageBucket: "realestate-mern-6e436.appspot.com",
  messagingSenderId: "714976465484",
  appId: "1:714976465484:web:219f88f34330897f2ddae9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
