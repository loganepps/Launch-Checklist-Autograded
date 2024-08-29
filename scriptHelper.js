require("cross-fetch/polyfill");

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  let missionTarget = document.getElementById("missionTarget");
  missionTarget.innerHTML = `<h2>Mission Destination</h2>
     <ol>
     <li>Name: ${name}</li>
     <li>Diameter: ${diameter}</li>
     <li>Star: ${star}</li>
     <li>Distance from Earth: ${distance}</li>
     <li>Number of Moons: ${moons}</li>
     </ol>
     <img src="${imageUrl}">`;
}

function validateInput(testInput) {
  if (testInput === "") {
    return "Empty";
  } else if (isNaN(testInput)) {
    return "Not a Number";
  } else {
    return "Is a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
  if (
    validateInput(pilot) === "Empty" ||
    validateInput(copilot) === "Empty" ||
    validateInput(fuelLevel) === "Empty" ||
    validateInput(cargoMass) === "Empty"
  ) {
    alert("All fields are required!");
    return;
  }
  if (
    validateInput(fuelLevel) === "Not a Number" ||
    validateInput(cargoMass) === "Not a Number"
  ) {
    alert("Fuel Level and Cargo Mass must be numbers!");
    return;
  }
  if (
    validateInput(pilot) === "Is a Number" ||
    validateInput(copilot) === "Is a Number"
  ) {
    alert("Pilot and Co-pilot names can't be numbers!");
    return;
  }

  let h2 = document.getElementById("launchStatus");
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let fuelStatus = document.getElementById("fuelStatus");
  let cargoStatus = document.getElementById("cargoStatus");
  let minFuel = 10000;
  let maxWeight = 10000;

  if (fuelLevel < minFuel || cargoMass > maxWeight) {
    list.style.visibility = "visible";
    h2.innerHTML = "Shuttle Not Ready for Launch";
    h2.style.color = "red";
  } else {
    list.style.visibility = "visible";
    h2.innerHTML = "Shuttle is Ready for Launch";
    h2.style.color = "green";
  }

  pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
  copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

  if (fuelLevel < minFuel) {
    fuelStatus.innerHTML = "Fuel level too low for launch";
  } else {
    fuelStatus.innerHTML = "Fuel level high enough for launch";
  }

  if (cargoMass > maxWeight) {
    cargoStatus.innerHTML = "Cargo mass too heavy for launch";
  } else {
    cargoStatus.innerHTML = "Cargo mass low enough for launch";
  }
}

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    return response.json();
  });

  return planetsReturned;
}

function pickPlanet(planets) {
  let randomPlanetIndex = Math.floor(Math.random() * planets.length);
  return planets[randomPlanetIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
