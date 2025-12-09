// src/app/schedule/page.tsx

import MapPanel from "./components/mapPanel";
import SchedulePanel from "./components/schedulePanel";
import styles from "./schedule.module.css";

const schedulePage = () => {
    return (
        <div className={styles.wrapper}>
            <aside className={styles.left}>
                <SchedulePanel />
            </aside>
            <main className={styles.right}>
                <MapPanel />
            </main>
        </div>
    );
};

export default schedulePage;
