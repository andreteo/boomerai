import React from "react";
import boomermsg from "../media/boomer-message.jpg";
import textStyles from "./cssfiles/TextStyling.module.css";

const Overview = () => {
    const overviewTitle = "Boomer.ai";
    const overviewMsg = "Empowering Boomers with Digitalised Inspiration, One Quote at a Time";
    return (
        <div className={textStyles.overall}>
            <div className={`${textStyles.overview}`}>
                <img className={textStyles.overviewimg} src={boomermsg}></img>
                <p>{overviewTitle}</p>
            </div>
            <div className={textStyles.overviewdesc}>
                <p>{overviewMsg}</p>
            </div>
        </div>
    );
};

export default Overview;
