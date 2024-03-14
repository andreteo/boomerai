import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Image from "./Image";
import Button from "./Button";
import modalStyles from "./cssfiles/ModalStyling.module.css";
import btnStyles from "./cssfiles/ButtonsStyling.module.css";

const ModalOverlay = (props) => {
    return (
        <>
            <div className={`${modalStyles.backdrop}`}>
                <div className={`${modalStyles.board} ${modalStyles.modal}`}>
                    <>
                        <header className={modalStyles.header}>
                            <h2>Template Generated</h2>
                        </header>
                        <Image url={props.image}>{props.children}</Image>
                    </>
                    <Button
                        btn={`col-sm-3 ${btnStyles.deletebtn}`}
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
