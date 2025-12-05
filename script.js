// Medicine database
const medicineDatabase = [
    { name: "Crocin", ingredients: ["paracetamol", "starch"] },
    { name: "Salon", ingredients: ["methyl salicylate", "menthol"] },
    { name: "Cough Syrup", ingredients: ["dextromethorphan", "guaifenesin"] },
    { name: "Paracetamol", ingredients: ["paracetamol", "starch"] },
    { name: "Ibuprofen", ingredients: ["ibuprofen", "cellulose"] },
    { name: "Amoxicillin", ingredients: ["amoxicillin", "magnesium stearate"] },
    { name: "Cetirizine", ingredients: ["cetirizine", "lactose"] },
    { name: "Aspirin", ingredients: ["aspirin", "corn starch"] },
    { name: "Ranitidine", ingredients: ["ranitidine", "microcrystalline cellulose"] },
    { name: "Metformin", ingredients: ["metformin", "povidone"] },
    { name: "Omeprazole", ingredients: ["omeprazole", "sodium bicarbonate"] },
    { name: "Azithromycin", ingredients: ["azithromycin", "calcium phosphate"] },
    { name: "Loratadine", ingredients: ["loratadine", "sodium starch glycolate"] },
    { name: "Diclofenac", ingredients: ["diclofenac", "silicon dioxide"] },
    { name: "Cefixime", ingredients: ["cefixime", "talc"] },
    { name: "Levofloxacin", ingredients: ["levofloxacin", "magnesium stearate"] },
    { name: "Metronidazole", ingredients: ["metronidazole", "starch"] },
    { name: "Pantoprazole", ingredients: ["pantoprazole", "mannitol"] },
    { name: "Doxycycline", ingredients: ["doxycycline", "lactose"] },
    { name: "Tramadol", ingredients: ["tramadol", "microcrystalline cellulose"] }
];

// DOM elements
const medicineInput = document.getElementById("medicineInput");
const medicineDropdown = document.getElementById("medicineDropdown");
const submitBtn = document.getElementById("submitBtn");
const resultText = document.getElementById("resultText");
const resultBox = document.getElementById("resultBox");

// Fill dropdown
medicineDatabase.forEach(med => {
    const option = document.createElement("option");
    option.value = med.name.toLowerCase();
    option.textContent = med.name;
    medicineDropdown.appendChild(option);
});

// Show/hide input when selecting "other"
medicineDropdown.addEventListener("change", () => {
    if (medicineDropdown.value === "other") {
        medicineInput.style.display = "block";
        medicineInput.value = "";
        medicineInput.focus();
    } else {
        medicineInput.style.display = "none";
        medicineInput.value = medicineDropdown.value;
    }
});

// Submit check
submitBtn.addEventListener("click", () => {

    const name = document.getElementById("patientName").value.trim();

    // final medicine value
    const medicine =
        medicineDropdown.value === "other"
            ? medicineInput.value.trim().toLowerCase()
            : medicineDropdown.value.trim().toLowerCase();

    const allergies = document.getElementById("allergies").value
        .toLowerCase()
        .split(",")
        .map(a => a.trim())
        .filter(a => a);

    if (!name || !medicine) {
        resultBox.style.borderColor = "#ef6c00";
        resultText.textContent = "⚠️ Please enter patient name and medicine!";
        return;
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
        resultBox.style.borderColor = "#ef6c00";
        resultText.textContent = "⚠️ Name must contain only letters!";
        return;
    }

    const found = medicineDatabase.find(m => m.name.toLowerCase() === medicine);
    if (!found) {
        resultBox.style.borderColor = "#ef6c00";
        resultText.textContent = `⚠️ Medicine "${medicine}" not found in database.`;
        return;
    }

    const risk = found.ingredients.find(ing =>
        allergies.includes(ing.toLowerCase())
    );

    if (risk) {
        resultBox.style.borderColor = "#c62828";
        resultText.textContent =
            `${name} → ${found.name} contains "${risk}" which is allergic! ⚠️`;
    } else {
        resultBox.style.borderColor = "#2e7d32";
        resultText.textContent = `${name} → ${found.name} is safe. ✅`;
    }
});


