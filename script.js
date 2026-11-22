// 1. Grab the HTML elements using their IDs
const countryInput = document.getElementById("country-input");
const searchBtn = document.getElementById("search-btn");
const visaCard = document.getElementById("visa-card");
const countryTitle = document.getElementById("country-title");
const visaType = document.getElementById("visa-type");
const visaFee = document.getElementById("visa-fee");
const visaTime = document.getElementById("visa-time");
const checklist = document.getElementById("checklist");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

// 2. Listen for Search button click
searchBtn.addEventListener("click", async function () {
    const selected = countryInput.value.trim();
    if (!selected) return;

    searchBtn.textContent = "Loading...";

    // 3. Ask your Python + Gemini API for ANY country
    const response = await fetch(`https://visa-tracker-0dng.onrender.com/api/visa/${selected}`);
    const data = await response.json();

    searchBtn.textContent = "Search";

    // 4. Fill in the text details
    countryTitle.textContent = data.name;
    visaType.textContent = data.type;
    visaFee.textContent = data.fee;
    visaTime.textContent = data.time;

    // 5. Clear old checkboxes and create new ones
    checklist.innerHTML = "";
    data.docs.forEach(doc => {
        const li = document.createElement("li");
        li.innerHTML = `<label><input type="checkbox" class="doc-check"> <span>${doc}</span></label>`;
        checklist.appendChild(li);
    });

    updateProgress();
    visaCard.style.display = "block";
});

// 6. Update the progress bar whenever any checkbox is clicked
checklist.addEventListener("change", updateProgress);

function updateProgress() {
    const allBoxes = document.querySelectorAll(".doc-check");
    const checkedBoxes = document.querySelectorAll(".doc-check:checked");

    const percent = allBoxes.length === 0 ? 0 : Math.round((checkedBoxes.length / allBoxes.length) * 100);
    
    progressBar.value = percent;
    progressText.textContent = `${percent}%`;
}