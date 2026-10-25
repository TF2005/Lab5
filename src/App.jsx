import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import { getWeatherInfo, getIcon } from './weatherInfo.js';

export default function App() {
    // The city the user wants to check
    const [query, setQuery] = useState('');
    // The weather information for the searched city
    const [weather, setWeather] = useState(null);
    // Keeps track of the current state of the request
    const [status, setStatus] = useState('idle'); /*idle is the initial value because the user hasn't started a search yet.*/
    // The error message to display
    const [errorText, setErrorText] = useState('');

    // Fetch the weather every time the city changes
    useEffect(() => {
        // No city so nothing to load
        if (query === '') {
            setStatus('idle');
            return;
        }

        // Ignore the response of an older search
        let cancelled = false;

        async function load() {
            setStatus('loading');
            try {
                // 1) Geocoding: city name and get latitude / longitude
                const geoParams = new URLSearchParams({ name: query });
                const geoUrl = 'https://geocoding-api.open-meteo.com/v1/search?' + geoParams;
                const geoRes = await fetch(geoUrl);
                if (!geoRes.ok) throw new Error(geoRes.status);
                const geoData = await geoRes.json();
                if (cancelled) return;

                // No city found
                if (!geoData.results || geoData.results.length === 0) {
                    setErrorText('City not found. Please try another name.');
                    setStatus('error');
                    return;
                }
                const cityData = geoData.results[0];

                // 2) Weather for this city
                const weatherParams = new URLSearchParams({
                    latitude: cityData.latitude,
                    longitude: cityData.longitude,
                    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
                    hourly: 'temperature_2m,weather_code',
                    timezone: 'auto',
                    forecast_days: 2
                });
                const weatherUrl = 'https://api.open-meteo.com/v1/forecast?' + weatherParams;
                const weatherRes = await fetch(weatherUrl);
                if (!weatherRes.ok) throw new Error(weatherRes.status);
                const weatherData = await weatherRes.json();
                if (cancelled) return;

                const current = weatherData.current;
                const hourly = weatherData.hourly;

                // 3) First forecast hour after the current time
                let nextHourIndex = 0;
                for (let i = 0; i < hourly.time.length; i++) {
                    if (hourly.time[i] > current.time) {
                        nextHourIndex = i;
                        break;
                    }
                }

                // 4) The next 6 hours: { id, label, icon, temperature }
                const endIndex = Math.min(nextHourIndex + 6, hourly.time.length);
                const hours = [];
                for (let i = nextHourIndex; i < endIndex; i++) {
                    const hour24 = Number(hourly.time[i].split('T')[1].split(':')[0]);
                    const period = hour24 >= 12 ? 'PM' : 'AM';
                    const hour12 = hour24 % 12 || 12;
                    hours.push({
                        id: hourly.time[i], // unique identifier, used as the key
                        label: hour12 + ' ' + period,
                        icon: getIcon(hourly.weather_code[i], hour24),
                        temperature: Math.round(hourly.temperature_2m[i]) + '°C'
                    });
                }

                // 5) Date and time to display
                const now = new Date();
                const currentHour = Number(current.time.split('T')[1].split(':')[0]);

                // 6) Store the result in the state
                setWeather({
                    city: '📍' + cityData.name,
                    country: cityData.country,
                    date: '📅' + now.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    }),
                    time: '⌚' + now.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    }),
                    icon: getIcon(current.weather_code, currentHour),
                    temperature: current.temperature_2m,
                    feelsLike: 'Feels like ' + current.apparent_temperature + '°C',
                    conditions: getWeatherInfo(current.weather_code).description,
                    humidity: current.relative_humidity_2m + '%',
                    windSpeed: current.wind_speed_10m + ' km/h',
                    hourly: hours
                });
                setStatus('ready');
            } catch {
                // Network error or invalid response
                if (cancelled) return;
                setErrorText('Unable to fetch city data. Please try again.');
                setStatus('error');
            }
        }
        load();

        // If a new search starts, ignore the old response
        return () => {
            cancelled = true;
        };
    }, [query]);

    return (
        <>
            <header className="page-header">
                <h1>🌤️ Weather Dashboard</h1>
                <p>Get real-time weather information for any city</p>
            </header>

            <main className="dashboard">
                {/* onSearch: starts a search. onType: clears the results when the user types again */}
                <SearchBar onSearch={setQuery} onType={() => setQuery('')} />

                {/* Only one of these three screens is displayed at a time */}
                {status === 'loading' && <LoadingSpinner />}
                {status === 'error' && <ErrorMessage message={errorText} />}
                {status === 'ready' && <WeatherCard weather={weather} />}
            </main>
        </>
    );
}