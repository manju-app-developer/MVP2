// Cloudinary Configuration
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dej6zydgw/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "Travelgram"; // Replace with your actual upload preset

// Firebase Authentication Import
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Initialize Firebase Authentication
const auth = getAuth();

// Select elements
const fileInput = document.getElementById("file-input");
const gallery = document.getElementById("gallery");
const uploadStatus = document.getElementById("upload-status");
const uploadBtn = document.getElementById("upload-btn");
const dropArea = document.getElementById("drop-area");

// Check authentication before allowing uploads
onAuthStateChanged(auth, (user) => {
    if (user) {
        uploadBtn.disabled = false;
    } else {
        uploadBtn.disabled = true;
        uploadStatus.innerText = "Login required to upload images.";
        uploadStatus.style.color = "red";
    }
});

// Function to Upload Image to Cloudinary
async function uploadImage(file) {
    if (!file) {
        alert("Please select an image first.");
        return;
    }

    // Show loading indicator
    uploadStatus.innerText = "Uploading...";
    uploadStatus.style.color = "blue";

    // Prepare form data
    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
        let response = await fetch(CLOUDINARY_URL, {
            method: "POST",
            body: formData
        });

        if (!response.ok) throw new Error("Upload failed!");

        let data = await response.json();

        // Add image to gallery
        addImageToGallery(data.secure_url);

        uploadStatus.innerText = "Upload Successful!";
        uploadStatus.style.color = "green";
    } catch (error) {
        console.error("Upload Error:", error);
        uploadStatus.innerText = "Upload Failed! Please try again.";
        uploadStatus.style.color = "red";
    }
}

// Function to Add Image to the Gallery
function addImageToGallery(imageUrl) {
    let img = document.createElement("img");
    img.src = imageUrl;
    img.classList.add("gallery-item");

    gallery.appendChild(img);
}

// Event Listener for File Selection
fileInput.addEventListener("change", (event) => {
    uploadStatus.innerText = ""; // Clear previous messages
    let file = event.target.files[0];
    if (file) {
        uploadImage(file);
    }
});

// Drag & Drop Upload
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("drag-over");
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("drag-over");
});

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dropArea.classList.remove("drag-over");

    let file = event.dataTransfer.files[0];
    if (file) {
        uploadImage(file);
    }
});

// Event Listener for Upload Button
uploadBtn.addEventListener("click", () => {
    let file = fileInput.files[0];
    uploadImage(file);
});
