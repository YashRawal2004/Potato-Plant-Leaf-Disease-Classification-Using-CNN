let selectedFile = null;

const fileInput = document.getElementById("file-upload");
const preview = document.getElementById("preview");
const resultDiv = document.getElementById("result");
const uploadLabel = document.getElementById("uploadLabel");
const uploadBox = document.getElementById("uploadBox");

// Toggle functionality: Upload or Reset
uploadLabel.addEventListener("click", function (e) {
  if (uploadLabel.classList.contains("reset")) {
    selectedFile = null;
    fileInput.value = "";
    preview.src = "";
    preview.style.display = "none";
    resultDiv.innerHTML = "";
    uploadLabel.textContent = "Click to select image";
    uploadLabel.classList.remove("reset");
    uploadBox.classList.remove("with-preview");
    e.preventDefault();
  }
});

fileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    selectedFile = file;
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
      uploadLabel.textContent = "Reset";
      uploadLabel.classList.add("reset");
      uploadBox.classList.add("with-preview");
    };
    reader.readAsDataURL(file);
  }
});

async function uploadImage() {
  if (!selectedFile) {
    alert("Please select an image first!");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);
  resultDiv.innerText = "Predicting... ⏳";

  try {
    const response = await fetch("http://localhost:8080/predict", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.class && data.confidence !== undefined) {
      resultDiv.innerHTML = `<strong>Class:</strong> ${data.class} <br><strong>Confidence:</strong> ${data.confidence}%`;
    } else {
      resultDiv.innerText = "Prediction failed. Please try again.";
    }
  } catch (err) {
    resultDiv.innerText = "Error contacting server.";
    console.error(err);
  }
}
