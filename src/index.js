// Variablen
let apiKey = "253bd9295ef9652dbc68aaa1df131546";
let temperature = null;
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = 
[
  "SUNDAY", 
  "MONDAY", 
  "TUESDAY", 
  "WEDNESDAY", 
  "THURSDAY", 
  "FRIDAY", 
  "SATURDAYX"
];
let day = days[now.getDay()];

// HTML Komponenten
let locationButton = document.getElementById("location-button-id");
let celsiusLink = document.querySelector("#celsius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");
let form = document.querySelector("#search-form");
let searchInput = document.querySelector("#search-text-input");
let h5 = document.querySelector("h5");

h5.innerHTML = `${day} ${hours}:${minutes}h`

// addEventListener
locationButton.addEventListener("click", getCurrentPosition);
form.addEventListener("submit", search);
fahrenheitLink.addEventListener("click", convertToFahrenheit);

document.getElementById("london").addEventListener("click", showLondonWeather);
document.getElementById("tokyo").addEventListener("click", showTokyoWeather);
document.getElementById("bamberg").addEventListener("click", showBambergWeather);
document.getElementById("sydney").addEventListener("click", showSydneyWeather);

// Funktionen

// Header Weather on click

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
function showSydneyWeather(event) {
 let city = "sydney";
 getWeatherData(city); 
}

// Position based data 

function showPosition(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
  axios.get(`${apiUrl}&appid=${apiKey}`).then(weatherDataBasedOnLatLon);
  //get 5 days forecast
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(forecastUrl).then(displayForecast);
}

function weatherDataBasedOnLatLon(response) {
  let description = response.data.weather[0].description;
  let locationNameH2 = document.querySelector("h2");
  let temperature = document.getElementById("temperature-id");
  let temperatureDescription = document.getElementById("temperature-description");
  let precipElement = document.getElementById("precipitation");

  locationNameH2.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
  temperatureDescription.innerHTML = description;
  iconChangeHandler(description);
  document.getElementById("humidity").innerHTML = response.data.main.humidity;
  document.getElementById("wind").innerHTML = Math.round(response.data.wind.speed);

  if  (response.data.rain){
      precipElement.innerHTML = reponse.data.rain["1h"]; 
  } else {
     precipElement.innerHTML = 0;
  }
  
  changeCurrentActivity(response)

}

// Main Weather Emoji (current) 

