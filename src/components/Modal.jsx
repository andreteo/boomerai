import React from "react";
import ReactDOM from "react-dom";
import styles from "./cssfiles/Modal.module.css";
import Image from "./Image";
import SaveButtonHandler from "./SaveButtonHandler";

const ModalOverlay = (props) => {
    return (
        <div className={`${styles.backdrop}`}>
            <div className={`${styles.board} ${styles.modal}`}>
                <header className={styles.header}>
                    <h2>{props.children}</h2>
                </header>
                <Image url={props.url}>{props.prompt}</Image>
                <SaveButtonHandler
                    textresponse={props.textresponse}
                    imageresponse={props.imageresponse}
                    bearerKey={props.bearerKey}></SaveButtonHandler>
            </div>
        </div>
    );
};

const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(
                <ModalOverlay
                    url={props.url}
                    prompt={props.prompt}
                    textresponse={props.textresponse}
                    imageresponse={props.imageresponse}
                    bearerKey={props.bearerKey}>
                    {props.children}
                </ModalOverlay>,
                document.querySelector("#modal-root")
            )}
        </>
    );
};

export default Modal;
