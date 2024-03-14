import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./cssfiles/Modal.module.css";
import Image from "./Image";
import Button from "./Button";

const ModalOverlay = (props) => {
    return (
        <>
            <div className={`${styles.backdrop}`}>
                <div className={`${styles.board} ${styles.modal}`}>
                    <>
                        <header className={styles.header}>
                            <h2>Template Generated</h2>
                        </header>
                        <Image url={props.image}>{props.children}</Image>
                    </>
                    <Button
                        btn={`col-sm-3 ${styles.deletebtn}`}
                        onClick={() => {
                            props.setShowModal(false);
                        }}>
                        Close
                    </Button>
                </div>
            </div>
        </>
    );
};

const DashboardModal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(
                <ModalOverlay image={props.url} setShowModal={props.setShowModal}>
                    {props.children}
                </ModalOverlay>,
                document.querySelector("#dashboard-modal-root")
            )}
        </>
    );
};

export default DashboardModal;
