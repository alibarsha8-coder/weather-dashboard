import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapView({ coords = { lat:0, lon:0 }, forecast = [] }) {
  const center = [coords.lat || coords.lat || 33.3152, coords.lon || coords.lon || 44.3661];
  return (
    <section className="map card">
      <h3>Map</h3>
      <MapContainer center={center} zoom={10} style={{ height: '300px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center}>
          <Popup>Current location</Popup>
        </Marker>
      </MapContainer>
    </section>
  );
}
