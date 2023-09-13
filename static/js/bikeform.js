function generateNumber() {
    var generatedNumber = Math.floor(10000 + Math.random() * 90000);
    document.getElementById('numberInput').value = generatedNumber;
  }


  function limitTextarea(event) {
    const textarea = event.target;
    const maxLength = parseInt(textarea.getAttribute("maxlength"));
    const currentLength = textarea.value.length;

    if (currentLength >= maxLength) {
      textarea.value = textarea.value.slice(0, maxLength);
    }

    const remainingChars = maxLength - currentLength;
    document.getElementById("characterCount").textContent = "Remaining characters: " + remainingChars;
  }


  



//   function limitTextarea(event) {
//     const textarea = event.target;
//     const maxLength = parseInt(textarea.getAttribute("maxlength"));
//     const currentLength = textarea.value.replace(/[^a-zA-Z\s]/g, "").length;

//     if (currentLength >= maxLength) {
//       textarea.value = textarea.value.slice(0, maxLength);
//     }

//     const remainingChars = maxLength - currentLength;
//     document.getElementById("characterCount").textContent = "Remaining characters: " + remainingChars;
//   }







//   function limitTextarea(event) {
//     const textarea = event.target;
//     const maxLength = parseInt(textarea.getAttribute("maxlength"));
//     const currentLength = textarea.value.replace(/[^a-zA-Z]/g, "").length;

//     if (currentLength >= maxLength) {
//       textarea.value = textarea.value.slice(0, maxLength);
//     }

//     const remainingChars = maxLength - currentLength;
//     document.getElementById("characterCount").textContent = "Remaining characters: " + remainingChars;
//   }

  // Function to handle file selection
function handleFileSelect(event) {
  event.preventDefault();
  const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
  const previewImage = document.getElementById('previewImage');
  const preview = document.getElementById('preview');

  if (file && file.type.match('image.*')) {
    const reader = new FileReader();

    // reader.onloadstart = function () {
    //   // Hide the preview while loading
    //   preview.style.display = 'none';
    // };

    reader.onload = function () {
      previewImage.src = reader.result;
      preview.style.display = 'block';
    };

    reader.readAsDataURL(file);
  }
}

// Function to handle drag over event
function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
}

// Add event listeners
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');

dropArea.addEventListener('dragover', handleDragOver);
dropArea.addEventListener('drop', handleFileSelect);
fileInput.addEventListener('change', handleFileSelect);
