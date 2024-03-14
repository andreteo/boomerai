import React from "react";

const Heading = (props) => {
    return (
        <>
            <div className="heading">{props.children}</div>
            <hr />
        </>
    );
};

export default Heading;
