import React, { useEffect, useState } from "react";
import styles from "./cssfiles/Dashboard.module.css";
import Image from "./Image";
import Button from "./Button";

const ImageRecord = (props) => {
    const requestString = "?records[]=";

    const handleDelete = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_AIRTABLE_IMAGE_TABLE_ENDPOINT + requestString + props.id, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${props.bearerKey}`,
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                props.getImageRecords();
                console.log("Record deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };

    return (
        <>
            <div className={styles.imgcontainerchild}>
                {props.selectedImage === props.url ? (
                    <div className={styles.highlightselected}>
                        <Button
                            className={`${styles.imgelement}`}
                            onClick={() => {
                                props.setSelectedImage(props.id);
                            }}>
                            <Image url={props.children}></Image>
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button
                            className={styles.imgelement}
                            onClick={() => {
                                props.setSelectedImage(props.url);
                            }}>
                            <Image url={props.children}></Image>
                        </Button>
                    </div>
                )}

                <button className={`col-sm-3 ${styles.deletebtn} ${styles.imgelement}`} onClick={() => handleDelete()}>
                    Delete
                </button>
            </div>
        </>
    );
};

export default ImageRecord;
