// Import necessary Firebase modules
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase Configuration (Replace with your actual keys)
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID"
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
