import React from 'react';

export default function WeatherCard({ data }) {
  const { name, main, weather, wind, coord } = data;
  const icon = weather && weather[0] && `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  return (
    <section className="card current">
      <div className="location">
        <h2>{name}</h2>
        <p>{weather && weather[0] && `${weather[0].main} — ${weather[0].description}`}</p>
      </div>
      <div className="main">
        {icon && <img src={icon} alt="icon" />}
        <div className="temps">
          <div className="temp">{Math.round(main.temp)}°</div>
          <div className="feels">Feels like: {Math.round(main.feels_like)}°</div>
          <div className="meta">Humidity: {main.humidity}% · Wind: {wind.speed} m/s</div>
        </div>
      </div>
    </section>
  );
}
