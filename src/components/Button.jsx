import React from "react";

const Button = (props) => {
    return (
        <div className={props.btn} onClick={props.onClick}>
            {props.children}
        </div>
    );
};

export default Button;
