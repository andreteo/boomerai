import React, { useState } from "react";
import Display from "./components/Display";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
    const chatEndpoint = import.meta.env.VITE_OPENAI_CHAT_ENDPOINT;
    const imageEndpoint = import.meta.env.VITE_OPENAI_DALLE_ENDPOINT;
    const authorizationKey = import.meta.env.VITE_OPENAI_API_KEY;
    const bearerKey = import.meta.env.VITE_AIRTABLE_API_KEY;

    const gptPrompt = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: "generate a short string of text for an inspirational image for someone who feels ",
            },
        ],
        temperature: 0.7,
        max_tokens: 16,
    };

    const imagePrompt = {
        model: "dall-e-3",
        prompt: "generate an inspirational image, NO TEXT, for someone who feels ",
        size: "1024x1024",
    };

    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/main" />} />
            <Route
                path="main"
                element={
                    <Display
                        chatEndpoint={chatEndpoint}
                        imageEndpoint={imageEndpoint}
                        authorizationKey={authorizationKey}
                        gptPrompt={gptPrompt}
                        imagePrompt={imagePrompt}
                        bearerKey={bearerKey}></Display>
                }
            />
            <Route path="dashboard" element={<Dashboard bearerKey={bearerKey}></Dashboard>} />
        </Routes>
    );
}

export default App;
