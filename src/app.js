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

function displayForecast(response) {
  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");

  let days = ["thu", "fri", "sat", "sun", "mon"];

  let forecastHTML = ``;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="row week-forecast">
      <div class="col-5">
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png","
          alt="" class="forecast-icon" id="forecast-icon"/>
      </div>
      <div class="col-7 forecast-specs">
        <div class="forecast-day">${day}</div>
          <div class="forecast-temperature">
            <span class="forecast-temperature-max">38º</span>
            <span class="forecast-temperature-division"> | </span>
            <span class="forecast-temperature-min">22º</span>
          </div>
         </div>
       </div>
       </div>
     `;
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
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.city;

  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);

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
}

function searchInput(city) {
  let apiKey = "de926abe0f35af91c8149b6305ofa34t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchInput(cityInput.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  console.log(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchInput("Chihuahua");
