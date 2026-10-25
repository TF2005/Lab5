# Weather Dashboard (React)

A React application (Vite) that displays the weather for a city: temperature, feels-like temperature, conditions, humidity, wind, and forecasts for the next 6 hours.

The data comes from the Open-Meteo API (geocoding + forecasts). No API key is required.

## Installation and Launch

1. Open a Command Prompt in the project folder.
2. Install the dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open (CTRL + click): http://localhost:5173/

## Project Structure

- `index.html`: The page containing the `#root` div.
- `src/main.jsx`: Mounts React into `#root`.
- `src/App.jsx`: The root component, containing the state and the `useEffect` for fetching data.
- `src/weatherInfo.js`: Functions that convert weather codes into descriptions and emojis.
- `src/index.css`: Styles (responsive design).
- `src/components/`: One component per file:
  - `SearchBar.jsx`: Controlled form with validation.
  - `LoadingSpinner.jsx`: Loading indicator.
  - `ErrorMessage.jsx`: Error message.
  - `WeatherCard.jsx`: Assembles the weather card.
  - `LocationTime.jsx`: City, country, date, and time.
  - `CurrentWeather.jsx`: Icon, temperature, feels-like temperature, and conditions.
  - `WeatherStats.jsx`: Humidity and wind.
  - `HourlyForecast.jsx`: List of the next 6 hours.
  - `ForecastItem.jsx`: A single forecast card.

## State and Effect

- `useState` in `App`: `query` (searched city), `weather` (weather data), `status` (idle / loading / error / ready), and `errorText`.
- `useState` in `SearchBar`: `text` (controlled input field) and `error` (validation).
- `useEffect` in `App`: Fetches data whenever `query` changes (first calls geocoding, then fetches the forecast). The dependency array is `[query]`.
- Three displayed states: loading (`LoadingSpinner`), error (`ErrorMessage`), and success (`WeatherCard`).

## Props (Communication)

- `App` → `SearchBar`: `onSearch`, `onType` (the child calls the parent's functions).
- `App` → `ErrorMessage`: `message`.
- `App` → `WeatherCard`: `weather`.
- `SearchBar` → `ErrorMessage`: `message`.
- `WeatherCard` → `LocationTime`, `CurrentWeather`, `WeatherStats`, `HourlyForecast`: The values each component needs.
- `HourlyForecast` → `ForecastItem`: `label`, `icon`, `temperature` (using `.map()` and `key`).

## Note on Prop Depth

The `weather` state belongs to `App`. It is passed to `WeatherCard` (level 1), which distributes parts of it to its children (level 2).

`HourlyForecast` then passes each hour to `ForecastItem`: this is a list rendered using `.map()`, and each component uses the data it receives.

No data is passed through components that don't use it, so there is no prop drilling and no need for Context.