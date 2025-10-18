# 🌦️ Weather App (Client)

A simple and responsive weather application that displays real-time weather information for any city around the world.

Built with ReactJS and TailwindCSS V4, it integrates with a public weather API [WeatherAPI](https://www.weatherapi.com/) to provide accurate and up-to-date forecasts.

---

## 🚀 Features

- **Drag the pin on the map** or **Click in any part of the map** to select the location where you want to check the current weather
- Display **temperature, humidity, wind speed**, and condition
- Dynamic **icons** based on weather
- Shows **current date and time**
- Fully **responsive** for all devices

---

## 🛠️ Tech Stack

**Frontend:**

- ReactJS
- Axios (for API calls)
- TailwindCSS V4
- react-leaflet and leaflet (for visual map)

**API:**

- [WeatherAPI](https://www.weatherapi.com/) _(Free plan available)_

---

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node)
- WeatherAPI account (to get an API key)

## ⚙️ Installation & Setup

## 1. Clone the Project

```bash
git clone https://github.com/elangeloferrer/weather-app-client
```

```bash
cd weather-app-client
```

## 2. Install PHP Dependencies

```bash
npm install
```

## 3. Setup Environment Variables

Create .env.development file in the root folder:

```bash
touch .env.development
```

Copy & Paste the following keys and values:

```bash
VITE_APP_API_URL=http://localhost:3001

VITE_WEATHER_API_KEY=WeatherAPIKey
VITE_WEATHER_API_URL=https://api.weatherapi.com/v1/current.json
```

Edit the .env.development file to set url(s) and credentials. Create an account for WeatherAPI to get an API key. [Register here](https://www.weatherapi.com/signup.aspx)

## 4. Run the app

```bash
npm run dev
```

The app may be available at: http://localhost:5173

---

You're all set — your **ReactJS** + **TailwindCSS** + **WeatherAPI** [Weather App (Client)] project is now fully installed and ready to run! 🚀
