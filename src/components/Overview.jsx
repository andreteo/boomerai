import React from "react";
import boomermsg from "../media/boomer-message.jpg";
import styles from "./cssfiles/Overview.module.css";

const Overview = () => {
    const overviewTitle = "Boomer.ai";
    const overviewMsg = "Empowering Boomers with Digitalised Inspiration, One Quote at a Time";
    return (
        <div className={styles.overall}>
            <div className={`${styles.overview}`}>
                <img className={styles.overviewimg} src={boomermsg}></img>
                <p>{overviewTitle}</p>
            </div>
            <div className={styles.overviewdesc}>
                <p>{overviewMsg}</p>
            </div>
        </div>
    );
};

export default Overview;
