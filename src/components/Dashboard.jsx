import React, { useState, useEffect } from "react";
import Heading from "./Heading";
import Navbar from "./Navbar";
import Loading from "./Loading";
import styles from "./cssfiles/Dashboard.module.css";
import Quote from "./Quote";
import Button from "./Button";
import { json } from "react-router-dom";

const Dashboard = (props) => {
    const [records, setRecords] = useState(null);
    // const requestString = "https://api.airtable.com/v0/app0xUnfV7DZQtvIL/chatresponse?records[]=";
    // const [deleteRequest, setDeleteRequest] = useState(requestString);
    // const [deleted, setDeleted] = useState(false);

    const getTextRecords = async (signal) => {
        try {
            const res = await fetch(import.meta.env.VITE_AIRTABLE_CHAT_TABLE_ENDPOINT, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${props.bearerKey}`,
                },
                signal: signal,
            });

            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await res.json();
            // console.log(JSON.stringify(data));
            setRecords(data);
        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Request aborted");
            } else {
                console.error("Error fetching data:", error);
            }
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        getTextRecords(signal);

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <>
            <Heading>Home</Heading>
            <hr />
            <Navbar />
            <hr />
            <br></br>
            {records ? (
                <div className="container">
                    <div className={styles.tableheader}>Quotes</div>
                    {records.records.map((record, idx) => (
                        <>
                            <Quote
                                key={idx}
                                idx={idx}
                                id={record.id}
                                getTextRecords={getTextRecords}
                                bearerKey={props.bearerKey}>
                                {record.fields.message}
                            </Quote>
                            {/* {console.log(JSON.stringify(record))} */}
                        </>
                    ))}
                </div>
            ) : (
                <Loading></Loading>
            )}
        </>
    );
};

export default Dashboard;
