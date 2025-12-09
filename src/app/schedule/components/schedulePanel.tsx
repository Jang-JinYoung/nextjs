"use client";

import { useEffect, useState } from "react";
import { getScheduleList } from "@/lib/schedule";
import { ScheduleItem } from "@/types/schedule";
import ScheduleItemRow from "./scheduleItemRow";
import styles from "./schedulePanel.module.css";

export default function SchedulePanel() {
    const [list, setList] = useState<ScheduleItem[]>([]);

    useEffect(() => {
        getScheduleList().then(setList);
    }, []);

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>오늘 스케줄</h2>

            <ul className={styles.list}>
                {list.map((item) => (
                    <ScheduleItemRow key={item.id} item={item} />
                ))}
            </ul>
        </div>
    );
}
