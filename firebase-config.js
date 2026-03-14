/*  YourVersion – Firebase shared config
    Loaded by both index.html and crm.html BEFORE app scripts.
    Uses firebase-compat (globals: firebase.firestore(), etc.)

    ⚠️  Replace the values below with your real Firebase project config:
        https://console.firebase.google.com  →  Project settings  →  General  →  Your apps  →  Config
*/

const firebaseConfig = {
  apiKey:            "AIzaSyBYMgzmHT30wqz3DAk7sKbImnlJi3ngxn0",
  authDomain:        "yourversion-crm.firebaseapp.com",
  projectId:         "yourversion-crm",
  storageBucket:     "yourversion-crm.firebasestorage.app",
  messagingSenderId: "897908394579",
  appId:             "1:897908394579:web:a4a86ce6c6404fb2bed4a6",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
