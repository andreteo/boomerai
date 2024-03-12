import React from "react";
import styles from "./cssfiles/SaveButtonHandler.module.css";
import Button from "./Button";

const SaveButtonHandler = (props) => {
    const handleSaveText = async () => {
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
            console.log("Save Quote Success");
        } else {
            console.log("Save Quote Failed");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-4">
                    <Button btn={styles.submitbtn} onClick={handleSaveText}>
                        Save Text
                    </Button>
                </div>
                <div className="col-sm-4">
                    <Button btn={styles.submitbtn}>Save Image</Button>
                </div>
                <div className="col-sm-4">
                    <Button btn={styles.submitbtn}>Save Quote</Button>
                </div>
            </div>
        </div>
    );
};

export default SaveButtonHandler;
