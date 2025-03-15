

// import { auth, db } from "./firebase-config.js";
// import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
// import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// onAuthStateChanged(auth, async (user) => {
//     if (user) {
//         const userDoc = await getDoc(doc(db, "users", user.uid));
//         let name = "User";
//         let email = user.email;
//         let phone = "Not Available";
//         let firstLetter = email.charAt(0).toUpperCase();

//         if (userDoc.exists()) {
//             const userData = userDoc.data();
//             name = userData.name;
//             email = userData.email;
//             phone = userData.phone;
//             firstLetter = name.charAt(0).toUpperCase();
//         }

//         // ✅ Display Initial Profile Data
//         document.getElementById("profile-name-text").textContent = name;
//         document.getElementById("profile-email-text").textContent = email;
//         document.getElementById("profile-phone-text").textContent = phone;

//         // ✅ Set Input Values (But Keep Hidden)
//         document.getElementById("profile-name-input").value = name;
//         document.getElementById("profile-email-input").value = email;
//         document.getElementById("profile-phone-input").value = phone;

//         document.getElementById("profile-avatar").textContent = firstLetter;

//         // ✅ Edit Button Functionality
//         document.getElementById("edit-btn").addEventListener("click", () => {
//             document.getElementById("profile-name-text").classList.add("hidden");
//             document.getElementById("profile-phone-text").classList.add("hidden");

//             document.getElementById("profile-name-input").classList.remove("hidden");
//             document.getElementById("profile-phone-input").classList.remove("hidden");

//             document.getElementById("update-btn").classList.remove("hidden");
//             document.getElementById("edit-btn").classList.add("hidden");
//         });

//         // ✅ Update Button Functionality
//         document.getElementById("update-btn").addEventListener("click", async () => {
//             const newName = document.getElementById("profile-name-input").value;
//             const newPhone = document.getElementById("profile-phone-input").value;

//             await updateDoc(doc(db, "users", user.uid), {
//                 name: newName,
//                 phone: newPhone
//             });

//             alert("Profile Updated!");

//             // ✅ Update UI
//             document.getElementById("profile-name-text").textContent = newName;
//             document.getElementById("profile-phone-text").textContent = newPhone;

//             document.getElementById("profile-name-text").classList.remove("hidden");
//             document.getElementById("profile-phone-text").classList.remove("hidden");

//             document.getElementById("profile-name-input").classList.add("hidden");
//             document.getElementById("profile-phone-input").classList.add("hidden");

//             document.getElementById("update-btn").classList.add("hidden");
//             document.getElementById("edit-btn").classList.remove("hidden");

//             document.getElementById("profile-avatar").textContent = newName.charAt(0).toUpperCase();
//         });
//     } else {
//         window.location.href = "login.html";
//     }
// });

// // ✅ Logout Function
// document.getElementById("logout-btn")?.addEventListener("click", () => {
//     signOut(auth).then(() => {
//         alert("Logged out successfully!");
//         window.location.href = "login.html";
//     }).catch((error) => {
//         alert(error.message);
//     });
// });

















import { auth, db } from "./firebase-config.js";
import { 
    onAuthStateChanged, signOut, updateEmail, reauthenticateWithCredential, EmailAuthProvider 
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Make sure you include the SweetAlert2 library in your HTML file
// <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        let name = "User";
        let email = user.email;  
        let phone = "Not Available";
        let firstLetter = email.charAt(0).toUpperCase();

        if (userDoc.exists()) {
            const userData = userDoc.data();
            name = userData.name || name;
            phone = userData.phone || phone;
            firstLetter = name.charAt(0).toUpperCase();
        }

        // Update profile information
        document.getElementById("profile-name-text").textContent = name;
        document.getElementById("profile-email-text").textContent = email;
        document.getElementById("profile-phone-text").textContent = phone;

        document.getElementById("profile-name-input").value = name;
        document.getElementById("profile-email-input").value = email;
        document.getElementById("profile-phone-input").value = phone;

        document.getElementById("profile-avatar").textContent = firstLetter;

        // Edit button to show inputs
        document.getElementById("edit-btn").addEventListener("click", () => {
            document.getElementById("profile-name-text").classList.add("hidden");
            document.getElementById("profile-email-text").classList.add("hidden");
            document.getElementById("profile-phone-text").classList.add("hidden");

            document.getElementById("profile-name-input").classList.remove("hidden");
            document.getElementById("profile-email-input").classList.remove("hidden");
            document.getElementById("profile-phone-input").classList.remove("hidden");

            document.getElementById("update-btn").classList.remove("hidden");
            document.getElementById("edit-btn").classList.add("hidden");
        });

        // Update button to save changes
        document.getElementById("update-btn").addEventListener("click", async () => {
            const newName = document.getElementById("profile-name-input").value;
            const newEmail = document.getElementById("profile-email-input").value;
            const newPhone = document.getElementById("profile-phone-input").value;

            try {
                if (newEmail !== email) {
                    const password = prompt("⚠ Enter your password to change email:");
                    if (!password) {
                        Swal.fire("Email change canceled.", "", "info");
                        return;
                    }

                    const credential = EmailAuthProvider.credential(user.email, password);
                    await reauthenticateWithCredential(user, credential);
                    await updateEmail(user, newEmail);
                    Swal.fire("✅ Email updated successfully!", "", "success");
                }

                await updateDoc(doc(db, "users", user.uid), {
                    name: newName,
                    phone: newPhone
                });

                Swal.fire("✅ Profile Updated!", "", "success");

                // Update the profile text and inputs
                document.getElementById("profile-name-text").textContent = newName;
                document.getElementById("profile-email-text").textContent = newEmail;
                document.getElementById("profile-phone-text").textContent = newPhone;

                document.getElementById("profile-name-text").classList.remove("hidden");
                document.getElementById("profile-email-text").classList.remove("hidden");
                document.getElementById("profile-phone-text").classList.remove("hidden");

                document.getElementById("profile-name-input").classList.add("hidden");
                document.getElementById("profile-email-input").classList.add("hidden");
                document.getElementById("profile-phone-input").classList.add("hidden");

                document.getElementById("update-btn").classList.add("hidden");
                document.getElementById("edit-btn").classList.remove("hidden");

                document.getElementById("profile-avatar").textContent = newName.charAt(0).toUpperCase();

            } catch (error) {
                Swal.fire("⚠ Error", error.message, "error");
            }
        });

    } else {
        window.location.href = "login.html";
    }
});

// Logout Button
document.getElementById("logout-btn").addEventListener("click", () => {
    signOut(auth).then(() => {
        Swal.fire("✅ Logged out successfully!", "", "success").then(() => {
            window.location.href = "index.html";
        });
    }).catch((error) => {
        Swal.fire("⚠ Error", error.message, "error");
    });
});
