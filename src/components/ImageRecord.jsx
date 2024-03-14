import React from "react";
import Image from "./Image";
import Button from "./Button";
import buttonStyles from "./cssfiles/ButtonsStyling.module.css";
import imageStyles from "./cssfiles/ImageStyling.module.css";

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
            <div className={imageStyles.imgcontainerchild}>
                {props.selectedImage === props.url ? (
                    <div className={imageStyles.highlightselected}>
                        <Button
                            btn={`${imageStyles.imgelement}`}
                            onClick={() => {
                                props.setSelectedImage(props.id);
                            }}>
                            <Image url={props.children}></Image>
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button
                            btn={imageStyles.imgelement}
                            onClick={() => {
                                props.setSelectedImage(props.url);
                            }}>
                            <Image url={props.children}></Image>
                        </Button>
                    </div>
                )}

                <Button btn={`col-sm-3 ${buttonStyles.deletebtn}`} onClick={() => handleDelete()}>
                    Delete
                </Button>
            </div>
        </>
    );
};

export default ImageRecord;
