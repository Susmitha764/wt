// Select DOM Elements
const cityName = document.querySelector(".weather_city");
const dateTime = document.querySelector(".weather_date_time");
const w_forecast = document.querySelector(".weather_forecast");
const w_icon = document.querySelector(".weather_icon");
const w_temperature = document.querySelector(".weather_temperature");
const w_min = document.querySelector(".weather_min");
const w_max = document.querySelector(".weather_max");
const w_feelsLike = document.querySelector(".weather_feels");
const w_humidity = document.querySelector(".weather_humidity");
const w_wind = document.querySelector(".weather_wind");
const w_pressure = document.querySelector(".weather_pressure");
const w_searchForm = document.querySelector(".weather_search");
const w_searchInput = document.querySelector(".city_name");

// Function to get country name from country code
const getCountryName = (code) => {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

// Function to format date and time
const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
    
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    
    return new Intl.DateTimeFormat("en-US", options).format(curDate);
};

// Handle form submission
w_searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = w_searchInput.value.trim();
    if (city) {
        getWeatherData(city);
        w_searchInput.value = ''; // Clear input field after submission
    }
});

// Fetch Weather Data
const getWeatherData = async (city) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5ed16af806393251d3c3cbf1e0c5d736`;

    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        console.log(data);
        
        // Update the UI with weather data
        updateWeatherUI(data);
        
    } catch (error) {
        console.log("Error fetching weather data:", error);
        alert("Error: " + error.message);
    }
};

// Update the UI with weather data
const updateWeatherUI = (data) => {
    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);
    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="Weather Icon" id="weather_icon">`;
    w_temperature.innerHTML = `${main.temp.toFixed()}&#176`;
    w_min.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
    w_max.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;
    w_feelsLike.innerHTML = `${main.feels_like.toFixed()}&#176`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed.toFixed(1)} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;
};

// Load default city weather on Page Load
window.addEventListener("load", () => {
    getWeatherData("Vijayawada"); // Default city
});