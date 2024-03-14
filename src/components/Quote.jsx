import React from "react";
import btnStyles from "./cssfiles/ButtonsStyling.module.css";
import tableStyles from "./cssfiles/TableStyling.module.css";
import imageStyles from "./cssfiles/ImageStyling.module.css";
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
            <div className={imageStyles.quotecontainer}>
                {props.selectedQuote === props.message ? (
                    <button
                        className={`${props.idx % 2 === 0 ? tableStyles.tablerowgrey : tableStyles.tablerowdarkgrey} ${
                            imageStyles.highlightselected
                        }`}
                        onClick={() => {
                            props.setSelectedQuote(props.message);
                        }}>
                        {props.children}
                    </button>
                ) : (
                    <button
                        className={`${props.idx % 2 === 0 ? tableStyles.tablerowgrey : tableStyles.tablerowdarkgrey}`}
                        onClick={() => {
                            props.setSelectedQuote(props.message);
                        }}>
                        {props.children}
                    </button>
                )}

                <Button btn={`${btnStyles.deletebtn}`} onClick={() => handleDelete()}>
                    Delete
                </Button>
            </div>
        </>
    );
};

export default Quote;
