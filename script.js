const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const locationBtn = document.getElementById("locationBtn");
const message = document.getElementById("message");
const dashboard = document.getElementById("dashboard");
const cityName = document.getElementById("cityName");
const currentDate = document.getElementById("currentDate");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const precipitation = document.getElementById("precipitation");
const windDirection = document.getElementById("windDirection");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const forecast = document.getElementById("forecast");

const weatherCodes = {
    0: ["Clear Sky", "☀️"],
    1: ["Mainly Clear", "🌤️"],
    2: ["Partly Cloudy", "🌥️"],
    3: ["Overcast", "☁️"],
    45: ["Fog", "🌫️"],
    48: ["Rime Fog", "🌫️"],
    51: ["Light Drizzle", "🌦️"],
    53: ["Drizzle", "🌦️"],
    55: ["Heavy Drizzle", "🌧️"],
    61: ["Light Rain", "🌦️"],
    63: ["Rain", "🌧️"],
    65: ["Heavy Rain", "🌧️"],
    71: ["Light Snow", "🌨️"],
    73: ["Snow", "🌨️"],
    75: ["Heavy Snow", "❄️"],
    80: ["Rain Showers", "🌦️"],
    81: ["Rain Showers", "🌧️"],
    82: ["Heavy Rain Showers", "⛈️"],
    85: ["Snow Showers", "🌨️"],
    86: ["Heavy Snow", "❄️"],
    95: ["Thunderstorm", "⛈️"],
    96: ["Thunderstorm + Hail", "⛈️"],
    99: ["Severe Thunderstorm", "⛈️"]
};
function getWeatherInfo(code) {
    return weatherCodes[code] || ["Unknown", "🌡️"];
}
function showMessage(text, isError = false) {
    message.textContent = text;
    message.className = isError ? "message error" : "message";
}
function formatTime(time) {
    if (!time) {
        return "-";
    }
    return new Date(time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}
function formatDate(date) {
    return new Date(date).toLocaleDateString([], {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}
function getWindDirection(degrees) {
    const direction = [
        "N",
        "NE",
        "E",
        "SE",
        "S",
        "SW",
        "W",
        "NW"
    ];
    return direction[Math.round(degrees / 45) % 8];
}
async function getCoordinates(city) {
    const url =
        `https://geocoding-api.open-meteo.com/v1/search?` +
        `name=${encodeURIComponent(city)}` +
        `&count=1` +
        `&language=en` +
        `&format=json`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Unable to search for this city.");
    }
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
        throw new Error(
            "City not found. Please try another city."
        );
    }
    return data.results[0];
}
async function getWeather(latitude, longitude) {
    const params = new URLSearchParams({
        latitude: latitude,
        longitude: longitude,
        timezone: "auto",
        forecast_days: 5,
        current: [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "precipitation",
            "weather_code",
            "wind_speed_10m",
            "wind_direction_10m",
            "surface_pressure",
            "visibility"
        ].join(","),
        daily: [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "precipitation_probability_max",
            "sunrise",
            "sunset"
        ].join(",")
    });
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params}`
    );
    if (!response.ok) {
        throw new Error("Weather service is unavailable.");
    }
    return await response.json();
}
function displayWeather(location, weatherData) {
    const current = weatherData.current;

    const [weatherCondition, weatherEmoji] =
        getWeatherInfo(current.weather_code);
    cityName.textContent =
        `${location.name}${location.country
            ? ", " + location.country
            : ""}`;
    currentDate.textContent = formatDate(current.time);
    weatherIcon.textContent = weatherEmoji;
    temperature.textContent =
        Math.round(current.temperature_2m);
    condition.textContent = weatherCondition;
    feelsLike.textContent =
        `${Math.round(current.apparent_temperature)}°C`;
    humidity.textContent =
        `${current.relative_humidity_2m}%`;
    wind.textContent =
        `${Math.round(current.wind_speed_10m)} km/h`;
    precipitation.textContent =
        `${current.precipitation} mm`;
    windDirection.textContent =
        `${getWindDirection(current.wind_direction_10m)} ` +
        `(${Math.round(current.wind_direction_10m)}°)`;
    pressure.textContent =
        `${Math.round(current.surface_pressure)} hPa`;
    visibility.textContent =
        `${(current.visibility / 1000).toFixed(1)} km`;
    sunrise.textContent =
        formatTime(weatherData.daily.sunrise[0]);
    sunset.textContent =
        formatTime(weatherData.daily.sunset[0]);
    displayForecast(weatherData.daily);
    dashboard.classList.add("visible");
}
function displayForecast(daily) {
    forecast.innerHTML = "";
    daily.time.forEach((date, index) => {
        const [weatherCondition, weatherEmoji] =
            getWeatherInfo(daily.weather_code[index]);
        const currentDate =
            new Date(`${date}T12:00:00`);
        const dayName =
            index === 0
                ? "Today"
                : currentDate.toLocaleDateString([], {
                    weekday: "short"
                });
        const maxTemperature =
            Math.round(daily.temperature_2m_max[index]);
        const minTemperature =
            Math.round(daily.temperature_2m_min[index]);
        const rainChance =
            daily.precipitation_probability_max[index] ?? 0;
        const forecastCard =
            document.createElement("div");
        forecastCard.className = "forecast-day";
        forecastCard.innerHTML = `
            <div class="forecast-day-name">
                ${dayName}
            </div>
            <div class="forecast-icon">
                ${weatherEmoji}
            </div>
            <div class="forecast-condition">
                ${weatherCondition}
            </div>
            <div class="forecast-temperature">
                <strong>${maxTemperature}°</strong>
                <span>${minTemperature}°</span>
            </div>
            <div class="forecast-rain">
                ${rainChance}% rain
            </div>
        `;
        forecast.appendChild(forecastCard);
    });
}
async function searchCity(city) {
    showMessage("Fetching the latest weather...");
    dashboard.classList.remove("visible");
    try {
        const location = await getCoordinates(city);
        const weather =
            await getWeather(
                location.latitude,
                location.longitude
            );
        displayWeather(location, weather);
        showMessage(
            `Updated just now · ` +
            `${location.latitude.toFixed(2)}°, ` +
            `${location.longitude.toFixed(2)}°`
        );
    } catch (error) {
        console.error(error);
        showMessage(
            error.message || "Something went wrong.",
            true
        );
    }
}
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (!city) {
        showMessage(
            "Please enter a city name.",
            true
        );
        cityInput.focus();
        return;
    }
    searchCity(city);
});
locationBtn.addEventListener("click", function () {
    if (!navigator.geolocation) {
        showMessage(
            "Geolocation is not supported by your browser.",
            true
        );
        return;
    }
    showMessage("Requesting your location...");
    navigator.geolocation.getCurrentPosition(
        async function (position) {
            try {
                const latitude =
                    position.coords.latitude;
                const longitude =
                    position.coords.longitude;
                const weather =
                    await getWeather(
                        latitude,
                        longitude
                    );
                const response = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/reverse?` +
                    `latitude=${latitude}` +
                    `&longitude=${longitude}` +
                    `&count=1` +
                    `&language=en` +
                    `&format=json`
                );
                let location;
                if (response.ok) {
                    const data =
                        await response.json();
                    location =
                        data.results?.[0];
                }
                if (!location) {
                    location = {
                        name: "Your Location",
                        country: ""
                    };
                }
                displayWeather(
                    location,
                    weather
                );
                showMessage(
                    "Showing weather for your current location."
                );
            } catch (error) {
                console.error(error);
                showMessage(
                    "Unable to load your location weather.",
                    true
                );
            }
        },
        function () {
            showMessage(
                "Location access was denied. Search for a city instead.",
                true
            );
        }
    );
});
searchCity("Haldwani");