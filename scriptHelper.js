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
  let someFieldsAreInvalid = false;
  if (
    validateInput(pilot) === "Empty" ||
    validateInput(copilot) === "Empty" ||
    validateInput(fuelLevel) === "Empty" ||
    validateInput(cargoMass) === "Empty"
  ) {
    alert("All fields are required!");
    someFieldsAreInvalid = true;
  }
  if (
    validateInput(fuelLevel) === "Not a Number" ||
    validateInput(cargoMass) === "Not a Number"
  ) {
    alert("Fuel Level and Cargo Mass must be numbers!");
    someFieldsAreInvalid = true;
  }
  if (
    validateInput(pilot) === "Is a Number" ||
    validateInput(copilot) === "Is a Number"
  ) {
    alert("Pilot and Co-pilot names can't be numbers!");
    someFieldsAreInvalid = true;
  }

  let h2 = document.getElementById("launchStatus");
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let fuelStatus = document.getElementById("fuelStatus");
  let cargoStatus = document.getElementById("cargoStatus");
  let minFuel = 10000;
  let maxWeight = 10000;

  if (fuelLevel < minFuel || cargoMass > maxWeight || someFieldsAreInvalid) {
    list.style.visibility = "visible";
    h2.innerHTML = "Shuttle Not Ready for Launch";
    h2.style.color = "red";
  } else {
    list.style.visibility = "visible";
    h2.innerHTML = "Shuttle is Ready for Launch";
    h2.style.color = "green";
  }

  if (validateInput(pilot) === "Empty") {
    pilotStatus.innerHTML = "Pilot name not provided";
  } else if (validateInput(pilot) === "Is a Number") {
    pilotStatus.innerHTML = "Pilot name is invalid";
  } else {
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
  }

  if (validateInput(copilot) === "Empty") {
    copilotStatus.innerHTML = "Co-pilot name not provided";
  } else if (validateInput(copilot) === "Is a Number") {
    copilotStatus.innerHTML = "Co-pilot name is invalid";
  } else {
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
  }

  if (validateInput(fuelLevel) === "Empty") {
    fuelStatus.innerHTML = "Fuel level not provided";
  } else if (validateInput(fuelLevel) === "Not a Number") {
    fuelStatus.innerHTML = "Fuel level is invalid";
  } else if (fuelLevel < minFuel) {
    fuelStatus.innerHTML = "Fuel level too low for launch";
  } else {
    fuelStatus.innerHTML = "Fuel level high enough for launch";
  }

  if (validateInput(cargoMass) === "Empty") {
    cargoStatus.innerHTML = "Cargo mass not provided";
  } else if (validateInput(cargoMass) === "Not a Number") {
    cargoStatus.innerHTML = "Cargo mass is invalid";
  } else if (cargoMass > maxWeight) {
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
