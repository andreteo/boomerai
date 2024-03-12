import React from "react";
import styles from "./cssfiles/Image.module.css";

const Image = (props) => {
    return (
        // <article className={styles.article}>
        //     {/* <h1 className={styles.inspiration}>{props.children}</h1> */}
        //     <img className={styles.image} src={props.url} alt="test"></img>
        //     <div className={`${styles.inspiration} ${styles.textglow}`}>{props.children}</div>
        // </article>
        <div className={styles.imgcontainer}>
            <img className={styles.image} src={props.url} alt="test"></img>
            <div className={`${styles.textcentered} ${styles.textglow}`}>{props.children}</div>
        </div>
    );
};

export default Image;
