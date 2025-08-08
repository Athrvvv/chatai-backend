# ChatAI Backend Server

This repository contains the backend service for the ChatAI application. It's a robust Node.js server built with Express that acts as a secure intermediary between the frontend client and the Google Gemini API.

## Core Features

-   **API Endpoint**: Provides a single `/api/chat` endpoint to receive user prompts.
-   **AI Integration**: Securely communicates with the Google Gemini API using a protected API key to generate intelligent, conversational responses.
-   **CORS Enabled**: Properly configured to accept requests only from the deployed frontend application, ensuring security.
-   **Scalable Foundation**: Built with a clean structure that's easy to extend with more features, such as conversation history or user data management.

## Technologies Used

-   **Node.js**: A JavaScript runtime for building the server.
-   **Express**: A minimal and flexible Node.js web application framework.
-   **Google Gemini API**: The generative AI model that powers the chat responses.
-   **CORS**: A package for enabling Cross-Origin Resource Sharing.
-   **Dotenv**: A module to load environment variables from a `.env` file.

## Getting Started

1.  Clone the repository.
2.  Run `npm install` to install the dependencies.
3.  Create a `.env` file in the root directory and add your `GEMINI_API_KEY`.
4.  Run `npm start` to start the development server.
