"use client";

import styles from "./mapPanel.module.css";

export default function MapPanel() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.placeholder}>지도 영역</div>
    </div>
  );
}