import React, { useEffect, useState } from "react";
import styles from "./cssfiles/Dashboard.module.css";

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
        <div className="row">
            <div className={`col-sm-9 ${props.idx % 2 === 0 ? styles.tablerowgrey : styles.tablerowdarkgrey}`}>
                {props.children}
            </div>
            <button className={`col-sm-2 ${styles.deletebtn}`} onClick={() => handleDelete()}>
                Delete
            </button>
        </div>
    );
};

export default Quote;
