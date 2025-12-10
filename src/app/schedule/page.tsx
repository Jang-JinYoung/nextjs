"use client";
// src/app/schedule/page.tsx

import { useCallback, useEffect, useState } from "react";
import MapPanel from "./components/mapPanel";
import SchedulePanel from "./components/schedulePanel";
import styles from "./schedule.module.css";
import { DEFAULT_LATLNG, LatLng } from "@/types/latLng";
import { Marker } from "@react-google-maps/api";

const schedulePage = () => {
    const [center, setCenter] = useState<LatLng>(DEFAULT_LATLNG);

    const [markers, setMarkers] = useState<LatLng[]>([]);

    useEffect(() => {
        if (!navigator.geolocation) {
            console.error("Geolocation 지원 안됨");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const currentPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                setCenter(currentPos);
                setMarkers([currentPos]);
            },
            (error) => {
                console.error("위치 권한 거부 또는 에러:", error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
            }
        );
    }, []);

    // 지도 클릭 시 실행 마커 생성
    const addMarker = useCallback((e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return;

        const newMarker = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        };

        setMarkers((prev) => [...prev, newMarker]);
    }, []);

    return (
        <div className={styles.wrapper}>
            <aside className={styles.left}>
                <SchedulePanel />
            </aside>
            <main className={styles.right}>
                <MapPanel center={center} onClick={addMarker}>
                    {markers.map((marker: LatLng, idx: number) => (
                        <Marker key={idx} position={marker} />
                    ))}
                </MapPanel>
            </main>
        </div>
    );
};

export default schedulePage;
