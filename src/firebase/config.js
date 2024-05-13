import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
    // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    apiKey: "AIzaSyDZTa7uV_qKHLEcaOvtV-rBYYpI3gcCtbM",
    authDomain: "nexttodo-d6b9b.firebaseapp.com",
    projectId: "nexttodo-d6b9b",
    storageBucket: "nexttodo-d6b9b.appspot.com",
    messagingSenderId: "638981803814",
    appId: "1:638981803814:web:335f40568f071fd0543be7",
    measurementId: "G-6GTKQDV4CP"
};

// Initialize Firebase
let firebase_app = initializeApp(firebaseConfig) ;

export default firebase_app;