import LocationTime from './LocationTime.jsx';
import CurrentWeather from './CurrentWeather.jsx';
import WeatherStats from './WeatherStats.jsx';
import HourlyForecast from './HourlyForecast.jsx';

// Weather card
export default function WeatherCard({ weather }) {
    return (
        <section className="weather-result">
            <LocationTime
                city={weather.city}
                country={weather.country}
                date={weather.date}
                time={weather.time}
            />

            <div className="weather-overview">
                <CurrentWeather
                    icon={weather.icon}
                    temperature={weather.temperature}
                    feelsLike={weather.feelsLike}
                    conditions={weather.conditions}
                />
                <div className="weather-divider"></div>
                <WeatherStats humidity={weather.humidity} windSpeed={weather.windSpeed} />
            </div>

            <HourlyForecast hours={weather.hourly} />
        </section>
    );
}