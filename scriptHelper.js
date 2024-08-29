// Write your helper functions here!

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
// Here is the HTML formatting for our mission target div.
/*
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
    */
// }

function validateInput(testInput) {
  if (testInput === "") {
    // alert("All fields are required!");
    return "Empty";
  } else if (isNaN(testInput)) {
    return "Not a Number";
  } else {
    return "Is a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  let h2 = document.getElementById("launchStatus");
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let fuelStatus = document.getElementById("fuelStatus");
  let cargoStatus = document.getElementById("cargoStatus");
  let minFuel = 10000;
  let maxWeight = 10000;

  if (fuelLevel < minFuel || cargoLevel > maxWeight) {
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
  if (cargoLevel > maxWeight) {
    cargoStatus.innerHTML = "Cargo mass too heavy for launch";
  } else {
    cargoStatus.innerHTML = "Cargo mass low enough for launch";
  }
}

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch().then(function (response) {});

  return planetsReturned;
}

function pickPlanet(planets) {}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
