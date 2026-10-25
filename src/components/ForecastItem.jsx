// One forecast card: time, emoji, temperature
export default function ForecastItem({ label, icon, temperature }) {
    return (
        <div className="forecast-item">
            <p className="forecast-time">{label}</p>
            <p className="forecast-icon">{icon}</p>
            <p className="forecast-temperature">{temperature}</p>
        </div>
    );
}