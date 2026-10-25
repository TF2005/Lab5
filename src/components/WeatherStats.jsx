// Right part of the middle row: humidity and wind
export default function WeatherStats({ humidity, windSpeed }) {
    return (
        <div className="weather-stats">
            <div className="weather-stat">
                <p className="stat-label">💧 Humidity</p>
                <p className="stat-value">{humidity}</p>
            </div>

            <div className="weather-stat">
                <p className="stat-label">🌬️ Wind Speed</p>
                <p className="stat-value">{windSpeed}</p>
            </div>
        </div>
    );
}