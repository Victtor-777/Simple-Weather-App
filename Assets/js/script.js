const API_KEY = "edf243593079cb9d70a5070c24762268";
let city_name = "Brasília";
let API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city_name}`;

const button = document.querySelector(".search button");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const icon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");

async function checkWeather() {
  const response = await fetch(API_URL + `&appid=${API_KEY}`);

  if (response.status == 404) {
    error.style.display = "block";
    weather.style.display = "none";
  } else {
    error.style.display = "none";
    weather.style.display = "block";
  }

  let data = await response.json();

  temp.innerText = data.main.temp.toFixed(0) + " °C";
  city.innerText = data.name;
  humidity.innerText = data.main.humidity + "%";
  wind.innerText = data.wind.speed + " km/h";

  if (data.weather[0].main == "Clouds") {
    icon.src = "./Assets/img/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    icon.src = "./Assets/img/clear.png";
  } else if (data.weather[0].main == "Rain") {
    icon.src = "./Assets/img/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    icon.src = "./Assets/img/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    icon.src = "./Assets/img/mist.png";
  }
  weather.style.display = "block";
}

function newCity() {
  event.preventDefault();
  const input = document.querySelector(".search input");
  city_name = input.value;
  API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city_name}`;
  input.value = "";
  checkWeather();
}

button.addEventListener("click", newCity);
