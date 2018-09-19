export default function weatherIcon(weather) {
  return `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
}