const recipesSmallFurnace = [
  { input: "Metal Ore", output: "Metal Fragments", fuelRatio: 1.67, timePerItem: 3.33, outputQty: 1 },
  { input: "Sulfur Ore", output: "Sulfur", fuelRatio: 0.83, timePerItem: 1.67, outputQty: 1 },
  { input: "High Quality Metal Ore", output: "High Quality Metal", fuelRatio: 3.33, timePerItem: 6.67, outputQty: 1 },
  { input: "Honeycomb", output: "Jar of Honey", fuelRatio: 0.33, timePerItem: 0.67, outputQty: 1 },
  { input: "Cooked Human Meat", output: "Burnt Human Meat", fuelRatio: 10, timePerItem: 20, outputQty: 1 },
  { input: "Cooked Wolf Meat", output: "Burnt Wolf Meat", fuelRatio: 10, timePerItem: 20, outputQty: 1 },
  { input: "Empty Can Of Beans", output: "Metal Fragments", fuelRatio: 5, timePerItem: 10, outputQty: 15 },
  { input: "Empty Tuna Can", output: "Metal Fragments", fuelRatio: 5, timePerItem: 10, outputQty: 10 },
  { input: "Wood", output: "Charcoal (75%)", fuelRatio: 0, timePerItem: 2, outputQty: 0.75 },
];

const recipesElectricFurnace = [
  { input: "Metal Ore", output: "Metal Fragments", fuelRatio: 0, timePerItem: 2, outputQty: 1 },
  { input: "Sulfur Ore", output: "Sulfur", fuelRatio: 0, timePerItem: 1, outputQty: 1 },
  { input: "High Quality Metal Ore", output: "High Quality Metal", fuelRatio: 0, timePerItem: 4, outputQty: 1 },
  { input: "Honeycomb", output: "Jar of Honey", fuelRatio: 0, timePerItem: 0.4, outputQty: 1 },
  { input: "Cooked Human Meat", output: "Burnt Human Meat", fuelRatio: 0, timePerItem: 12, outputQty: 1 },
  { input: "Cooked Wolf Meat", output: "Burnt Wolf Meat", fuelRatio: 0, timePerItem: 12, outputQty: 1 },
  { input: "Empty Can Of Beans", output: "Metal Fragments", fuelRatio: 0, timePerItem: 6, outputQty: 15 },
  { input: "Empty Tuna Can", output: "Metal Fragments", fuelRatio: 0, timePerItem: 6, outputQty: 10 },
];

let currentTab = "small";
let currentRecipes = recipesSmallFurnace;

function formatTime(seconds) {
  seconds = Math.round(seconds);

  const days = Math.floor(seconds / 86400);
  seconds %= 86400;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
  parts.push(`${seconds}s`);

  return parts.join(" ");
}


function populateMaterials() {
  const select = document.getElementById("material");
  select.innerHTML = ""; // Clear previous options
  currentRecipes.forEach(recipe => {
    const option = document.createElement("option");
    option.value = recipe.input;
    option.textContent = recipe.input;
    select.appendChild(option);
  });
}

function calculateSmelting() {
  const amount = parseFloat(document.getElementById("amount").value);
  const material = document.getElementById("material").value;

  if (!material || isNaN(amount) || amount <= 0) {
    document.getElementById("smeltResult").innerText = "Please select a material and enter a valid amount.";
    return;
  }

  const recipe = currentRecipes.find(r => r.input === material);

  if (!recipe) {
    document.getElementById("smeltResult").innerText = "Recipe not found.";
    return;
  }

  const totalFuel = amount * recipe.fuelRatio;
  const totalTime = amount * recipe.timePerItem;
  const totalOutput = amount * recipe.outputQty;

  let fuelText = recipe.fuelRatio === 0 ? "No wood fuel required" : `${totalFuel.toFixed(2)} units of wood fuel required`;

  document.getElementById("smeltResult").innerText =
    `Smelting ${amount} ${material} produces ${totalOutput.toFixed(2)} ${recipe.output}.\n` +
    `${fuelText}.\n` +
    `Total smelting time: ${formatTime(totalTime)}.`;
}

function switchTab(tab) {
  if (tab === currentTab) return;
  currentTab = tab;
  currentRecipes = (tab === "small") ? recipesSmallFurnace : recipesElectricFurnace;

  // Update tab button styles
  document.querySelectorAll(".tab-button").forEach(btn => {
    btn.classList.toggle("active", btn.textContent.toLowerCase().includes(tab));
  });

  // Repopulate materials dropdown
  populateMaterials();

  // Clear results and reset amount
  document.getElementById("amount").value = 1;
  document.getElementById("smeltResult").innerText = "Result: ";
}

// Initialize page
window.addEventListener("DOMContentLoaded", () => {
  populateMaterials();
});
