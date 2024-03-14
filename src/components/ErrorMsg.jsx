import React from "react";
import styles from "./cssfiles/Modal.module.css";

const ErrorMsg = (props) => {
    return (
        <>
            {props.saveSuccess ? (
                <div>
                    <header className={styles.header}>
                        <h2>Save Success!</h2>
                    </header>
                    <div className={`${styles.placeholder} ${styles.textglow}`}>{props.children} Saved</div>
                </div>
            ) : (
                <>
                    <header className={styles.header}>
                        <h2>{props.children} Save Unsuccessful.</h2>
                    </header>
                    <div className={`${styles.placeholder} ${styles.textglow} ${styles.textcentered}`}>
                        {props.children} NOT Saved
                    </div>
                    <h1>{`SaveStatus ${props.saveStatus}, SaveSuccess ${saveSuccess}`}</h1>
                </>
            )}
        </>
    );
};

export default ErrorMsg;
