// // // Import Firebase modules
// // import { initializeApp } from "firebase/app";
// // import { getAuth } from "firebase/auth";

// // // Firebase Config (Replace with your own)


// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app);

// // export { auth };



// // ✅ Firebase CDN se correct imports
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// // ✅ Tumhara Firebase Config (Apna API key replace karo)
// const firebaseConfig = {
//     apiKey: "AIzaSyABP11HidQTd3F9amsvAw9HbjAQb5ePBdo",
//     authDomain: "ramesha-4a68d.firebaseapp.com",
//     projectId: "ramesha-4a68d",
//     storageBucket: "ramesha-4a68d.firebasestorage.app",
//     messagingSenderId: "927798250012",
//     appId: "1:927798250012:web:b54db27503287fa7d7edd9"
//   };

// // ✅ Firebase Initialize karo
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// console.log("Firebase initialized successfully!");

// export { auth };





import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyABP11HidQTd3F9amsvAw9HbjAQb5ePBdo",
    authDomain: "ramesha-4a68d.firebaseapp.com",
    projectId: "ramesha-4a68d",
    storageBucket: "ramesha-4a68d.appspot.com", 
    messagingSenderId: "927798250012",
    appId: "1:927798250012:web:b54db27503287fa7d7edd9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 
const storage = getStorage(app); 

console.log("Firebase initialized successfully!");

export { auth, db, storage }; 
