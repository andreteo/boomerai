import React from "react";
import modalStyles from "./cssfiles/ModalStyling.module.css";
import textStyles from "./cssfiles/TextStyling.module.css";
import imageStyles from "./cssfiles/ImageStyling.module.css";

const ErrorMsg = (props) => {
    return (
        <>
            {props.saveSuccess ? (
                <div>
                    <header className={modalStyles.header}>
                        <h2>Save Success!</h2>
                    </header>
                    <div className={`${modalStyles.placeholder} ${textStyles.glowingText}`}>{props.children} Saved</div>
                </div>
            ) : (
                <>
                    <header className={modalStyles.header}>
                        <h2>{props.children} Save Unsuccessful.</h2>
                    </header>
                    <div className={`${modalStyles.placeholder} ${textStyles.glowingText} ${modalStyles.centeredText}`}>
                        {props.children} NOT Saved
                    </div>
                </>
            )}
        </>
    );
};

export default ErrorMsg;
