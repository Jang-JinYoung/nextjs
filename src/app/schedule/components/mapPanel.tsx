"use client";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import styles from "./mapPanel.module.css";
import { LatLng } from "@/types/latLng";
import { useRef } from "react";

const LIBRARIES: ("places" | "marker")[] = ["places", "marker"];
interface IProps {
    center: LatLng;
    isMarker?: boolean;
    onMapClickCallback?: any;
}

export default function MapPanel({
    center,
    isMarker = false,
    onMapClickCallback
}: IProps) {
    const mapRef = useRef<google.maps.Map | null>(null);
    const advancedMarkersRef = useRef<
        google.maps.marker.AdvancedMarkerElement[]
    >([]);

    const onLoad = (map: google.maps.Map) => {
        mapRef.current = map;
    };

    const onClick = async (e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return;

        const latLng = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        };

        if(isMarker) {
            await addAdvancedMarker(latLng);
        }

        if(onMapClickCallback) {
            onMapClickCallback(latLng);
        }
    };

    const addAdvancedMarker = async (position: google.maps.LatLngLiteral) => {
        if (!mapRef.current) return;

        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
            "marker"
        )) as google.maps.MarkerLibrary;

        const marker = new AdvancedMarkerElement({
            map: mapRef.current,
            position,
        });

        advancedMarkersRef.current.push(marker);
    };

    return (
        <div className={styles.wrapper}>
            <LoadScript
                googleMapsApiKey={process.env.GOOGLE_MAP_KEY!}
                libraries={LIBRARIES}
            >
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={center}
                    zoom={15}
                    onClick={onClick}
                    onLoad={onLoad}
                    options={{
                        clickableIcons: false,
                        mapId: process.env.GOOGLE_MAP_ID
                    }}
                ></GoogleMap>
            </LoadScript>
        </div>
    );
}
