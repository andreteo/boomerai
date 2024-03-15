import React, { useState, useEffect } from "react";
import btnStyles from "./cssfiles/ButtonsStyling.module.css";
import Button from "./Button";

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
                props.setQuoteBtnSaved(true);
                console.log("Save Quote Success");
            } else {
                props.setSaveStatus(false);
                props.setQuoteBtnSaved(false);
                console.log("Save Quote Failed");
            }
        } catch (error) {
            props.setSaveStatus(false);
            props.setQuoteBtnSaved(false);
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
                props.setImageBtnSaved(true);
                console.log("Save Image Success");
            } else {
                props.setSaveSuccess(false);
                props.setImageBtnSaved(false);
                console.log("Save Image Failed");
            }
        } catch (error) {
            props.setSaveSuccess(false);
            props.setImageBtnSaved(false);
            console.error("Error Saving Image:", error);
        } finally {
            props.setIsLoading(false);
        }
    };

    const handleSaveQuote = async () => {
        try {
            await handleSaveText();
            await handleSaveImage();
        } catch (error) {
            props.setSaveSuccess(false);
            props.setBothButtonSaved(false);
            console.error("Error saving quote:", error);
        } finally {
            props.setSaveStatus(4);
            props.setSaveSuccess(true);
            props.setBothBtnSaved(true);
        }
    };

    return (
        <div className="container p-3">
            <div className="row">
                <>
                    <div className="col-sm-3">
                        {props.quoteBtnSaved ? (
                            <Button btn={`${btnStyles.submitbtn} ${btnStyles.disabledbtn}`}>Save Text</Button>
                        ) : (
                            <Button btn={btnStyles.submitbtn} onClick={handleSaveText}>
                                Save Text
                            </Button>
                        )}
                    </div>

                    <div className="col-sm-3">
                        {props.imageBtnSaved ? (
                            <Button btn={`${btnStyles.submitbtn} ${btnStyles.disabledbtn}`}>Save Image</Button>
                        ) : (
                            <Button btn={btnStyles.submitbtn} onClick={handleSaveImage}>
                                Save Image
                            </Button>
                        )}
                    </div>

                    <div className="col-sm-3">
                        {props.bothBtnSaved ? (
                            <Button btn={`${btnStyles.submitbtn}  ${btnStyles.disabledbtn}`}>Save Quote</Button>
                        ) : (
                            <Button btn={btnStyles.submitbtn} onClick={handleSaveQuote}>
                                Save Quote
                            </Button>
                        )}
                    </div>

                    <div className="col-sm-3">
                        <Button
                            btn={btnStyles.submitbtn}
                            onClick={() => {
                                props.setShowModal(false);
                                props.setIsLoading(false);
                                props.setSaveStatus(1);
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
