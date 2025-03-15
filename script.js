// Cloudinary Configuration
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dej6zydgw/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "your_upload_preset"; // Replace with your actual upload preset

// Select elements
const fileInput = document.getElementById("file-input");
const gallery = document.getElementById("gallery");
const uploadStatus = document.getElementById("upload-status");
const uploadBtn = document.getElementById("upload-btn");

// Function to Upload Image to Cloudinary
async function uploadImage() {
    let file = fileInput.files[0];

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
fileInput.addEventListener("change", () => {
    uploadStatus.innerText = ""; // Clear previous messages
});

// Event Listener for Upload Button
uploadBtn.addEventListener("click", uploadImage);
