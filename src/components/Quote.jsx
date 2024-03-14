import React, { useEffect, useState } from "react";
import styles from "./cssfiles/Dashboard.module.css";
import Button from "./Button";

const Quote = (props) => {
    const requestString = "?records[]=";

    const handleDelete = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_AIRTABLE_CHAT_TABLE_ENDPOINT + requestString + props.id, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${props.bearerKey}`,
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                props.getTextRecords();
                console.log("Record deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };

    return (
        <>
            <div className={styles.quotecontainer}>
                {props.selectedQuote === props.message ? (
                    <button
                        className={`${props.idx % 2 === 0 ? styles.tablerowgrey : styles.tablerowdarkgrey} ${
                            styles.highlightselected
                        }`}
                        onClick={() => {
                            props.setSelectedQuote(props.message);
                        }}>
                        {props.children}
                    </button>
                ) : (
                    <button
                        className={`${props.idx % 2 === 0 ? styles.tablerowgrey : styles.tablerowdarkgrey}`}
                        onClick={() => {
                            props.setSelectedQuote(props.message);
                        }}>
                        {props.children}
                    </button>
                )}

                <button className={`${styles.deletebtn}`} onClick={() => handleDelete()}>
                    Delete
                </button>
            </div>
        </>
    );
};

export default Quote;
