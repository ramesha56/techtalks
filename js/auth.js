

import { auth , db } from "./firebase-config.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// SIGNUP FUNCTION
document.getElementById("signup-btn")?.addEventListener("click", async () => {
    const name = document.getElementById("signup-name").value;
    const phone = document.getElementById("signup-phone").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    if (!name || !phone || !email || !password) {
        alert("Please fill in all fields!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            phone: phone,
            email: email,
            uid: user.uid
        });

        alert("Signup Successful! Redirecting to login...");
        window.location.href = "login.html";
    } catch (error) {
        alert(error.message);
    }
});

// LOGIN FUNCTION
document.getElementById("login-btn")?.addEventListener("click", () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Login Successful!");
            window.location.href = "index.html"; 
        })
        .catch((error) => {
            alert(error.message);
        });
});

// // LOGOUT FUNCTION
// document.getElementById("logout-btn")?.addEventListener("click", () => {
//     signOut(auth).then(() => {
//         alert("Logged out successfully!");
//         window.location.href = "index.html";
//     });
// });


// Google Sign-In Function
const googleBtn = document.querySelector('.google-btn');
const provider = new GoogleAuthProvider();

googleBtn?.addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
          
            const user = result.user;
            alert("Google Sign-In Successful!");
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
});


//// with popop

// import { auth, db } from "./firebase-config.js";
// import { 
//     createUserWithEmailAndPassword, 
//     signInWithEmailAndPassword, 
//     signOut,
//     GoogleAuthProvider,
//     signInWithPopup
// } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
// import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// // SIGNUP FUNCTION
// document.getElementById("signup-btn")?.addEventListener("click", async () => {
//     const name = document.getElementById("signup-name").value;
//     const phone = document.getElementById("signup-phone").value;
//     const email = document.getElementById("signup-email").value;
//     const password = document.getElementById("signup-password").value;

//     if (!name || !phone || !email || !password) {
//         Swal.fire({
//             icon: "error",
//             title: "⚠ Error",
//             text: "Please fill in all fields!",
//             scrollbarPadding: false, // Prevents the form jump
//             focusConfirm: false,     // Prevents focusing the modal
//             allowOutsideClick: true  // Allows closing the modal without form jump
//         });
//         return;
//     }

//     try {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;
//         await setDoc(doc(db, "users", user.uid), {
//             name: name,
//             phone: phone,
//             email: email,
//             uid: user.uid
//         });

//         Swal.fire({
//             icon: "success",
//             title: "✅ Signup Successful!",
//             text: "Redirecting to login...",
//             scrollbarPadding: false, // Prevents the form jump
//             focusConfirm: false,     // Prevents focusing the modal
//             allowOutsideClick: true  // Allows closing the modal without form jump
//         }).then(() => {
//             window.location.href = "login.html";
//         });
//     } catch (error) {
//         Swal.fire({
//             icon: "error",
//             title: "⚠ Error",
//             text: error.message,
//             scrollbarPadding: false, // Prevents the form jump
//             focusConfirm: false,     // Prevents focusing the modal
//             allowOutsideClick: true  // Allows closing the modal without form jump
//         });
//     }
// });

// // LOGIN FUNCTION
// document.getElementById("login-btn")?.addEventListener("click", () => {
//     const email = document.getElementById("login-email").value;
//     const password = document.getElementById("login-password").value;

//     signInWithEmailAndPassword(auth, email, password)
//         .then(() => {
//             Swal.fire({
//                 icon: "success",
//                 title: "✅ Login Successful!",
//                 scrollbarPadding: false, // Prevents the form jump
//                 focusConfirm: false,     // Prevents focusing the modal
//                 allowOutsideClick: true  // Allows closing the modal without form jump
//             }).then(() => {
//                 window.location.href = "index.html"; 
//             });
//         })
//         .catch((error) => {
//             Swal.fire({
//                 icon: "error",
//                 title: "⚠ Error",
//                 text: error.message,
//                 scrollbarPadding: false, // Prevents the form jump
//                 focusConfirm: false,     // Prevents focusing the modal
//                 allowOutsideClick: true  // Allows closing the modal without form jump
//             });
//         });
// });

// // LOGOUT FUNCTION
// document.getElementById("logout-btn")?.addEventListener("click", () => {
//     signOut(auth).then(() => {
//         Swal.fire({
//             icon: "success",
//             title: "✅ Logged out successfully!",
//             scrollbarPadding: false, // Prevents the form jump
//             focusConfirm: false,     // Prevents focusing the modal
//             allowOutsideClick: true  // Allows closing the modal without form jump
//         }).then(() => {
//             window.location.href = "index.html";
//         });
//     }).catch((error) => {
//         Swal.fire({
//             icon: "error",
//             title: "⚠ Error",
//             text: error.message,
//             scrollbarPadding: false, // Prevents the form jump
//             focusConfirm: false,     // Prevents focusing the modal
//             allowOutsideClick: true  // Allows closing the modal without form jump
//         });
//     });
// });

// // Google Sign-In Function
// const googleBtn = document.querySelector('.google-btn');
// const provider = new GoogleAuthProvider();

// googleBtn?.addEventListener('click', () => {
//     signInWithPopup(auth, provider)
//         .then((result) => {
//             const user = result.user;
//             Swal.fire({
//                 icon: "success",
//                 title: "✅ Google Sign-In Successful!",
//                 scrollbarPadding: false, // Prevents the form jump
//                 focusConfirm: false,     // Prevents focusing the modal
//                 allowOutsideClick: true  // Allows closing the modal without form jump
//             }).then(() => {
//                 window.location.href = "index.html";
//             });
//         })
//         .catch((error) => {
//             Swal.fire({
//                 icon: "error",
//                 title: "⚠ Error",
//                 text: error.message,
//                 scrollbarPadding: false, // Prevents the form jump
//                 focusConfirm: false,     // Prevents focusing the modal
//                 allowOutsideClick: true  // Allows closing the modal without form jump
//             });
//         });
// });
