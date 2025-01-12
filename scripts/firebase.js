// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDSqts518Z55zZTTNmeuQmVZq37jH_fZdQ",
    authDomain: "economy-education.firebaseapp.com",
    databaseURL: "https://economy-education-default-rtdb.firebaseio.com",
    projectId: "economy-education",
    storageBucket: "economy-education.firebasestorage.app",
    messagingSenderId: "1057722381406",
    appId: "1:1057722381406:web:cb979af402697e9895b0cf",
    measurementId: "G-K92EXK24BF"
};


// Firebase 초기화
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase 모듈 내보내기
export const auth = getAuth(app);
export const database = getDatabase(app);