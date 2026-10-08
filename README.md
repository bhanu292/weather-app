Weatherly 🌤️

A clean, responsive weather dashboard built with HTML, CSS, and JavaScript.
Weatherly allows users to search for a city, use their current location, view current weather details, and check a 5-day forecast.

✨ Features

🔎 Search weather by city name

📍 Use current location with browser geolocation

🌡️ Display current temperature

🌤️ Weather condition with weather icons

💧 Humidity information

🌬️ Wind speed and wind direction

🤒 Feels-like temperature

🌧️ Precipitation information

🌡️ Atmospheric pressure

👁️ Visibility

🌅 Sunrise and sunset times

📅 Current date

📆 5-day weather forecast

🌧️ Daily precipitation probability

📱 Responsive design for desktop, tablet, and mobile

⚠️ User-friendly loading and error messages

🎨 Modern dark/glass-style weather dashboard

🛠️ Technologies Used

HTML5 — Page structure and semantic layout

CSS3 — Responsive design, gradients, cards, animations, and media queries

JavaScript (ES6+) — API requests, DOM manipulation, geolocation, weather processing, and dynamic rendering

Open-Meteo API — Weather and geocoding data

Browser Geolocation API — Detects the user's current coordinates

📁 Project Structure

Weather App/
│
├── index.html       # Main HTML page
├── style.css        # Styling and responsive layout
└── script.js        # Weather API logic and application functionality

🌐 API Usage

Weatherly uses the free Open-Meteo services:

Geocoding API

Used to convert a city name into latitude and longitude coordinates.

https://geocoding-api.open-meteo.com/v1/search

Weather Forecast API

Used to retrieve current weather and 5-day forecast information.

https://api.open-meteo.com/v1/forecast

No API key is required for this project.

🔄 How It Works

The application follows this flow:

User searches for a city
        ↓
Geocoding API finds the city coordinates
        ↓
Latitude + Longitude are sent to Open-Meteo
        ↓
Weather data is received
        ↓
JavaScript processes the weather information
        ↓
Dashboard is updated dynamically

For the location button:

User clicks "Use My Location"
        ↓
Browser requests location permission
        ↓
Latitude + Longitude are obtained
        ↓
Weather data is requested
        ↓
Reverse geocoding identifies the location
        ↓
Dashboard displays the weather

📊 Weather Information Displayed

Current Weather

Temperature

Weather condition

Feels-like temperature

Humidity

Wind speed

Today's Details

Precipitation

Wind direction

Atmospheric pressure

Visibility

Sunrise

Sunset

5-Day Forecast

Each forecast card displays:

Day

Weather icon

Weather condition

Maximum temperature

Minimum temperature

Rain probability

📱 Responsive Design

The application adapts to different screen sizes using CSS media queries.

Supported layouts include:

💻 Desktop

📱 Mobile

📟 Tablet

On smaller screens, the weather cards stack vertically and the forecast becomes horizontally scrollable.

🧠 JavaScript Highlights

The application demonstrates several practical JavaScript concepts:

fetch() and asynchronous API requests

async/await

URLSearchParams

Template literals

DOM selection and manipulation

Event listeners

Form handling

Browser Geolocation API

Dynamic HTML generation

Error handling with try...catch

Array iteration with forEach()

Conditional rendering

Date and time formatting

📌 Future Improvements

Possible improvements for future versions:

🌙 Automatic light/dark theme

🔍 City search suggestions

⭐ Favorite cities

🌍 Recent search history

🌡️ Celsius/Fahrenheit toggle

📈 Weather charts

🗺️ Weather map integration

🌧️ Hourly forecast

📅 Extended 7-day forecast

⏳ Loading spinner/skeleton UI

🌈 Dynamic background based on weather condition