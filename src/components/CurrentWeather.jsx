// Left part of the middle row: icon, temperature, feels like, conditions
export default function CurrentWeather({ icon, temperature, feelsLike, conditions }) {
  return (
    <div className="main-weather">
      <p className="weather-icon">{icon}</p>

      {/* The temperature and its unit stay side by side */}
      <div className="temperature-display">
        <p className="temperature">{temperature}</p>
        <p className="temperature-unit">°C</p>
      </div>

      <p className="feels-like">{feelsLike}</p>
      <p className="conditions">{conditions}</p>
    </div>
  );
}