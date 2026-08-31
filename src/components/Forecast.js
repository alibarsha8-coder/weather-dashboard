import React from 'react';

export default function Forecast({ items, units }) {
  return (
    <section className="forecast">
      <h3>5-day forecast</h3>
      <div className="grid">
        {items.map(it => (
          <div className="card day" key={it.dt || it.date}>
            <div>{new Date((it.dt || it.date) * 1000).toLocaleDateString()}</div>
            <img src={`https://openweathermap.org/img/wn/${it.weather[0].icon}@2x.png`} alt="icon" />
            <div className="temp">{Math.round(it.temp.day || it.temp)}°</div>
            <div className="desc">{it.weather[0].main}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
