import React from "react";
import ReactDOM from "react-dom";
import styles from "./cssfiles/Loading.module.css";

const Overlay = (props) => {
    return (
        <div className={styles.backdrop}>
            <h2>{props.children}</h2>
            <div className={styles.loader}></div>
        </div>
    );
};

const Loading = (props) => {
    return <>{ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, document.querySelector("#overlay-root"))}</>;
};

export default Loading;
