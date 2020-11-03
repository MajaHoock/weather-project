// querySelecotr also alle HTMLs die verändern werden können





// alle funktionen
document.getElementById("london").addEventListener("click", showLondonWeather);
document.getElementById("tokyo").addEventListener("click", showTokyoWeather);
document.getElementById("bamberg").addEventListener("click", showBambergWeather);
document.getElementById("tallinn").addEventListener("click", showTallinnWeather);

function showLondonWeather(event) {
 let city = "london";
 getWeatherData(city); 
}
function showTokyoWeather(event) {
 let city = "tokyo";
 getWeatherData(city); 
}
function showBambergWeather(event) {
 let city = "bamberg";
 getWeatherData(city); 
}
function showTallinnWeather(event) {
 let city = "tallinn";
 getWeatherData(city); 
}

function showPosition(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
  axios.get(`${apiUrl}&appid=${apiKey}`).then(weatherDataBasedOnLatLon);
}

function weatherDataBasedOnLatLon(response) {
  let description = response.data.weather[0].description;
  let locationNameH2 = document.querySelector("h2");
  let temperature = document.getElementById("temperature-id");
  let temperatureDescription = document.getElementById("temperature-description");

  console.log(response, temperature);
  locationNameH2.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
  temperatureDescription.innerHTML = description;
  iconChangeHandler(description);

  document.getElementById("humidity").innerHTML = response.data.main.humidity;
  document.getElementById("wind").innerHTML = Math.round(response.data.wind.speed);
}

function iconChangeHandler(description) {
let weatherIcon = document.getElementById("header-emoji");
  if (description.toLowerCase() === "clear sky") {
    weatherIcon.innerHTML = `<i class="fas fa-sun"></i>`
  }
  if(description.toLowerCase() === "scattered clouds" || description.toLowerCase() === "few clouds") {
    weatherIcon.innerHTML = `<i class="fas fa-cloud-sun"></i>`    
  }
 if(description.toLowerCase() === "broken clouds" || description.toLowerCase() === "overcast clouds") {
    weatherIcon.innerHTML = `<i class="fas fa-cloud"></i>`
  }
  if(description.toLowerCase() === "mist" || description.toLowerCase() === "fog" || description.toLowerCase() === "squalls") {
    weatherIcon.innerHTML = `<i class="fas fa-smog"></i>`
  }
    if(description.toLowerCase() === "light snow" || description.toLowerCase() === "Snow" || description.toLowerCase() === "Heavy snow"  || description.toLowerCase() === "Sleet"  || description.toLowerCase() === "Shower Sleet"  || description.toLowerCase() === "Light Shower Sleet" || description.toLowerCase() === "Rain and snow"  || description.toLowerCase() === "Light Rain and snow"  || description.toLowerCase() === "Shower snow"  || description.toLowerCase() === "Light shower snow" || description.toLowerCase() === "Heavy shower snow"  || description.toLowerCase() === "freezing rain") {
    weatherIcon.innerHTML = `<i class="far fa-snowflake"></i>`
  }
   if(description.toLowerCase() === "thunderstorm with light rain" || description.toLowerCase() === "thunderstorm with rain" || description.toLowerCase() === "thunderstorm with heavy rain"  || description.toLowerCase() === "light thunderstorm"  || description.toLowerCase() === "thunderstorm"  || description.toLowerCase() === "heavy thunderstorm" || description.toLowerCase() === "ragged thunderstorm"  || description.toLowerCase() === "thunderstorm with drizzle"  || description.toLowerCase() === "thunderstorm with light drizzle"  || description.toLowerCase() === "thunderstorm with heavy drizzle") {
    weatherIcon.innerHTML = `<i class="fas fa-bolt"></i>`
  }
if (description.toLowerCase() === "light rain" || description.toLowerCase() === "moderate rain") {
    weatherIcon.innerHTML = `<i class="fas fa-cloud-rain"></i>`
  }
   if (description.toLowerCase() === "heavy intensity rain" || description.toLowerCase() === "very heavy rain" || description.toLowerCase() === "extreme rain" || description.toLowerCase() === "light intensity shower rain" || description.toLowerCase() === "shower rain" || description.toLowerCase() === "heavy intensity shower rain" || description.toLowerCase() === "ragged shower rain"){
 weatherIcon.innerHTML = `<i class="fas fa-cloud-showers-heavy"></i>`
  }
}

function getCurrentPosition(event) {
  if(event) {
    event.preventDefault();
  }
  navigator.geolocation.getCurrentPosition(showPosition);
} 

let locationButton = document.getElementById("location-button-id");

locationButton.addEventListener("click", getCurrentPosition);

let apiKey = "253bd9295ef9652dbc68aaa1df131546";


function showTemperature(response) {
  console.log("showTemperature response: ", response)
  document.querySelector("h2").innerHTML =  response.data.name;
  let description =  response.data.weather[0].description;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.getElementById("temperature-id");
  let descriptionElement = document.querySelector("#temperature-description");
  temperatureElement.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = description;
  iconChangeHandler(description);
}
//let city = "London"
//document.querySelector("h2").innerHTML = city.toUpperCase();
getCurrentPosition();

function getWeatherData(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.getElementById("temperature-id");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
};
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.getElementById("temperature-id");
  let temperature = temperatureElement.innerHTML;
   console.log(temperature) 
  temperature = Number(temperature); 
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);


function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h2 = document.querySelector("h2");
  if (searchInput.value) {
  h2.innerHTML = `${searchInput.value}`.toUpperCase();
  let city = searchInput.value
  getWeatherData(city); 
  console.log(city)
} else {
  alert ("Enter a city");
}
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let now = new Date();
let h5 = document.querySelector("h5");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAYX"];
let day = days[now.getDay()];

h5.innerHTML = `${day} ${hours}:${minutes}h`
