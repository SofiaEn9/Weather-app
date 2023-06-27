function displayTemperature(response) {
  console.log(response.data);
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
}

let apiKey = "de926abe0f35af91c8149b6305ofa34t";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Chihuahua&key=${apiKey}&units=metric`;
// console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
