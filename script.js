// 1. Our mini database (in Week 2, we'll move this to a Python backend)
const visaData = {
    thailand: {
        name: "Thailand",
        type: "Visa-Free / eVisa (Indians)",
        fee: "₹0 (Visa-Free Scheme)",
        time: "Instant on arrival",
        docs: [
            "Valid Passport (6+ months validity)",
            "Confirmed Return Flight Tickets",
            "Hotel Booking Confirmation",
            "Proof of Funds (10,000 THB per person)"
        ]
    },
    uae: {
        name: "Dubai (UAE)",
        type: "30-Day Tourist eVisa",
        fee: "₹6,500 - ₹7,500",
        time: "3 to 5 Working Days",
        docs: [
            "Passport Front & Back Scan",
            "Passport-size Photo (White Background)",
            "Confirmed Flight Tickets",
            "Hotel Booking or Host Emirates ID"
        ]
    },
    japan: {
        name: "Japan",
        type: "Single Entry Sticker Visa",
        fee: "₹500 + VFS Charges",
        time: "5 to 7 Working Days",
        docs: [
            "Original Passport",
            "Visa Application Form + Photo",
            "Cover Letter & Day-by-Day Itinerary",
            "Last 6 Months Bank Statement",
            "ITR (Income Tax Return) / Sponsorship Letter"
        ]
    },
    brazil: {
        name: "brazil",
        type: " 90-days Visitor Visas (VIVIS)",
        fee: "₹9,600-₹10,000",
        time: "10 to 15 business days",
        docs: [
            "Original Passport",
            "Visa Application Form + Photo",
            "Travel & stay proof",
            "Financial proof",
            "Health & minors"
        ]
    },
    port: {
        name: "portugal",
        type: "Short-Stay Schengen Visa(90 days in a 180-day period)",
        fee: "₹8,100–₹9,736",
        time: "45 days to process",
        docs: [
            "Original Passport",
            "Application & Photos",
            "Travel Medical Insurance",
            "Financial proof"
        ]
    },
};

// 2. Grab the HTML elements using their IDs
const countrySelect = document.getElementById("country-select");
const visaCard = document.getElementById("visa-card");
const countryTitle = document.getElementById("country-title");
const visaType = document.getElementById("visa-type");
const visaFee = document.getElementById("visa-fee");
const visaTime = document.getElementById("visa-time");
const checklist = document.getElementById("checklist");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

// 3. Listen for when the user picks a country
countrySelect.addEventListener("change", function () {
    const selected = countrySelect.value;

    // If they pick "-- Choose a country --", hide the card
    if (!selected) {
        visaCard.style.display = "none";
        return;
    }

    const data = visaData[selected];

    // Fill in the text details
    countryTitle.textContent = data.name;
    visaType.textContent = data.type;
    visaFee.textContent = data.fee;
    visaTime.textContent = data.time;

    // Clear old checkboxes and create new ones
    checklist.innerHTML = "";
    data.docs.forEach(doc => {
        const li = document.createElement("li");
        li.innerHTML = `<label><input type="checkbox" class="doc-check"> <span>${doc}</span></label>`;
        checklist.appendChild(li);
    });

    // Reset progress and show the card
    updateProgress();
    visaCard.style.display = "block";
});

// 4. Update the progress bar whenever any checkbox is clicked
checklist.addEventListener("change", updateProgress);

function updateProgress() {
    const allBoxes = document.querySelectorAll(".doc-check");
    const checkedBoxes = document.querySelectorAll(".doc-check:checked");

    const percent = allBoxes.length === 0 ? 0 : Math.round((checkedBoxes.length / allBoxes.length) * 100);
    
    progressBar.value = percent;
    progressText.textContent = `${percent}%`;
}