function iconChangeHandler(description) {
let weatherIcon = document.getElementById("header-emoji");
  if (description.toLowerCase() === "clear sky" && hours > 17) {
    weatherIcon.innerHTML = `<i class="fas fa-moon"></i>`
  }
    if (description.toLowerCase() === "clear sky" && hours < 17) {
    weatherIcon.innerHTML = `<i class="fas fa-sun"></i>`
  }
  if(description.toLowerCase() === "scattered clouds" || description.toLowerCase() === "few clouds" && hours < 17) {
    weatherIcon.innerHTML = `<i class="fas fa-cloud-sun"></i>`    
  }
  if(description.toLowerCase() === "scattered clouds" || description.toLowerCase() === "few clouds" && hours > 17) {
    weatherIcon.innerHTML = `  <i class="fas fa-cloud-moon"></i>`    
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
  if (description.toLowerCase() === "light rain" || description.toLowerCase() === "moderate rain" || description.toLowerCase() === "light intensity drizzle") {
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

function showTemperature(response) {
  document.querySelector("h2").innerHTML =  response.data.name;

  let description =  response.data.weather[0].description;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.getElementById("temperature-id");
  let descriptionElement = document.querySelector("#temperature-description");

  temperatureElement.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = description;
  iconChangeHandler(description);
  document.getElementById("humidity").innerHTML = response.data.main.humidity;
  document.getElementById("wind").innerHTML = Math.round(response.data.wind.speed);
  if (response.data.rain) {
    document.getElementById("precipitation").innerHTML = parseFloat(response.data.rain["1h"])*100;
  }
  else if(response.data.snow) {
    document.getElementById("precipitation").innerHTML = parseFloat(response.data.snow["1h"])*100;
  }
  else {
    document.getElementById("precipitation").innerHTML = "0";
  }
  changeCurrentActivity(response)
}

// 5 Day Forecast 

function displayForecast(response) {
  let fiveDayForecast = generateWeekForecast(response);
  document.getElementById("first-day").innerHTML = new Date(fiveDayForecast[0].day.substr(0, 10)).toLocaleDateString("en-EN", { weekday: "short" }); 
  document.getElementById("first-temp").innerHTML = `${Math.round(fiveDayForecast[0].temp)}° C`;
  document.getElementById("second-day").innerHTML = new Date(fiveDayForecast[1].day.substr(0, 10)).toLocaleDateString("en-En", {weekday: "short"});
  document.getElementById("second-temp").innerHTML = `${Math.round(fiveDayForecast[1].temp)}° C`;
  document.getElementById("third-day").innerHTML = new Date(fiveDayForecast[2].day.substr(0, 10)).toLocaleDateString("en-En", {weekday: "short"});
  document.getElementById("third-temp").innerHTML = `${Math.round(fiveDayForecast[2].temp)}° C`;
  document.getElementById("fourth-day").innerHTML = new Date(fiveDayForecast[3].day.substr(0, 10)).toLocaleDateString("en-En", {weekday: "short"});
  document.getElementById("fourth-temp").innerHTML = `${Math.round(fiveDayForecast[3].temp)}° C`;
  document.getElementById("fifth-day").innerHTML = new Date(fiveDayForecast[4].day.substr(0, 10)).toLocaleDateString("en-En", {weekday: "short"});
  document.getElementById("fifth-temp").innerHTML = `${Math.round(fiveDayForecast[4].temp)}° C`;


  let firstIconUrl = "http://openweathermap.org/img/wn/" + fiveDayForecast[0].icon + ".png";
  let firstIconElement = document.querySelector("#first-icon");
  let secondIconUrl = "http://openweathermap.org/img/wn/" + fiveDayForecast[1].icon + ".png";
  let secondIconElement = document.querySelector("#second-icon");
  let thirdIconUrl = "http://openweathermap.org/img/wn/" + fiveDayForecast[2].icon + ".png";
  let thirdIconElement = document.querySelector("#third-icon");
  let fourthIconUrl = "http://openweathermap.org/img/wn/" + fiveDayForecast[3].icon + ".png";
  let fourthIconElement = document.querySelector("#fourth-icon");
  let fifthIconUrl = "http://openweathermap.org/img/wn/" + fiveDayForecast[4].icon + ".png";
  let fifthIconElement = document.querySelector("#fifth-icon");

  
  firstIconElement.setAttribute("src", firstIconUrl);
  secondIconElement.setAttribute("src", secondIconUrl);
  thirdIconElement.setAttribute("src", thirdIconUrl);
  fourthIconElement.setAttribute("src", fourthIconUrl);
  fifthIconElement.setAttribute("src", fifthIconUrl);
  changeForecastActivity(fiveDayForecast);
}

function generateWeekForecast(forecastResponse) {
  fiveDayForecast = forecastResponse.data.list;
  let week = [];
console.log(forecastResponse)
  for (i = 0;  i < fiveDayForecast.length; i++) {
    if(i%8 === 0) {
      week.push({day: fiveDayForecast[i].dt_txt,
                         temp: fiveDayForecast[i].main.temp,
                         windSpeed: fiveDayForecast[i].wind.speed,
                         rain: fiveDayForecast[i].rain ? fiveDayForecast[i].rain["3h"] : 0,
                         snow: fiveDayForecast[i].snow ? fiveDayForecast[i].snow["3h"] : 0,
                         icon: fiveDayForecast[i].weather[0].icon},
                         );
    }
  }

  return week;
}

function getWeatherData(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  // add forecast
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(forecastUrl).then(displayForecast);
}

//Fahrenheit / Celsius Converter

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.getElementById("temperature-id");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
  fahrenheitLink.removeEventListener("click", convertToFahrenheit);
  celsiusLink.addEventListener("click", convertToCelsius);
};

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.getElementById("temperature-id");
  let temperature = temperatureElement.innerHTML;
   console.log(temperature) 
  temperature = Number(temperature); 
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
  celsiusLink.removeEventListener("click", convertToCelsius);
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
}
// Suchfeld
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h2 = document.querySelector("h2");
  if (searchInput.value) {
    h2.innerHTML = `${searchInput.value}`.toUpperCase();
    let city = searchInput.value
    console.log("test", city)
    getWeatherData(city); 
  } else {
    alert ("Enter a city");
  }
}

