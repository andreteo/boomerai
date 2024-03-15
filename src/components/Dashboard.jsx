import React, { useState, useEffect } from "react";
import Heading from "./Heading";
import Navbar from "./Navbar";
import Loading from "./Loading";
import Quote from "./Quote";
import Button from "./Button";
import ImageRecord from "./ImageRecord";
import DashboardModal from "./DashboardModal";
import btnStyles from "./cssfiles/ButtonsStyling.module.css";
import tableStyles from "./cssfiles/TableStyling.module.css";
import imageStyles from "./cssfiles/ImageStyling.module.css";
import textStyles from "./cssfiles/TextStyling.module.css";

const Dashboard = (props) => {
    const [records, setRecords] = useState(null);
    const [imgRecords, setImgRecords] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedQuote, setSelectedQuote] = useState("");
    const [displayModal, setDisplayModal] = useState(false);
    const [displayDash, setDisplayDash] = useState(false);

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
            const removedDupes = removeDupes(data);

            setRecords({
                records: removedDupes,
            });
        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Request aborted");
            } else {
                console.error("Error fetching data:", error);
            }
        }
    };

    const getImageRecords = async (signal) => {
        try {
            const res = await fetch(import.meta.env.VITE_AIRTABLE_IMAGE_TABLE_ENDPOINT, {
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
            setImgRecords(data);
        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Request aborted");
            } else {
                console.error("Error fetching data:", error);
            }
        }
    };

    const removeDupes = (recs) => {
        const uniqueMessages = {};

        const filteredArray = recs.records.filter((rec) => {
            if (uniqueMessages[rec.fields.message]) {
                return false;
            } else {
                uniqueMessages[rec.fields.message] = true;
                return true;
            }
        });

        return filteredArray;
    };

    const checkSelections = () => {
        if (selectedImage && selectedQuote) {
            setDisplayModal(true);
        } else {
            setDisplayModal(false);
        }
    };

    const handleGenerateFromTemplate = () => {
        setDisplayDash(true);
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        getTextRecords(signal);

        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        getImageRecords(signal);

        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        checkSelections();
    }, [selectedImage, selectedQuote]);

    return (
        <>
            <Heading>{props.children}</Heading>
            <Navbar />
            {displayModal && (
                <div className={btnStyles.templatebtncontainer}>
                    <Button
                        btn={`${btnStyles.generatebtn} col-sm-4`}
                        onClick={() => {
                            handleGenerateFromTemplate();
                        }}>
                        Generate From Template
                    </Button>
                </div>
            )}
            {displayDash && (
                <DashboardModal url={selectedImage} setShowModal={setDisplayDash}>
                    {selectedQuote}
                </DashboardModal>
            )}
            <br></br>
            {imgRecords ? (
                <div className="container">
                    <div className={tableStyles.tableheader}>Images</div>
                    <div className={imageStyles.imgcontainer}>
                        {imgRecords.records.map((imgRecord, idx) => (
                            <div key={idx}>
                                <ImageRecord
                                    key={idx}
                                    idx={idx}
                                    id={imgRecord.id}
                                    url={imgRecord.fields.image}
                                    getImageRecords={getImageRecords}
                                    bearerKey={props.bearerKey}
                                    selectedImage={selectedImage}
                                    setSelectedImage={setSelectedImage}>
                                    {imgRecord.fields.image}
                                </ImageRecord>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <Loading></Loading>
            )}
            <br></br>
            {records ? (
                <div className="container">
                    <div className={tableStyles.tableheader}>Quotes</div>

                    {records.records.map((record, idx) => (
                        <>
                            <Quote
                                key={idx}
                                idx={idx}
                                id={record.id}
                                message={record.fields.message}
                                getTextRecords={getTextRecords}
                                bearerKey={props.bearerKey}
                                selectedQuote={selectedQuote}
                                setSelectedQuote={setSelectedQuote}>
                                {record.fields.message}
                            </Quote>
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
