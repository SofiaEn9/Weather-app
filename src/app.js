function changeBackgroundImage(description) {
  let weatherDescription = description;
  console.log(weatherDescription);
  let backgroundDisplay = document.getElementById("background-display");

  backgroundDisplay.classList.remove(
    "clear",
    "clouds",
    "rain",
    "thuderstorm",
    "mist",
    "snow"
  );

  if (weatherDescription.includes("clear")) {
    backgroundDisplay.classList.add("clear");
  } else if (weatherDescription.includes("clouds")) {
    backgroundDisplay.classList.add("clouds");
  } else if (weatherDescription.includes("rain")) {
    backgroundDisplay.classList.add("rain");
  } else if (weatherDescription.includes("thunderstorm")) {
    backgroundDisplay.classList.add("thunderstorm");
  } else if (
    weatherDescription.includes("mist") ||
    weatherDescription.includes("haze")
  ) {
    backgroundDisplay.classList.add("mist");
  } else if (weatherDescription.includes("snow")) {
    backgroundDisplay.classList.add("snow");
  }
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hours}:${minutes}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ``;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML = `${forecastHTML}
        <div class="row week-forecast">
          <div class="col-5">
            <img
              src=${forecastDay.condition.icon_url}
              alt="" class="forecast-icon" id="forecast-icon"/>
          </div>
        <div class="col-7 forecast-specs">
          <div class="forecast-day">${formatForecastDay(forecastDay.time)}</div>
            <div class="forecast-temperature">
              <span class="forecast-temperature-max">
              ${Math.round(forecastDay.temperature.maximum)}º
              </span>
              <span class="forecast-temperature-division">
               | 
               </span>
              <span class="forecast-temperature-min">
              ${Math.round(forecastDay.temperature.minimum)}º
              </span>
            </div>
          </div>
        </div>
        </div>
        `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let lat = coordinates.latitude;
  let lon = coordinates.longitude;
  let apiKey = `de926abe0f35af91c8149b6305ofa34t`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.time * 1000
  );
  let mainIcon = document.querySelector("#main-icon");
  mainIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  mainIcon.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
  changeBackgroundImage(response.data.condition.description);
}

function searchInput(city) {
  let apiKey = "de926abe0f35af91c8149b6305ofa34t";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchInput(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

searchInput("Chihuahua");
