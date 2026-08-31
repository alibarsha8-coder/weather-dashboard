// Simple Node/Express proxy for OpenWeatherMap
// Usage: set environment variable OWM_API_KEY

const express = require('express');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.OWM_API_KEY;

if (!API_KEY) {
  console.error('Missing OWM_API_KEY environment variable');
}

app.use(cors());
app.use(express.json());

const limiter = rateLimit({ windowMs: 60 * 1000, max: 60 });
app.use(limiter);

app.get('/api/weather', async (req, res) => {
  try {
    const { q, lat, lon, units } = req.query;
    let url = '';
    if (q) {
      // get current weather then onecall
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&appid=${API_KEY}`;
      const cw = await (await fetch(url)).json();
      if (cw.cod && cw.cod !== 200) return res.status(400).json({ error: cw.message || 'City not found' });
      const { coord } = cw;
      const oneCall = await (await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,alerts&units=${units || 'metric'}&appid=${API_KEY}`)).json();
      return res.json({ current: { ...cw, coord }, daily: oneCall.daily });
    } else if (lat && lon) {
      const oneCall = await (await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=${units || 'metric'}&appid=${API_KEY}`)).json();
      return res.json({ current: oneCall.current, daily: oneCall.daily });
    } else {
      return res.status(400).json({ error: 'Missing q or lat/lon' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Proxy server listening on ${PORT}`));
