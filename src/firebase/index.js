// Import the functions you need from the SDKs you need
import { config } from "dotenv";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "iot-systems-1bd8a.firebaseapp.com",
  projectId: "iot-systems-1bd8a",
  storageBucket: "iot-systems-1bd8a.appspot.com",
  messagingSenderId: "1069916650254",
  appId: "1:1069916650254:web:5e753447c55f701ffe755f",
  measurementId: "G-TVCM2S8GC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {auth}
