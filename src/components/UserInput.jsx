import React, { useRef, useState } from "react";
import styles from "./cssfiles/UserInput.module.css";
import Button from "./Button";

const UserInput = (props) => {
    const [input, setInput] = useState("");
    const newInput = useRef();

    return (
        <div className={`row ${styles.user}`}>
            <input
                className={`${styles.inp} ${styles.userinput} col`}
                type="text"
                ref={newInput}
                placeholder={props.children}></input>
            <div className="col-md-2">
                <Button
                    btn={styles.submitbtn}
                    onClick={() => {
                        props.generateText(newInput.current.value);
                        props.generateImage(newInput.current.value);
                        newInput.current.value = "";
                    }}>
                    Generate!
                </Button>
            </div>
        </div>
    );
};

export default UserInput;
