"use client";
import Image from "next/image";
import Link from "next/link";

// src/types/schedule.ts
export interface ScheduleItem {
    id: number;
    storeName: string;
    time: string; // "14:00" 형식
    url?: string; // 없을 수도 있음
}

export const scheduleList: ScheduleItem[] = [
    {
        id: 1,
        storeName: "스타벅스 강남점",
        time: "10:30",
        url: "https://www.starbucks.co.kr",
    },
    {
        id: 2,
        storeName: "을지로 김밥천국",
        time: "12:00",
    },
    {
        id: 3,
        storeName: "카카오프렌즈 스토어",
        time: "15:00",
        url: "https://store.kakaofriends.com",
    },
];

export default function Home() {
    return (
        <div style={styles.wrapper}>
            메인페이지
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    wrapper: {
        display: "flex",
        width: "100%",
        height: "100vh", // ✅ 화면 전체 고정
        overflow: "hidden",
    },
    left: {
        width: "20%",
        minWidth: "260px", // ✅ 너무 작아지는 거 방지
        borderRight: "1px solid #e5e5e5",
        overflowY: "auto",
    },
    right: {
        width: "80%",
        position: "relative",
    },
};
