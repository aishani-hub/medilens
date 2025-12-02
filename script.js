// Medicine database
const medicineDatabase = [
  { name: "Paracetamol", ingredients: ["paracetamol"] },
  { name: "Crocin", ingredients: ["paracetamol", "caffeine"] },
  { name: "Amoxicillin", ingredients: ["amoxicillin"] },
  { name: "Cetirizine", ingredients: ["cetirizine"] },
  { name: "Ibuprofen", ingredients: ["ibuprofen"] },
  { name: "Aspirin", ingredients: ["aspirin"] },
  { name: "Ranitidine", ingredients: ["ranitidine"] },
  { name: "Metformin", ingredients: ["metformin"] },
  { name: "Omeprazole", ingredients: ["omeprazole"] },
  { name: "Azithromycin", ingredients: ["azithromycin"] },
  { name: "Loratadine", ingredients: ["loratadine"] },
  { name: "Diclofenac", ingredients: ["diclofenac"] },
  { name: "Cefixime", ingredients: ["cefixime"] },
  { name: "Levofloxacin", ingredients: ["levofloxacin"] },
  { name: "Metronidazole", ingredients: ["metronidazole"] },
  { name: "Pantoprazole", ingredients: ["pantoprazole"] },
  { name: "Doxycycline", ingredients: ["doxycycline"] },
  { name: "Tramadol", ingredients: ["tramadol"] },
  { name: "Prednisolone", ingredients: ["prednisolone"] },
  { name: "Hydrocortisone", ingredients: ["hydrocortisone"] },
  { name: "Benadryl Cough Syrup", ingredients: ["diphenhydramine", "dextromethorphan"] },
  { name: "Delsym", ingredients: ["dextromethorphan"] },
  { name: "Vicks Cough Syrup", ingredients: ["guaifenesin", "menthol"] },
  { name: "Bromhexine Syrup", ingredients: ["bromhexine"] },
  { name: "Ascoril Cough Syrup", ingredients: ["guaifenesin", "ambroxol", "terbutaline"] },
  { name: "Corex Cough Syrup", ingredients: ["codeine", "chlorpheniramine"] },
  { name: "Tixylix Syrup", ingredients: ["levodropropizine"] },
  { name: "Himalaya Koflet", ingredients: ["Adhatoda vasica", "Glycyrrhiza glabra"] },
  { name: "Tixylix DM", ingredients: ["dextromethorphan", "levodropropizine"] }
];

// Elements
const submitBtn = document.getElementById("submitBtn");
const resultText = document.getElementById("resultText");
const resultBox = document.getElementById("resultBox");

submitBtn.addEventListener("click", () => {
    const name = document.getElementById("patientName").value.trim();
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
