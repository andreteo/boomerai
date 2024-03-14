import React, { useState } from "react";
import Navbar from "./Navbar";
import Heading from "./Heading";
import UserInput from "./UserInput";
import Overview from "./Overview";
import About from "./About";
import Loading from "./Loading";
import Modal from "./Modal";

const Display = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [saveStatus, setSaveStatus] = useState(1);
    const [text, setText] = useState([]);
    const [image, setImage] = useState([]);

    const generateBoomerContent = async (input) => {
        setIsLoading(true);
        setShowModal(false);

        props.gptPrompt.messages[0].content += input;

        try {
            const textRes = await fetch(props.chatEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${props.authorizationKey}`,
                },
                body: JSON.stringify(props.gptPrompt),
            });
            const textData = await textRes.json();
            setText(textData);
            console.log("FETCH TEXT SUCCESS");
        } catch (error) {
            console.error("Error generating text:", error);
        }

        props.imagePrompt.prompt += input;

        try {
            const imageRes = await fetch(props.imageEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${props.authorizationKey}`,
                },
                body: JSON.stringify(props.imagePrompt),
            });
            const imageData = await imageRes.json();
            setImage(imageData);
            console.log("FETCH IMAGE SUCCESS");
        } catch (error) {
            console.error("Error generating image:", error);
        }

        setIsLoading(false);
        setShowModal(true);
    };

    return (
        <>
            <Heading>{props.children}</Heading>
            <Navbar />

            <div className="container">
                <Overview></Overview>

                <UserInput generateBoomerContent={generateBoomerContent}>{"How are you feeling? ..."}</UserInput>

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
            </div>
        </>
    );
};

export default Display;
