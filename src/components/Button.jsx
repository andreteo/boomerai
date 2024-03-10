import React from "react";
import styles from "./cssfiles/Button.module.css";

const Button = (props) => {
    return <div className={styles.btn}>{props.children}</div>;
};

export default Button;
