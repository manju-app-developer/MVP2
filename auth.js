// Import necessary Firebase modules
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase Configuration (Replace with your actual keys)
const firebaseConfig = {
  apiKey: "AIzaSyBr0k-tSymwI_yqTRSNL3jxu30WbFzJ4ak",
  authDomain: "travelgram-260aa.firebaseapp.com",
  projectId: "travelgram-260aa",
  storageBucket: "travelgram-260aa.appspot.com",
  messagingSenderId: "784349147253",
  appId: "1:784349147253:web:828d603cdb1d4318cec83c",
  measurementId: "G-C4NFTWY0VX"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Login Function
function googleLogin() {
    signInWithPopup(auth, provider)
        .then(result => {
            const user = result.user;
            document.getElementById('login-btn').style.display = 'none';
            document.getElementById('logout-btn').style.display = 'block';
            alert(`Welcome, ${user.displayName}!`);
        })
        .catch(error => {
            console.error("Login Failed:", error);
            alert("Login Failed! Please try again.");
        });
}

// Logout Function
function logout() {
    signOut(auth)
        .then(() => {
            document.getElementById('login-btn').style.display = 'block';
            document.getElementById('logout-btn').style.display = 'none';
            alert("Logged out successfully.");
        })
        .catch(error => {
            console.error("Logout Failed:", error);
            alert("Logout Failed! Please try again.");
        });
}

// Track User Authentication State
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('logout-btn').style.display = 'block';
    } else {
        document.getElementById('login-btn').style.display = 'block';
        document.getElementById('logout-btn').style.display = 'none';
    }
});
