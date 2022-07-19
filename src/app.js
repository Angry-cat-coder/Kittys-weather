function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
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
  return `${day} ${hour} : ${minutes}`;
}

function formatMonth() {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "Mai",
    "June",
    "July",
    "August",
    "September",
    "Oktober",
    "November",
    "December",
  ];
  let now = new Date();
  let month = months[now.getMonth()];
  return `${now.getDate()}. ${month}`;
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${temperature}`;
  let mainCity = document.querySelector("#mainCity");
  mainCity.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let winD = document.querySelector("#wind");
  winD.innerHTML = ` Windspeed: ${response.data.wind.speed} km/h`;
  let currentSky = document.querySelector("#Current-sky");
  currentSky.innerHTML = `${response.data.weather[0].description}`;
  let day_time = document.querySelector("#Current-day");
  day_time.innerHTML = formatDate(response.data.dt * 1000);
  celsiusTemperature = Math.round(response.data.main.temp);
  let icon = document.querySelector("#sky");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
  let description = document.querySelector("#Current-sky");
  description.innerHTML = response.data.weather[0].description;
  let curentDate = document.querySelector("#Current-date");
  curentDate.innerHTML = formatMonth();
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
}

function city(city) {
  // console.log(city);
  let apiKey = "a2c12ca339db823fd39c58b7ef7264d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

city("Kyiv");

function handleSubmit(event) {
  event.preventDefault();
  let changeCity = document.querySelector("#city");
  city(changeCity.value);
}

function showPosition(position) {
  console.log(position);

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "a2c12ca339db823fd39c58b7ef7264d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature);

  // console.log(mainCity.value);
  // let changeCity = document.querySelector("#city");
  //changeCity.innerHTML = `${response.data.name};
}

function geoLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function convertTofahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fahrenheittemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperature.innerHTML = fahrenheittemperature;
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}

function convertTocelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = celsiusTemperature;
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

let celsiusTemperature = null;
let search = document.querySelector("#search-form");
search.addEventListener("submit", handleSubmit);

let geo = document.querySelector("#geo");
geo.addEventListener("click", geoLocation);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertTofahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertTocelsius);
