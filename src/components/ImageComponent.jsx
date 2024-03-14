import React from "react";
import { useEffect, useState } from "react";
import styles from "./cssfiles/Image.module.css";

const ImageComponent = (props) => {
    const [imgSrc, setImgSrc] = useState("");

    // const base64 = fs.writeFileSync("image.jpg", )
    // useEffect(() => {
    //     if (props.imageresponse?.data[0]?.b64_json) {
    //         // Decode the base64 string to a data URL
    //         const dataUrl = `data:image/jpeg;base64,${props.imageresponse.data[0].b64_json}`;
    //         setImgSrc(dataUrl);
    //     }
    // }, [props.imageresponse]);

    return (
        <>
            {}
            {/* {console.log(btoa(props.img.data[0]["b64_json"]))} */}
            <div className={styles.imgcontainer}>
                <img className={styles.image} src={imgSrc} alt="test" />
                <div className={`${styles.textcentered} ${styles.textglow}`}>{props.children}</div>
            </div>
        </>
    );
};

export default ImageComponent;
