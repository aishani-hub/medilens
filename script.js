// Medicine database
const medicineDatabase = [
    { name: "Crrcin", "allergyRisk": "paracetamol", "ingredients": ["paracetamol"] },
    { name: "Salon", "allergyRisk": "methyl salicylate", "ingredients": ["methyl salicylate", "menthol"] },
    { name: "Cough Syrup", "allergyRisk": "dextromethorphan", "ingredients": ["dextromethorphan", "guaifenesin"] }
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
    { name: "Tramadol", ingredients: ["tramadol", "microcrystalline cellulose"] },
    { name: "Prednisolone", ingredients: ["prednisolone", "starch"] },
    { name: "Hydrocortisone", ingredients: ["hydrocortisone", "lactose"] },
    { name: "Benadryl Cough Syrup", ingredients: ["diphenhydramine", "sucrose"] },
    { name: "Clarithromycin", ingredients: ["clarithromycin", "lactose"] },
    { name: "Ciprofloxacin", ingredients: ["ciprofloxacin", "microcrystalline cellulose"] },
    { name: "Fluconazole", ingredients: ["fluconazole", "starch"] },
    { name: "Atorvastatin", ingredients: ["atorvastatin", "calcium carbonate"] },
    { name: "Losartan", ingredients: ["losartan", "magnesium stearate"] },
    { name: "Simvastatin", ingredients: ["simvastatin", "lactose"] },
    { name: "Clopidogrel", ingredients: ["clopidogrel", "hydroxypropyl cellulose"] },
    { name: "Warfarin", ingredients: ["warfarin", "lactose"] },
    { name: "Furosemide", ingredients: ["furosemide", "starch"] },
    { name: "ORS", ingredients: ["sodium chloride", "potassium chloride"] },
    { name: "Vicks", ingredients: ["menthol", "camphor"] },
    { name: "Salbutamol", ingredients: ["salbutamol", "lactose"] },
    { name: "Glucose powder", ingredients: ["glucose", "calcium phosphate"] },
    { name: "Dextromethorphan", ingredients: ["dextromethorphan", "sucrose"] },
    { name: "Chlorpheniramine", ingredients: ["chlorpheniramine", "lactose"] },
    { name: "Domperidone", ingredients: ["domperidone", "microcrystalline cellulose"] },
    { name: "Iron + Folic Acid", ingredients: ["ferrous sulfate", "folic acid"] },
    { name: "Calcium carbonate", ingredients: ["calcium carbonate", "magnesium stearate"] },
    { name: "Multivitamins", ingredients: ["vitamin A", "vitamin D"] },
    { name: "Antacid syrup", ingredients: ["aluminium hydroxide", "magnesium hydroxide"] },
    { name: "Hydrocortisone cream", ingredients: ["hydrocortisone", "paraffin"] },
    { name: "Clotrimazole", ingredients: ["clotrimazole", "benzyl alcohol"] },
    { name: "Loperamide", ingredients: ["loperamide", "lactose"] },
    { name: "Vitamin C", ingredients: ["ascorbic acid", "sucrose"] },
    { name: "Zinc tablets", ingredients: ["zinc sulfate", "starch"] },
    { name: "Levocetirizine", ingredients: ["levocetirizine", "lactose"] },
    { name: "Naproxen", ingredients: ["naproxen", "microcrystalline cellulose"] }
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


// Sync dropdown → input
medicineDropdown.addEventListener("change", () => {
    medicineInput.value = medicineDropdown.options[medicineDropdown.selectedIndex].text;
});

// Sync input → dropdown
medicineInput.addEventListener("input", () => {
    const val = medicineInput.value.toLowerCase();
    medicineDropdown.value = val;
});


// Submit button logic
submitBtn.addEventListener("click", () => {

    const name = document.getElementById("patientName").value.trim();
    const medicine = medicineInput.value.trim().toLowerCase();
    const allergies = document.getElementById("allergies").value
        .toLowerCase()
        .split(",")
        .map(a => a.trim());

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

    // Find medicine
    const found = medicineDatabase.find(m => m.name.toLowerCase() === medicine);
    if (!found) {
        resultBox.style.borderColor = "#ef6c00";
        resultText.textContent = `⚠️ Medicine "${medicine}" not found in database.`;
        return;
    }

    // Check allergies
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

