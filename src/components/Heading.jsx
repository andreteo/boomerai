import React from "react";
import styles from "./cssfiles/Heading.module.css";

const Heading = (props) => {
    return <div className={styles.heading}>{props.children}</div>;
};

export default Heading;
