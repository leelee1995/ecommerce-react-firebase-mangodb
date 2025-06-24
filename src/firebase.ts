// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDwX1M_bSMWuLUwAe9cc4US_JOWDMkfVeA",
    authDomain: "ecommerce-rfmdb.firebaseapp.com",
    projectId: "ecommerce-rfmdb",
    storageBucket: "ecommerce-rfmdb.firebasestorage.app",
    messagingSenderId: "677096525825",
    appId: "1:677096525825:web:9b079f4b8f27798814b000",
    measurementId: "G-CL1XGDHG4S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export { app as firebaseApp };
