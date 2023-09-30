import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZaY59XzMTdhiPQTh8QNjuX-N53O0wMo8",
  authDomain: "messaging-9eb4c.firebaseapp.com",
  projectId: "messaging-9eb4c",
  storageBucket: "messaging-9eb4c.appspot.com",
  messagingSenderId: "295074047718",
  appId: "1:295074047718:web:ec27820ec10b9679d4fd27",
  measurementId: "G-K0S6MTJGP6",
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore();
export const auth = getAuth(app);
// const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
