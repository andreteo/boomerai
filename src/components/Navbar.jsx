import React from "react";
import btnStyles from "./cssfiles/ButtonsStyling.module.css";

const Navbar = () => {
    return (
        <>
            <div className="nav">
                <a href="/main" className={btnStyles.submitbtn}>
                    Home
                </a>
                <a href="/dashboard" className={btnStyles.submitbtn}>
                    Boomer Customs
                </a>
            </div>
            <hr />
        </>
    );
};

export default Navbar;