function changeCurrentActivity(response ) {
  let firstActivity = document.getElementById("first-activity");
  let secondActivity = document.getElementById("second-activity");
  let thirdActivity = document.getElementById("third-activity");
  let windSpeed= response.data.wind.speed;
  let hours = now.getHours();
  let temp = response.data.main.temp;
  let description = response.data.weather[0].main;
  let rain;
  let snow;

  response.data.rain ? rain = response.data.rain["1h"] : rain = 0;
  response.data.snow ?snow =  response.data.snow["1h"] : snow = 0; 

  if (windSpeed >= 12 && windSpeed < 19 && temp > 8 && hours < 17 && rain === 0 && snow === 0) {
    firstActivity.innerHTML = `<i class="fas fa-wind"></i> Kite Rise`
  }
  if (windSpeed < 12 && temp > 5 && hours < 17 && rain === 0 && snow === 0) {
    firstActivity.innerHTML = `<i class="fas fa-hiking"></i> Hiking`
  }
  if (windSpeed > 19 || temp <5 || hours > 19 || snow != 0 || rain != 0) {
 firstActivity.innerHTML = `<i class="fas fa-film"></i> Cinema`
  }
if (temp < -2 && rain === 0 && hours <20 || snow != 0 ) {
  secondActivity.innerHTML = `<i class="fas fa-skating"></i> Ice Skating`
}
 if (windSpeed < 12 && temp > 5 && hours < 17 && rain === 0 && snow === 0) {
   secondActivity.innerHTML = ` <i class="fas fa-tree"></i> Visit a park`
 }
 if (windSpeed > 19 || hours > 20 || rain != 0){
    secondActivity.innerHTML = `<i class="fas fa-glass-martini-alt"></i> Visit a bar`
 }
 if (temp > 20 && rain === 0 && hours < 20) {
   thirdActivity.innerHTML = `<i class="fas fa-swimmer"></i> Go swimming`
 }
  if (temp < 0 && snow != 0 && hours < 20) {
     thirdActivity.innerHTML = `<i class="fas fa-sleigh"></i> Go sledding`
 }
 if (temp < 5 || snow != 0 || rain != 0) {
      thirdActivity.innerHTML = `<i class="fas fa-hot-tub"></i> Go to sauna`
 }
 if (temp > 0 || snow === 0 || rain === 0) {
   thirdActivity.innerHTML = `<i class="fas fa-walking"></i> Go for a run`
 }
}
function getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateActivityBasedOnForecast(day) {
  let hours = now.getHours();

  if(day.temp >12 && day.rain === 0 && day.snow === 0) {
    let options = ["Hiking", "Visit a Park", "Climbing", "Take a walk"]
    let random = getRandomNumber(4)
    console.log(1, random)
    return options[random]
  }
  if(day.temp < 3 ||hours > 20 || day.rain != 0 || day.snow != 0) {
    let options = ["Cinema", "Visit a Bar", "Sauna", "Cozy café", "Book store", "Spa", "Museum"]
    let random =getRandomNumber(6)
    console.log(2,random)
    return options[random]
  }
  if(day.temp < 0 && day.rain === 0) {
    let options = ["Ice Skating", "Indoor Pool", "Sledging"]
    let random =getRandomNumber(3)
    console.log(3,random)
    return options[random]
  }
  if(day.temp > 10 && day.windSpeed > 11) {
    let options = ["Kite Rise", "Movies", "Indoor Bouldering"]
    let random = getRandomNumber(3)
     console.log(4,random)
    return options[random]
  }
  if(day.temp >=17 && day.rain === 0) {
    let options = ["Swimming", "Visit Lake", "Mini Golf"]
    let random = getRandomNumber(3)
     console.log(5,random)
    return options[random]
  }
  let random = getRandomNumber(3) 
  return ["Shopping", "Chess", "Read a book"][random]

}

