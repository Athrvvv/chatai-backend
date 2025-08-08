// File: backend-server/server.js

const express = require('express');
const cors = require('cors');
const axios = require('axios'); // To make HTTP requests to the Gemini API

// 1. Configure dotenv to load variables from your .env file
require('dotenv').config();

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

// === Middleware ===
app.use(cors({
  origin: 'https://chatai-frontend-neon.vercel.app/' // Replace with your Vercel URL
}));      // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// === API Routes ===
app.post('/api/chat', async (req, res) => {
  try {
    // 1. RECEIVE and CLEAN the input from the frontend
    const userInput = req.body.message;

    if (!userInput) {
      return res.status(400).json({ error: 'Message is required.' });
    }
    
    // Simple cleaning: remove leading/trailing whitespace
    const cleanedInput = userInput.trim();

    // 2. PROCESS the input by sending it to the Gemini API
    const geminiUrl = `${process.env.GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`;

    const payload = {
      contents: [{
        parts: [{
          text: cleanedInput
        }]
      }]
    };

    const apiResponse = await axios.post(geminiUrl, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // 3. PROCESS the response from Gemini
    // Extract the AI's generated text from the response
    const botResponse = apiResponse.data.candidates[0].content.parts[0].text;

    // 4. SEND the final response back to the frontend
    res.json({ reply: botResponse });

  } catch (error) {
    // Handle potential errors from the API call or other issues
    console.error('Error communicating with Gemini API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to get a response from the AI.' });
  }
});

// === Start the Server ===
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
