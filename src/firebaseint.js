// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR1JzciftafDyBvaa2V45xzIQHKykMwNc",
  authDomain: "blogging-app-15204.firebaseapp.com",
  projectId: "blogging-app-15204",
  storageBucket: "blogging-app-15204.appspot.com",
  messagingSenderId: "979814902029",
  appId: "1:979814902029:web:76c7af5531f8cba6db6844"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);