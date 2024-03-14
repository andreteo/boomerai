import { useEffect, useState } from "react";
import styles from "./cssfiles/Image.module.css";

const Image = (props) => {
    return (
        <div className={styles.imgcontainer}>
            <img className={styles.image} src={props.url} alt="test"></img>
            {/* <img className={styles.image} src={props.imgSrc} alt="test"></img> */}
            <div className={`${styles.textcentered} ${styles.textglow}`}>{props.children}</div>
        </div>
    );
};

export default Image;