function changeForecastActivity(fiveDays) {
  console.log(fiveDays)
  let firstForecastActivity = document.getElementById("first-forecast-activity");
  let secondForecastActivity = document.getElementById("second-forecast-activity");
  let thirdForecastActivity = document.getElementById("third-forecast-activity");
  let fourthForecastActivity = document.getElementById("fourth-forecast-activity");
  let fifthForecastActivity = document.getElementById("fifth-forecast-activity");

 firstForecastActivity.innerHTML = generateActivityBasedOnForecast(fiveDays[0]);
 secondForecastActivity.innerHTML = generateActivityBasedOnForecast(fiveDays[1]);
 thirdForecastActivity.innerHTML = generateActivityBasedOnForecast(fiveDays[2]);
 fourthForecastActivity.innerHTML = generateActivityBasedOnForecast(fiveDays[3]);
 fifthForecastActivity.innerHTML = generateActivityBasedOnForecast(fiveDays[4]);
  
/*
  if (windSpeed >= 12 && windSpeed < 19 && temp > 8 && hours < 17 && rain === 0 && snow === 0) {
    firstForecastActivity.innerHTML = `<i class="fas fa-wind"></i> Kite Rise`
  }
  if (windSpeed < 12 && temp > 5 && hours < 17 && rain === 0 && snow === 0) {
    firstForecastActivity.innerHTML = `<i class="fas fa-hiking"></i> Hiking`
  }
  if (windSpeed > 19 || temp <5 || hours > 19 || snow != 0 || rain != 0) {
 firstForecastActivity.innerHTML = `<i class="fas fa-film"></i> Cinema`
  }
if (temp < -2 && rain === 0 && hours <20 || snow != 0 ) {
  secondForecastActivity.innerHTML = `<i class="fas fa-skating"></i> Ice Skating`
}
 if (windSpeed < 12 && temp > 5 && hours < 17 && rain === 0 && snow === 0) {
   secondForecastActivity.innerHTML = ` <i class="fas fa-tree"></i> Visit a park`
 }
 if (windSpeed > 19 || hours > 20 || rain != 0){
    secondForecastActivity.innerHTML = `<i class="fas fa-glass-martini-alt"></i> Visit a bar`
 }
 if (temp > 20 && rain === 0 && hours < 20) {
   thirdForecastActivity.innerHTML = `<i class="fas fa-swimmer"></i> Go swimming`
 }
   if (temp < 0 && snow != 0 && hours < 20) {
     thirdForecastActivity.innerHTML = `<i class="fas fa-sleigh"></i> Go sledding`
 }
 if (temp < 5 || snow != 0 || rain != 0) {
      thirdForecastActivity.innerHTML = `<i class="fas fa-hot-tub"></i> Go to sauna`
 }
  if (windSpeed < 10 && temp > 11 && rain === 0 && snow === 0) {
    fourthForecastActivity.innerHTML = `<i class="fas fa-wind"></i> Climbing`
  }
*/  
}
getCurrentPosition();

