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

//if clicking on "current" button

function showWeatherConditions(response) {
  document.querySelector("#currentLocation").innerHTML = response.data.name;
  document.querySelector("#currentTemperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector(".currentSummary").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed)
  document.querySelector("#currentWeatherIcon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#currentWeatherIcon").setAttribute("alt", response.data.weather[0].description);
}

function submitLocation(location) {
  location.preventDefault(); // prevents the page to reload 
  let searchLocation = document.querySelector("#searchLocation");
  let city = searchLocation.value;
  let apiKey = "438a48e6e3520c991ec767d5c91e5269";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherConditions);
}

function getCurrentWeather(position) {
  let apiKey = "438a48e6e3520c991ec767d5c91e5269";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.latitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentWeather);
}

//if typing a city name
let formSearch = document.querySelector("#formSearch");
formSearch.addEventListener("submit", submitLocation);
//considering that the user can also click on "search" in addition to press enter
let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", submitLocation);

//if clicking in "current"
let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);