import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./cssfiles/Modal.module.css";
import Image from "./Image";
import SaveButtonHandler from "./SaveButtonHandler";
import ErrorMsg from "./ErrorMsg";

const ModalOverlay = (props) => {
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [quoteBtnSaved, setQuoteBtnSaved] = useState(false);
    const [imageBtnSaved, setImageBtnSaved] = useState(false);
    const [bothBtnSaved, setBothBtnSaved] = useState(false);

    return (
        <>
            <div className={`${styles.backdrop}`}>
                <div className={`${styles.board} ${styles.modal}`}>
                    {props.saveStatus === 1 && (
                        <>
                            <header className={styles.header}>
                                <h2>{props.children}</h2>
                            </header>
                            <Image url={props.url}>{props.prompt}</Image>
                        </>
                    )}
                    {props.saveStatus === 2 && <ErrorMsg saveSuccess={saveSuccess}>Text</ErrorMsg>}
                    {props.saveStatus === 3 && <ErrorMsg saveSuccess={saveSuccess}>Image</ErrorMsg>}
                    {props.saveStatus === 4 && <ErrorMsg saveSuccess={saveSuccess}>Both</ErrorMsg>}

                    <SaveButtonHandler
                        textresponse={props.textresponse}
                        imageresponse={props.imageresponse}
                        url={props.url}
                        bearerKey={props.bearerKey}
                        setShowModal={props.setShowModal}
                        setIsLoading={props.setIsLoading}
                        saveStatus={props.saveStatus}
                        setSaveStatus={props.setSaveStatus}
                        saveSuccess={saveSuccess}
                        setSaveSuccess={setSaveSuccess}
                        quoteBtnSaved={quoteBtnSaved}
                        setQuoteBtnSaved={setQuoteBtnSaved}
                        imageBtnSaved={imageBtnSaved}
                        setImageBtnSaved={setImageBtnSaved}
                        bothBtnSaved={bothBtnSaved}
                        setBothBtnSaved={setBothBtnSaved}>
                        {props.prompt}
                    </SaveButtonHandler>
                </div>
            </div>
        </>
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
                    bearerKey={props.bearerKey}
                    setShowModal={props.setShowModal}
                    setIsLoading={props.setIsLoading}
                    isLoading={props.isLoading}
                    saveStatus={props.saveStatus}
                    setSaveStatus={props.setSaveStatus}>
                    {props.children}
                </ModalOverlay>,
                document.querySelector("#modal-root")
            )}
        </>
    );
};

export default Modal;
