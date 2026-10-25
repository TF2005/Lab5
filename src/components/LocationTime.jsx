// Top row: city and country on the left, date and time on the right
export default function LocationTime({ city, country, date, time }) {
    return (
        <div className="location-time-row">
            <div className="location-info">
                <h2 className="city-name">{city}</h2>
                <p className="country-name">{country}</p>
            </div>

            <div className="date-time">
                <p>{date}</p>
                <p>{time}</p>
            </div>
        </div>
    );
}