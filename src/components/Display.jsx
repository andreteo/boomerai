import React, { useState, useEffect } from "react";
import Button from "./Button";
import Navbar from "./Navbar";
import Heading from "./Heading";
import Image from "./Image";
import UserInput from "./UserInput";
import Overview from "./Overview";
import About from "./About";
import Loading from "./Loading";
import Modal from "./Modal";

const Display = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [saveStatus, setSaveStatus] = useState(1);
    const [text, setText] = useState([]);
    const [image, setImage] = useState([]);
    // const [records, setRecords] = useState({});

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
            // setRecords(data);
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

    const generateText = async (inp) => {
        setIsLoading(true);
        props.gptPrompt.messages[0].content += inp;
        try {
            const res = await fetch(props.chatEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${props.authorizationKey}`,
                },
                body: JSON.stringify(props.gptPrompt),
            });
            const resData = await res.json(inp);
            setText(resData);
            console.log("FETCH TEXT SUCCESS");
        } catch (error) {
            console.error("Error generating text:", error);
        }
    };

    const generateImage = async (inp) => {
        setShowModal(false);
        setIsLoading(true);
        props.imagePrompt.prompt += inp;
        try {
            const res = await fetch(props.imageEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${props.authorizationKey}`,
                },
                body: JSON.stringify(props.imagePrompt),
            });
            const resData = await res.json();
            setImage(resData);
            console.log("FETCH IMAGE SUCCESS");
        } catch (error) {
            console.error("Error generating text:", error);
        }
        setIsLoading(false);
        setShowModal(true);
    };

    return (
        <>
            <Heading>Home</Heading>
            <hr />
            <Navbar />
            <hr />

            <div className="container">
                <Overview></Overview>
                {showImage ? <Image url={testurl}>{testprompt}</Image> : <div></div>}
                <UserInput generateText={generateText} generateImage={generateImage}>
                    {"How are you feeling? ..."}
                </UserInput>
                <About></About>

                {isLoading && (
                    <div className="centered">
                        <Loading>Loading..</Loading>
                    </div>
                )}

                {showModal && (
                    <div className="centered">
                        <Modal
                            url={image.data[0].url}
                            prompt={text.choices[0]["message"].content}
                            textresponse={text}
                            imageresponse={image}
                            bearerKey={props.bearerKey}
                            setShowModal={setShowModal}
                            setIsLoading={setIsLoading}
                            isLoading={isLoading}
                            saveStatus={saveStatus}
                            setSaveStatus={setSaveStatus}>
                            Quote Generated!
                        </Modal>
                    </div>
                )}

                {/* <Image url={testurl}>{testprompt}</Image> */}
                {/* <h2>{JSON.stringify(text.choices)}</h2> */}
                {/* <h2>{JSON.stringify(image.data)}</h2> */}
            </div>
        </>
    );
};

export default Display;
