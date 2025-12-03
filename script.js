// Medicine database
const medicineDatabase = [
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
  // Added more common medicines
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

// Elements
const submitBtn = document.getElementById("submitBtn");
const resultText = document.getElementById("resultText");
const resultBox = document.getElementById("resultBox");

submitBtn.addEventListener("click", () => {
    const name = document.getElementById("patientName").value.trim();

    // Validate name to ensure it contains only letters and spaces
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
        resultBox.style.borderColor = "#ef6c00";
        resultText.textContent = "⚠️ Please enter a valid name (letters and spaces only)!";
        return;
    }

    const medicineInput = document.getElementById("medicine").value.trim().toLowerCase();
    const allergies = document.getElementById("allergies").value.trim().toLowerCase().split(",").map(a => a.trim());

    if (!name || !medicineInput) {
        resultBox.style.borderColor = "#ef6c00";
        resultText.textContent = "⚠️ Please enter patient name and medicine!";
        return;
    }

    const foundMedicine = medicineDatabase.find(m => m.name.toLowerCase() === medicineInput);

    if (!foundMedicine) {
        resultBox.style.borderColor = "#ef6c00";
        resultText.textContent = `⚠️ Medicine "${medicineInput}" not found in database.`;
        return;
    }

    const riskyIngredient = foundMedicine.ingredients.find(ing => allergies.includes(ing.toLowerCase()));

    if (riskyIngredient) {
        resultBox.style.borderColor = "#c62828";
        resultText.textContent = `${name} → ${foundMedicine.name} contains ingredient "${riskyIngredient}" which is allergic! ⚠️`;
    } else {
        resultBox.style.borderColor = "#2e7d32";
        resultText.textContent = `${name} → ${foundMedicine.name} is safe. ✅`;
    }
});
