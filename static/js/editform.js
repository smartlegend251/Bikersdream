const openButton = document.getElementById('openButton');
const popupForm = document.getElementById('popupForm');
const numberInput = document.getElementById('numberInput');









// Open the form when the button is clicked
openButton.addEventListener('click', () => {
    popupForm.style.display = 'flex';
});

document.getElementById("popupForm").addEventListener("click", function(e) {
    if (e.target === this) {
        this.style.display = "none";
    }
});

// Generate a unique ID for the bike and set it in the input field
function generateBikeId() {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const bikeId = timestamp + random;
    numberInput.value = bikeId;
}

// Call the generateBikeId function when the form is opened
openButton.addEventListener('click', generateBikeId);

// Character limit for the description textarea
function limitTextarea(event) {
    const maxLength = 10000;
    const currentLength = event.target.value.length;
    const remainingLength = maxLength - currentLength;
    const characterCount = document.getElementById('characterCount');
    characterCount.textContent = `Remaining characters: ${remainingLength}`;
}
