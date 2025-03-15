// Import necessary Firebase modules
import { 
    getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged 
} from "firebase/auth";
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

// UI Elements
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userProfile = document.getElementById('user-profile');
const userPhoto = document.getElementById('user-photo');
const userName = document.getElementById('user-name');

// Google Login Function
async function googleLogin() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        updateUI(user);
        alert(`Welcome, ${user.displayName}!`);
    } catch (error) {
        console.error("Login Failed:", error);
        alert(`Login Failed! ${error.message}`);
    }
}

// Logout Function
async function logout() {
    try {
        await signOut(auth);
        resetUI();
        alert("Logged out successfully.");
    } catch (error) {
        console.error("Logout Failed:", error);
        alert(`Logout Failed! ${error.message}`);
    }
}

// Update UI on Authentication State Change
onAuthStateChanged(auth, (user) => {
    if (user) {
        updateUI(user);
    } else {
        resetUI();
    }
});

// Function to Update UI on Login
function updateUI(user) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
    userProfile.style.display = 'flex';
    
    userPhoto.src = user.photoURL;
    userName.textContent = user.displayName;
}

// Function to Reset UI on Logout
function resetUI() {
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    userProfile.style.display = 'none';
    
    userPhoto.src = '';
    userName.textContent = '';
}
