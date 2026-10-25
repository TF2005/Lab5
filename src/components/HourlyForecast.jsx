import ForecastItem from './ForecastItem.jsx';

// List of the next Forecast hours
export default function HourlyForecast({ hours }) {
  return (
    <div className="hourly-forecast">
      <div className="hourly-forecast-list">
        {hours.map(h => (
          <ForecastItem
            key={h.id}
            label={h.label}
            icon={h.icon}
            temperature={h.temperature}
          />
        ))}
      </div>
    </div>
  );
}