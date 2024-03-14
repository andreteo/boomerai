import React from "react";
import ReactDOM from "react-dom";
import imageStyles from "./cssfiles/ImageStyling.module.css";
import textStyles from "./cssfiles/TextStyling.module.css";

const Overlay = (props) => {
    const text = ["L", "O", "A", "D", "I", "N", "G"];
    return (
        <div className={imageStyles.backdrop}>
            <div className={`${textStyles.waviy} ${textStyles.lgsize}`}>
                {text.map((letter, idx) => {
                    return (
                        <span key={idx} style={{ "--i": idx + 1 }}>
                            {letter}
                        </span>
                    );
                })}
            </div>
            {/* <p className={textStyles.lgsize}>{props.children}</p> */}
            {/* <h2>{props.children}</h2> */}
            <img src="../src/media/boomer-gif.gif" alt="Boomer Loading Animation" className={imageStyles.gif}></img>
            {/* <div className={imageStyles.loader}></div> */}
        </div>
    );
};

const Loading = (props) => {
    return <>{ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, document.querySelector("#overlay-root"))}</>;
};

export default Loading;
