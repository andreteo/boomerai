import React from "react";
import textStyling from "./cssfiles/TextStyling.module.css";

const About = () => {
    const aboutPara =
        "Welcome to Boomer.ai, where the power of generative AI meets the timeless art of inspiration. This platform allows users to effortlessly create inspirational images with a single tap, ready to be shared with unsuspecting family and friends. Simply enter how you're feeling today, and let Boomer.ai work its magic. Whether you're seeking a motivational boost or looking to spread positivity, our AI-driven solution has you covered. Join us on a journey of inspiration and upliftment, one unsolicited share at a time, with Boomer.ai.";

    return (
        <div className={textStyling.about}>
            <h1 className={textStyling.aboutheader}>What is Boomer.ai?</h1>
            <p className={textStyling.aboutpara}>{aboutPara}</p>
        </div>
    );
};

export default About;
