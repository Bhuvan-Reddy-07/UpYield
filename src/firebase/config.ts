import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBXSDtTYi0Am5-KA-HPI_y-ZiZneJ8U-mQ",
    authDomain: "upyield-41af9.firebaseapp.com",
    projectId: "upyield-41af9",
    storageBucket: "upyield-41af9.firebasestorage.app",
    messagingSenderId: "994455928573",
    appId: "1:994455928573:web:8c1f67e8d32ecc4bd80894",
    measurementId: "G-BCRDNBYVYQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
