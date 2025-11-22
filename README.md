# Zen Leaf - Green Tea Project

This is a sample project demonstrating the integration of **Google Gemini** into a web application using **Antigravity**.

## Overview

Zen Leaf is a premium Japanese green tea shop landing page. It features a modern, glassmorphism-inspired design and an AI-powered chatbot assistant that helps customers with their tea inquiries.

## Features

-   **Beautiful UI**: Responsive design with glassmorphism effects and smooth animations.
-   **Gemini Chatbot**: Integrated AI assistant powered by `gemini-2.0-flash` to answer questions about tea.
-   **Node.js Backend**: Simple Express server to handle API requests securely.

## Tech Stack

-   **Frontend**: HTML, CSS, JavaScript
-   **Backend**: Node.js, Express
-   **AI**: Google Gemini API (`gemini-2.0-flash`)
-   **Tools**: Antigravity (AI Coding Assistant)

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Configure Environment**:
    Create a `.env` file and add your Gemini API key:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

3.  **Run the Server**:
    ```bash
    node server.js
    ```

4.  **Visit**: Open `http://localhost:3000` in your browser.
