import React, { useState, useEffect } from "react";
import styles from "./cssfiles/SaveButtonHandler.module.css";
import Button from "./Button";

const splitImgString = (s, size) => {
    const ss = [];
    while (s.length > 0) {
        if (s.length < size) {
            size = s.length;
        }
        ss.push(s.substring(0, size));
        s = s.substring(size);
    }
    return ss;
};

const SaveButtonHandler = (props) => {
    const handleSaveText = async () => {
        props.setIsLoading(true);
        props.setSaveStatus(2);

        try {
            const filteredChatResponse = {
                records: [
                    {
                        fields: {
                            message: props.textresponse.choices[0]["message"].content,
                            model: props.textresponse.model,
                            date: String(props.textresponse.created),
                        },
                    },
                ],
            };

            const res = await fetch(import.meta.env.VITE_AIRTABLE_CHAT_TABLE_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${props.bearerKey}`,
                },
                body: JSON.stringify(filteredChatResponse),
            });

            if (res.ok) {
                const data = await res.json();
                props.setSaveSuccess(true);
                console.log("Save Quote Success");
            } else {
                props.setSaveStatus(false);
                console.log("Save Quote Failed");
            }
        } catch (error) {
            props.setSaveStatus(false);
            console.error("Error saving quote:", error);
        } finally {
            props.setIsLoading(false);
        }
    };

    const handleSaveImage = async () => {
        props.setIsLoading(true);
        props.setSaveStatus(3);

        try {
            const saveImageRequest = {
                records: [
                    {
                        fields: {
                            image: props.url,
                            date: String(props.imageresponse.created),
                        },
                    },
                ],
            };

            const res = await fetch(import.meta.env.VITE_AIRTABLE_IMAGE_TABLE_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${props.bearerKey}`,
                },
                body: JSON.stringify(saveImageRequest),
            });

            if (res.ok) {
                const data = await res.json();
                props.setSaveSuccess(true);
                console.log("Save Image Success");
            } else {
                props.setSaveStatus(false);
                console.log("Save Image Failed");
            }
        } catch (error) {
            props.setSaveStatus(false);
            console.error("Error Saving Image:", error);
        } finally {
            props.setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <>
                    <div className="col-sm-3">
                        <Button btn={styles.submitbtn} onClick={handleSaveText}>
                            Save Text
                        </Button>
                    </div>
                    <div className="col-sm-3">
                        <Button btn={styles.submitbtn} onClick={handleSaveImage}>
                            Save Image
                        </Button>
                    </div>
                    <div className="col-sm-3">
                        <Button btn={styles.submitbtn}>Save Quote</Button>
                    </div>
                    <div className="col-sm-3">
                        <Button
                            btn={styles.submitbtn}
                            onClick={() => {
                                props.setShowModal(false);
                            }}>
                            Cancel
                        </Button>
                    </div>
                </>
            </div>
        </div>
    );
};

export default SaveButtonHandler;
