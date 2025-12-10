"use client";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import styles from "./mapPanel.module.css";
import { LatLng } from "@/types/latLng";

interface IProps {
    center: LatLng;
    onClick: (e: google.maps.MapMouseEvent) => void;
    children: React.ReactNode;
}

export default function MapPanel({ center, onClick, children}: IProps) {
    return (
        <div className={styles.wrapper}>
            <LoadScript googleMapsApiKey={process.env.GOOGLE_MAP_KEY!}>
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={center}
                    zoom={15}
                    onClick={onClick} // ✅ 여기서 클릭 감지
                >
                    {children}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}
