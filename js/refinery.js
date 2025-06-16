function formatTime(seconds) {
  seconds = Math.round(seconds);
  if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    return `${minutes}m ${remaining}s`;
  }
  return `${seconds}s`;
}

function calculateRefinery() {
  const secondsPerOil = 3.33;
  const woodPerOil = 2.22;
  const gasPerOil = 3;

  let wood = parseFloat(document.getElementById("wood").value);
  let oil = parseFloat(document.getElementById("oil").value);

  if ((isNaN(wood) || wood <= 0) && (isNaN(oil) || oil <= 0)) {
    document.getElementById("result").innerText = "Please enter a positive number for wood or oil.";
    return;
  }

  if (isNaN(wood) || wood <= 0) {
    wood = Math.ceil(oil * woodPerOil);
  } else if (isNaN(oil) || oil <= 0) {
    oil = Math.floor(wood / woodPerOil);
  }

  const time = oil * secondsPerOil;
  const woodNeeded = Math.ceil(oil * woodPerOil);
  const oilNeeded = Math.ceil(oil);
  const gasOutput = oilNeeded * gasPerOil;

  document.getElementById("result").innerText =
    `⏱️ Time: ${formatTime(time)}\n🌲 Wood needed: ${woodNeeded}\n🛢️ Crude refined: ${oilNeeded}\n⛽ Gas output: ${gasOutput}`;
}
