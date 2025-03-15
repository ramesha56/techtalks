

import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// NAVBAR
onAuthStateChanged(auth, (user) => {
    const navLinks = document.getElementById("nav-links");
    const profileSection = document.getElementById("profile-section");

    if (user) {

        const userEmail = user.email;
        const firstLetter = userEmail.charAt(0).toUpperCase();

        navLinks.innerHTML = `
            <li><a href="index.html">Home</a></li>
       <li> <a href="write.html" class="write-icon">Add Blog
                    <i class="fas fa-pen"></i> 
                    <span class="tooltip">Write</span>
                </a></li>

      <li><a href="fav.html" class="write-icon">Favorites
                    <i class="fa fa-heart"></i>
                    <span id="favCount">0</span>
                    <span class="tooltip">fav</span>
                </a></li>

            <li>
                <div id="user-avatar" style="
                    display: inline-block;
                    width: 35px;
                    height: 35px;
                    background-color: #f1c40f;
                    color: white;
                    font-size: 18px;
                    font-weight: bold;
                    text-align: center;
                    line-height: 35px;
                    border-radius: 50%;
                    cursor: pointer;
                ">${firstLetter}</div>
            </li>
            <li><button id="logout-btn" style="background: none; border: none; color: red; cursor: pointer;">Logout</button></li>
        `;


        if (profileSection) {
            profileSection.innerHTML = `
                <h2>Welcome, ${user.displayName || "User"}!</h2>
                <p>Email: ${userEmail}</p>
                <div id="profile-avatar" style="
                    width: 80px;
                    height: 80px;
                    background-color: #f1c40f;
                    color: white;
                    font-size: 30px;
                    font-weight: bold;
                    text-align: center;
                    line-height: 80px;
                    border-radius: 50%;
                ">${firstLetter}</div>
                <button id="logout-btn-profile" style="margin-top: 10px; padding: 5px 10px; border: none; background-color: red; color: white; cursor: pointer;">Logout</button>
            `;
        }


        document.getElementById("user-avatar")?.addEventListener("click", () => {
            window.location.href = "profile.html";
        });


        document.getElementById("logout-btn")?.addEventListener("click", logoutUser);
        document.getElementById("logout-btn-profile")?.addEventListener("click", logoutUser);

    } else {
   
        navLinks.innerHTML = `
            <li><a href="index.html">Home</a></li>
            <li><a href="signup.html">Signup</a></li>
            <li><a href="login.html">Login</a></li>
        `;

        if (profileSection) {
            profileSection.innerHTML = `<p>Please <a href="login.html">Login</a> to view your profile.</p>`;
        }
    }
});
 // LOGOUT FUNCTION
function logoutUser() {
    signOut(auth)
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Logged out!",
                text: "You have successfully logged out.",
                confirmButtonText: "OK",
                scrollbarPadding: false, // Prevents page shift
                focusConfirm: false
            }).then(() => {
                // Redirect to the homepage after the user clicks 'OK'
                window.location.href = "index.html";
            });
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `Logout failed: ${error.message}`,
                confirmButtonText: "Try Again",
                scrollbarPadding: false,
                focusConfirm: false
            });
        });
}
