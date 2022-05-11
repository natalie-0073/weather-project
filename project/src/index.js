let date = new Date();
let chosenDate = document.querySelector("#date");

function changeDate() {
    let num = date.getDate();
    let month = date.getMonth();
    let day = date.getDay();
    let hours = date.getHours();
    let min = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    let newDate = `${num} ${months[month]}, ${days[day]} ${hours}:${min}`;
    return newDate;
}
chosenDate.innerHTML = changeDate();

function displayWeatherCondition(response) {
    let newH = document.querySelector("h2");
    newH.innerHTML = response.data.name;
    let newTemp = document.querySelector("#curr-temp");
    newTemp.innerHTML = Math.round(response.data.main.temp);
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = Math.round(response.data.main.humidity);
    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    let descript = document.querySelector("#description");
    let descInfo = response.data.weather[0].description;
    descript.innerHTML = descInfo.charAt(0).toUpperCase() + descInfo.slice(1);
}

let form = document.querySelector("#search-form");

function submittingForm(event) {
    event.preventDefault();
    let city = document.querySelector("#search-input").value;
    searchCity(city);
}
form.addEventListener("submit", submittingForm);

let currentWeather = document.querySelector("#curr-weather-button");

function searchLocation(position) {
    let apiKey = "ef6474d7c06b8fcbb3388c0963600854";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

currentWeather.addEventListener("click", getCurrPosition);

let cel = document.querySelector(".celsius");
let far = document.querySelector(".farenheit");
let currTemp = document.querySelector(".current-temperature");

function celToFar(event) {
    event.preventDefault();
    currTemp.innerHTML = Math.round(parseInt(currTemp.textContent) * 1.8 + 32);

    document.getElementById("fahr").style.textDecoration = "underline";
    document.getElementById("cels").style.textDecoration = "none";
}

function farToCel(event) {
    event.preventDefault();
    currTemp.innerHTML = Math.round(
        (Math.round(parseInt(currTemp.textContent) - 32) * 5) / 9
    );

    document.getElementById("fahr").style.textDecoration = "none";
    document.getElementById("cels").style.textDecoration = "underline";
}
far.addEventListener("click", celToFar);
cel.addEventListener("click", farToCel);

function searchCity(city) {
    let apiKey = "ef6474d7c06b8fcbb3388c0963600854";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displayWeatherCondition);
}
searchCity("Kyiv");