import React, { useRef, useState } from "react";
import textStyles from "./cssfiles/TextStyling.module.css";
import btnStyles from "./cssfiles/ButtonsStyling.module.css";
import Button from "./Button";

const UserInput = (props) => {
    const inputRef = useRef();

    return (
        <div className={`row ${textStyles.user}`}>
            <input
                className={`${textStyles.inp} ${textStyles.userInput} col`}
                type="text"
                ref={inputRef}
                placeholder={props.children}></input>
            <div className="col-md-2">
                <Button
                    btn={btnStyles.generatebtn}
                    onClick={() => {
                        props.generateBoomerContent(inputRef.current.value);
                        inputRef.current.value = "";
                    }}>
                    Generate!
                </Button>
                {/* <Button
                    btn={btnStyles.generatebtn}
                    onClick={() => {
                        props.generateText(inputRef.current.value);
                        props.generateImage(inputRef.current.value);
                        inputRef.current.value = "";
                    }}>
                    Generate!
                </Button> */}
            </div>
        </div>
    );
};

export default UserInput;
