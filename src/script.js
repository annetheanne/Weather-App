function displayDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let time = date.toLocaleTimeString([], {
    hour: `2-digit`,
    minute: `2-digit`,
  });

  return `${day} ${time}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = `
          <div class="row forecast-temps" id="forecast">
            <div class="col-2">
              <div class="forecast-day">Sun</div>
                <span class="forecast-icon">☁️</span><br />
                <span class="forecast-temp-max">66°F</span>
                <span class="forecast-temp-min"> 61°F</span>
            </div>
          </div>  
        `;
}

function displayWeatherCondition(response) {
  let replaceIcon = document.querySelector(".current-icon");
  let weatherIcon = "";
  weatherIcon = response.data.weather[0].icon;
  replaceIcon.innerHTML = chooseIcon(weatherIcon);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function chooseIcon(icon) {
  switch (icon.slice(0, 2)) {
    case "01":
      return "☀️";
    case "02":
      return "🌤";
    case "03":
      return "⛅️";
    case "04":
      return "☁️";
    case "09":
      return "🌧";
    case "10":
      return "🌦";
    case "11":
      return "🌩";
    case "13":
      return "❄️";
    case "50":
      return "🌫";
  }
}

function searchCity(city) {
  let units = "imperial";
  let apiKey = "125f64a9971676c48141e4f1453acef7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let units = "imperial";
  let apiKey = "125f64a9971676c48141e4f1453acef7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

/* function convertToFarhenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 61;
} 

function convertToCelsuis(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 16;
} 
*/

let currentDate = document.querySelector(".current-date-time");
let currentTime = new Date();
currentDate.innerHTML = displayDate(currentTime);

let search = document.querySelector("#city-search");
search.addEventListener("submit", displayCity);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Los Angeles");
displayForecast();

//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", convertToFarhenheit);

//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.addEventListener("click", convertToCelsuis);
