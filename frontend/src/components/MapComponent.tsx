"use client";
import { MapContainer, TileLayer, Marker, useMapEvents, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import L, { LatLng } from 'leaflet';

// Leaflet marker icon fix
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Define types for props
interface LocationMarkerProps {
  setPickupLocation: (location: LatLng) => void;
  setDropoffLocation: (location: LatLng) => void;
  mode: "pickup" | "dropoff";
}

interface MapComponentProps {
  pickupLocation: LatLng | null;
  dropoffLocation: LatLng | null;
  setPickupLocation: (location: LatLng) => void;
  setDropoffLocation: (location: LatLng) => void;
}

// Component to set a marker when the map is clicked
function LocationMarker({ setPickupLocation, setDropoffLocation, mode }: LocationMarkerProps) {
  const [position, setPosition] = useState<LatLng | null>(null);

  useMapEvents({
    click(e) {
      const latLng = e.latlng;
      setPosition(latLng);
      if (mode === "pickup") {
        setPickupLocation(latLng);
      } else {
        setDropoffLocation(latLng);
      }
    }
  });

  return position === null ? null : <Marker position={position} />;
}

const MapComponent: React.FC<MapComponentProps> = ({
  pickupLocation,
  dropoffLocation,
  setPickupLocation,
  setDropoffLocation,
}) => {
  const [mode, setMode] = useState<"pickup" | "dropoff">("pickup");

  return (
    <div className="w-full">
      <div className="flex justify-center mb-4">
        {/* Toggle buttons for Pickup and Dropoff mode */}
        <button
          className={`px-4 py-2 mr-2 rounded ${mode === "pickup" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setMode("pickup")}
        >
          Set Pickup
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === "dropoff" ? "bg-green-500 text-white" : "bg-gray-300"}`}
          onClick={() => setMode("dropoff")}
        >
          Set Dropoff
        </button>
      </div>

      <MapContainer center={[51.505, -0.09]} zoom={13} className="h-96 w-full rounded-md">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {/* Markers for Pickup and Dropoff */}
        <LocationMarker
          setPickupLocation={setPickupLocation}
          setDropoffLocation={setDropoffLocation}
          mode={mode}
        />
        {pickupLocation && <Marker position={pickupLocation} />}
        {dropoffLocation && <Marker position={dropoffLocation} />}
        {pickupLocation && dropoffLocation && (
          <Polyline positions={[pickupLocation, dropoffLocation]} color="blue" />
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;