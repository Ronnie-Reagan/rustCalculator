const recipes = {
  gunpowder: {
    inputs: { sulfur: 1, charcoal: 1 },
    outputCount: 1,
    time: 5, // seconds
  },
  bullets: {
    inputs: { gunpowder: 1, metalFragments: 2 },
    outputCount: 10,
    time: 8,
  },
  sulfur: { inputs: {}, outputCount: 1, time: 0 },  // raw material
  charcoal: { inputs: {}, outputCount: 1, time: 0 }, // raw material
  metalFragments: { inputs: {}, outputCount: 1, time: 0 },
};

function calculateCombine() {
  const a = parseInt(document.getElementById("inputA").value);
  const b = parseInt(document.getElementById("inputB").value);
  const ratioStr = document.getElementById("ratio").value.trim();

  const [rA, rB] = ratioStr.split(":").map(Number);
  if (isNaN(a) || isNaN(b) || isNaN(rA) || isNaN(rB) || rA <= 0 || rB <= 0) {
    document.getElementById("combineResult").innerText = "Please enter valid inputs and ratio (e.g. 2:1)";
    return;
  }

  const craftableByA = Math.floor(a / rA);
  const craftableByB = Math.floor(b / rB);
  const crafts = Math.min(craftableByA, craftableByB);

  const usedA = crafts * rA;
  const usedB = crafts * rB;

  document.getElementById("combineResult").innerText =
    `🧪 You can craft ${crafts} item(s)\n🔹 Uses ${usedA} of A and ${usedB} of B`;
}
