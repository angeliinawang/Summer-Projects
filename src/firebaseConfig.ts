// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBqVC0tZgPrqqwha3pyZZtYLYsZdM6xCro",
    authDomain: "expenses-summary.firebaseapp.com",
    databaseURL: "https://expenses-summary-default-rtdb.firebaseio.com/",
    projectId: "expenses-summary",
    storageBucket: "expenses-summary.appspot.com",
    messagingSenderId: "708291813056",
    appId: "1:708291813056:web:0d9dd9fd95b85ebe759725",
    measurementId: "G-8RRME7M0XD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth };