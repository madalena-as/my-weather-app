//DATE AND TIME SECTION

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let currentWeekDay = document.querySelector("#currentWeekDay");
currentWeekDay.innerHTML = day;

function formatTime(currentTime) {
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentHour}:${currentMinutes}`;
}

let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = formatTime(currentTime);

//TEMPERATURE SECTION

// 1.1 First function - submit search form and substitute the city name
function submitLocation(event) {
  event.preventDefault();
  let currentLocation = document.querySelector("#currentLocation");
  let searchLocation = document.querySelector("#searchLocation");
  currentLocation.innerHTML =
    searchLocation.value[0].toUpperCase() + searchLocation.value.slice(1);
}

let formSearch = document.querySelector("#formSearch");
formSearch.addEventListener("submit", submitLocation);

//1.2 Second function - getting the temperature of the city typed


let apiKey = "438a48e6e3520c991ec767d5c91e5269";

function changeTemperature() {
  let searchLocation = document.querySelector("#searchLocation");
  let city = searchLocation.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
formSearch.addEventListener("submit", changeTemperature);

function showTemperature(response) {
  let currentTemperature = document.querySelector("#currentTemperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
}

function getCurrentCoordinates(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let currentLocation = document.querySelector("#currentLocation");
  currentLocation.innerHTML = `${lat},${long}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentCoordinates);
}

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

//if clicking on "current" button