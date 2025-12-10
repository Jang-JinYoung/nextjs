"use client";
// src/app/schedule/page.tsx

import { useCallback, useEffect, useRef, useState } from "react";
import MapPanel from "./components/mapPanel";
import SchedulePanel from "./components/schedulePanel";
import styles from "./schedule.module.css";
import { DEFAULT_LATLNG, LatLng } from "@/types/latLng";

const schedulePage = () => {
    const [center, setCenter] = useState<LatLng>(DEFAULT_LATLNG);

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

    const onMapClick = async (latLng: LatLng) => {
        try {
            const { Place } = (await google.maps.importLibrary(
                "places"
            )) as google.maps.PlacesLibrary;

            const { places } = await Place.searchNearby({
                locationRestriction: {
                    center: latLng,
                    radius: 30, // 기존과 동일: 30m
                },
                fields: [
                    "id",
                    "displayName",
                    "formattedAddress",
                    "location",
                    "rating",
                    "websiteURI",
                ],
            });

            if (!places || places.length === 0) {
                return;
            }

            // ✅ 가장 가까운 장소 1개 선택
            const targetPlace = places[0];
            console.log(targetPlace.displayName);

        } catch (error) {
            console.error("❌ Place 검색 실패:", error);
        }
    };

    return (
        <div className={styles.wrapper}>
            <aside className={styles.left}>
                <SchedulePanel />
            </aside>
            <main className={styles.right}>
                <MapPanel center={center} isMarker={true} onMapClickCallback={onMapClick}/>
            </main>
        </div>
    );
};

export default schedulePage;
