"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styles from "./mapPanel.module.css";

export default function MapPanel() {
  const center = { lat: 37.4979, lng: 127.0276 };

  return (
    <div className={styles.wrapper}>
      <LoadScript googleMapsApiKey={process.env.GOOGLE_MAP_KEY!}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={15}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
