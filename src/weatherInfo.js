export function getWeatherInfo(weatherCode) { /*export is used to make the function available for import in other files */
    if (weatherCode === 0) {
        return { description: "Clear sky", icon: "☀️" };
    } else if (weatherCode === 1 || weatherCode === 2 || weatherCode === 3) {
        return { description: "Partly cloudy", icon: "⛅" };
    } else if (weatherCode === 45 || weatherCode === 48) {
        return { description: "Fog", icon: "🌫️" };
    } else if (weatherCode >= 51 && weatherCode <= 55) {
        return { description: "Drizzle", icon: "🌦️" };
    } else if (weatherCode >= 61 && weatherCode <= 65) {
        return { description: "Rain", icon: "🌧️" };
    } else if (weatherCode >= 71 && weatherCode <= 75) {
        return { description: "Snow", icon: "❄️" };
    } else if (weatherCode >= 80 && weatherCode <= 82) {
        return { description: "Rain showers", icon: "🌧️" };
    } else if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
        return { description: "Thunderstorm", icon: "⛈️" };
    } else {
        return { description: "Unknown weather condition", icon: "❔" };
    }
}

// At night (before 6 AM or from 6 PM) show the moon, otherwise the weather emoji
export function getIcon(weatherCode, hour) {
    const info = getWeatherInfo(weatherCode);
    return hour < 6 || hour >= 18 ? "🌙" : info.icon;
}