const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Chat Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: "API Key not configured" });
        }

        // Construct chat history for context
        // We'll add a system instruction-like context at the beginning
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "You are a helpful assistant for Zen Leaf, a premium Japanese green tea shop. You are knowledgeable about Matcha, Sencha, Gyokuro, and other Japanese teas. You are polite, calm, and helpful. Keep answers concise." }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to assist Zen Leaf customers with their inquiries about our premium Japanese green teas." }],
                },
                ...(history || []).map(msg => ({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.text }]
                }))
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.json({ response: text });

    } catch (error) {
        console.error("Error in chat endpoint:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'zen_leaf_landing.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
