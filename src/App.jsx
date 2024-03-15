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
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: "Generate an inspirational message for someone who is feeling ",
            },
            {
                role: "assistant",
                content:
                    "Remember to keep it positive and empathetic. Your message can provide comfort and encouragement. End your sentence properly, with a punctuation. It needs to make sense. You don't have to use the full token limit if needs be.",
            },
        ],
        temperature: 0.7,
        max_tokens: 32, // Adjust token count as needed
    };

    const imagePrompt = {
        model: "dall-e-3",
        prompt: "Generate an inspirational image, without any text, for someone who is feeling ",
        size: "1024x1024",
    };

    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/main" />} />
            <Route
                path="/main"
                element={
                    <Display
                        chatEndpoint={chatEndpoint}
                        imageEndpoint={imageEndpoint}
                        authorizationKey={authorizationKey}
                        gptPrompt={gptPrompt}
                        imagePrompt={imagePrompt}
                        bearerKey={bearerKey}>
                        Home
                    </Display>
                }
            />
            <Route path="/dashboard" element={<Dashboard bearerKey={bearerKey}>Boomer Customs</Dashboard>} />
        </Routes>
    );
}

export default App;
