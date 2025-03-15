function uploadImage() {
    let fileInput = document.getElementById('file-input');
    let file = fileInput.files[0];

    if (!file) {
        alert("Please select an image first.");
        return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
        let img = document.createElement('img');
        img.src = e.target.result;
        img.classList.add("gallery-item");

        document.getElementById('gallery').appendChild(img);
        document.getElementById('upload-status').innerText = "Upload Successful!";
    };
    reader.readAsDataURL(file);
}
