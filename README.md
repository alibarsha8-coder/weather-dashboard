# Weather Dashboard

This repository contains a React Weather Dashboard that fetches weather data from OpenWeatherMap. It includes a small Node/Express proxy server to keep your OpenWeatherMap API key secret.

Deployment and running notes

1) Add Secrets
- On GitHub, go to Settings -> Secrets and variables -> Actions -> New repository secret
- Add the following secrets (recommended):
  - OWM_API_KEY : Your OpenWeatherMap API key

2) Run locally
- Frontend:
  - npm install
  - npm start
- Server (proxy):
  - cd server
  - npm install
  - set OWM_API_KEY in your environment (Windows: set OWM_API_KEY=xxx, macOS/Linux: export OWM_API_KEY=xxx)
  - node index.js

The React app calls the proxy at /api/weather, so for local development you may need to run the server and the frontend and configure a proxy in package.json or use a tool like concurrently.

3) Deployment
- Recommended: Deploy frontend to Vercel or Netlify and the server to Render/Heroku. You can also deploy fullstack to a single host that supports Node.

4) Defaults
- Default city: Baghdad
- Default units: metric (°C)
- Map layers: OpenStreetMap tiles (can add OpenWeatherMap layers if you provide API access)

