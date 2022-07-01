let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
document.querySelector("h5").innerHTML = `${day} ${hour}:${minute}`;

function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#temp-min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#temp-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
}

function search(city) {
  let apiKey = "01964884529543e0781b3fb98836db9a";
  let units = "metric";
  let urlEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${urlEndpoint}${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSubmit);

function retrievePostion(position) {
  let apiKey = "10fa1a5347c29ec2fefbe4061d8bdde2";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  console.log(url);
  axios.get(url).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePostion);
}

let button = document.querySelector("#current-city-button");
button.addEventListener("click", getCurrentPosition);

search("Tokyo");