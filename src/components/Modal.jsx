import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./cssfiles/Modal.module.css";
import Image from "./Image";
import SaveButtonHandler from "./SaveButtonHandler";

const ModalOverlay = (props) => {
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [base64Data, setBase64Data] = useState("");
    const [imgSrc, setImgSrc] = useState("");

    useEffect(() => {
        if (props.imageresponse?.data[0]?.b64_json) {
            const dataUrl = `data:image/png;base64,${props.imageresponse?.data[0]?.b64_json}`;
            setImgSrc(dataUrl);
            setBase64Data(`${props.imageresponse?.data[0]?.b64_json}`);
        }
    }, [props.imageresponse]);

    return (
        <>
            {/* {props.isLoading && (
                <div className="centered">
                    <Loading></Loading>
                </div>
            )} */}

            <div className={`${styles.backdrop}`}>
                <div className={`${styles.board} ${styles.modal}`}>
                    {props.saveStatus === 2 && (
                        <>
                            {saveSuccess ? (
                                <div>
                                    <header className={styles.header}>
                                        <h2>Save Success!</h2>
                                    </header>
                                    <div className={`${styles.placeholder} ${styles.textglow}`}>Quote Saved</div>
                                </div>
                            ) : (
                                <>
                                    <header className={styles.header}>
                                        <h2>Save Unsuccessful.</h2>
                                    </header>
                                    <div className={`${styles.placeholder} ${styles.textglow} ${styles.textcentered}`}>
                                        Quote NOT Saved
                                    </div>
                                    <h1>{`SaveStatus ${props.saveStatus}, SaveSuccess ${saveSuccess}`}</h1>
                                </>
                            )}
                        </>
                    )}

                    {props.saveStatus === 3 && (
                        <>
                            <div>TEST</div>
                        </>
                    )}

                    {props.saveStatus === 1 && (
                        <>
                            <header className={styles.header}>
                                <h2>{props.children}</h2>
                            </header>
                            {/* <Image url={props.url}>{props.prompt}</Image> */}
                            <Image imgSrc={imgSrc}>{props.prompt}</Image>
                        </>
                    )}

                    <SaveButtonHandler
                        textresponse={props.textresponse}
                        imageresponse={props.imageresponse}
                        imgSrc={base64Data}
                        bearerKey={props.bearerKey}
                        setShowModal={props.setShowModal}
                        setIsLoading={props.setIsLoading}
                        saveStatus={props.saveStatus}
                        setSaveStatus={props.setSaveStatus}
                        saveSuccess={saveSuccess}
                        setSaveSuccess={setSaveSuccess}>
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
