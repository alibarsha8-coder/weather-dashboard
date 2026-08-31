import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import MapView from './components/MapView';

const DEFAULT_CITY = 'Baghdad';

function App() {
  const [city, setCity] = useState('');
  const [query, setQuery] = useState(DEFAULT_CITY);
  const [units, setUnits] = useState('metric');
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather(query);
  }, [query, units]);

  async function fetchWeather(q) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/weather?q=${encodeURIComponent(q)}&units=${units}`);
      if (!res.ok) throw new Error('Failed fetching weather');
      const data = await res.json();
      setCurrent(data.current);
      setForecast(data.daily || data.forecast || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    if (city.trim()) setQuery(city.trim());
  }

  function handleGeolocate() {
    if (!navigator.geolocation) return setError('Geolocation not supported');
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords;
      setLoading(true);
      try {
        const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}&units=${units}`);
        if (!res.ok) throw new Error('Location lookup failed');
        const data = await res.json();
        setCurrent(data.current);
        setForecast(data.daily || data.forecast || []);
      } catch (err) {
        setError(err.message);
      } finally { setLoading(false); }
    }, err => setError(err.message));
  }

  return (
    <div className="container">
      <header>
        <h1>Weather Dashboard</h1>
        <div className="controls">
          <form onSubmit={handleSearch}>
            <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Search city" />
            <button type="submit">Search</button>
          </form>
          <button onClick={handleGeolocate}>Use my location</button>
          <div className="units">
            <label><input type="radio" checked={units==='metric'} onChange={()=>setUnits('metric')} /> °C</label>
            <label><input type="radio" checked={units==='imperial'} onChange={()=>setUnits('imperial')} /> °F</label>
          </div>
        </div>
      </header>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      {current && <WeatherCard data={current} />}

      {forecast.length > 0 && <Forecast items={forecast} units={units} />}

      {current && <MapView coords={current.coord} forecast={forecast} />}

      <footer>
        <small>Data from OpenWeatherMap · Built with React</small>
      </footer>
    </div>
  );
}

export default App;
