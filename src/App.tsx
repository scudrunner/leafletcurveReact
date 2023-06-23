import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

import { LatLngExpression } from "leaflet"; // for TypeScript
import "@elfalem/leaflet-curve";
import MarkersRandom from "./MarkersRandom";

export default function App() {
  const position: LatLngExpression = [35.376307, 5.918474];
  const zoom = 2;

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      maxZoom={20}
      scrollWheelZoom={false}
      style={{ height: "90vh", width: "90vw" }}
    >
      <TileLayer
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <MarkersRandom />
    </MapContainer>
  );
}
