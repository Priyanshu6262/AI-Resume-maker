const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { text, type } = req.body;
        
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ message: "Gemini API Key is not configured on the server. Please add GEMINI_API_KEY to your .env file." });
        }
        
        if (!text) {
            return res.status(400).json({ message: "Text to enhance is required." });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Using gemini-2.5-flash as it is supported by the API key
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        let prompt = "";
        if (type === 'summary') {
            prompt = `Improve the following professional summary for a resume. Make it impactful, concise, and professional. Return ONLY the improved text, no quotes or additional formatting:\n\n${text}`;
        } else if (type === 'experience') {
            prompt = `Improve the following job experience description for a resume. Focus on action verbs, quantifiable achievements, and clear phrasing. Return ONLY the improved text, no quotes or additional formatting:\n\n${text}`;
        } else if (type === 'project') {
            prompt = `Improve the following project description for a resume. Make it highlight technical skills, impact, and problem-solving. Return ONLY the improved text, no quotes or additional formatting:\n\n${text}`;
        } else {
            prompt = `Improve the following text for a resume to make it more professional. Return ONLY the improved text:\n\n${text}`;
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const enhancedText = response.text().trim();

        res.json({ enhancedText });

    } catch (error) {
        console.error("AI Enhancement Error:", error);
        res.status(500).json({ message: "Failed to enhance text with AI." });
    }
});

module.exports = router;
