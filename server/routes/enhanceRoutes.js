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
        // Using gemini-2.0-flash model
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        let prompt = "";
        if (type === 'summary') {
            prompt = `Improve the following professional summary for a resume. Make it impactful, concise, and professional. You MUST keep the output UNDER 40 words total. Do NOT write a long paragraph. Return ONLY the improved text, with no quotes or additional formatting. CRITICAL: Do NOT use any line breaks, newlines, or hard wraps. Write as one continuous string:\n\n${text}`;
        } else if (type === 'experience') {
            prompt = `Improve the following job experience description for a resume. Focus on action verbs, quantifiable achievements, and clear phrasing. Return ONLY the improved text, no quotes or additional formatting. CRITICAL: Do NOT hard-wrap sentences. Only use newlines for distinct bullet points:\n\n${text}`;
        } else if (type === 'project') {
            prompt = `Improve the following project description for a resume. Make it highlight technical skills, impact, and problem-solving. Return ONLY the improved text, no quotes or additional formatting. CRITICAL: Do NOT hard-wrap sentences. Only use newlines for distinct bullet points:\n\n${text}`;
        } else {
            prompt = `Improve the following text for a resume to make it more professional. Return ONLY the improved text:\n\n${text}`;
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let enhancedText = response.text().trim();

        if (type === 'summary') {
            enhancedText = enhancedText.replace(/\n+/g, ' ').replace(/\s{2,}/g, ' ');
        }

        res.json({ enhancedText });

    } catch (error) {
        console.error("AI Enhancement Error:", error);
        console.error("Error details:", error?.response?.data || error?.message);
        res.status(500).json({ message: error?.message || "Failed to enhance text with AI." });
    }
});



router.post('/generate-job-fit', async (req, res) => {
    try {
        const { jobDescription, fileData, mimeType } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ message: "Gemini API Key is not configured." });
        }

        if (!jobDescription || !fileData) {
            return res.status(400).json({ message: "Job description and resume file are required." });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `You are an expert resume writer and ATS optimizer. 
I have provided my current resume (as an attached file) and a target Job Description.
Please rewrite and optimize my resume to make it highly tailored and ATS-friendly for this specific Job Description.

Job Description & Role Info:
${jobDescription}

CRITICAL INSTRUCTIONS YOU MUST FOLLOW:
1. SUMMARY LENGTH: The Professional Summary MUST BE EXTREMELY SHORT. Maximum 40 words.
2. EXPERIENCE/PROJECT DESCRIPTION FORMAT: Use bullet points ('•'). Separate each bullet point with a newline ('\\n').
3. HIGHLIGHT RELEVANT SKILLS: Extract the skills I have that match the job description and emphasize them.
4. DO NOT INVENT FACTS: Only use the experience and education provided in my uploaded resume, but phrase it to highlight the impact relevant to the job.

Return the generated content ONLY as a valid JSON object matching EXACTLY this schema structure:
{
  "personalInfo": {
    "fullName": "Extracted Name",
    "email": "Extracted Email",
    "phone": "Extracted Phone",
    "address": "Extracted Address",
    "summary": "Short 40-word impactful summary targeting this role.",
    "linkedIn": "URL if present",
    "website": "URL if present",
    "github": "URL if present"
  },
  "skills": [
    "Skill 1", "Skill 2"
  ],
  "experience": [
    {
      "company": "Company Name",
      "position": "Job Title",
      "duration": "Start Date - End Date",
      "description": "• First impact-driven bullet point.\\n• Second impact-driven bullet point."
    }
  ],
  "education": [
    {
      "institution": "University/School",
      "degree": "Degree Name",
      "year": "Graduation Year"
    }
  ],
  "projects": [
    { 
      "title": "Project Title", 
      "description": "• First high-impact bullet point.\\n• Second high-impact bullet point.", 
      "link": "URL if present" 
    }
  ]
}
Do not include any markdown formatting like \`\`\`json. Return raw JSON only.`;

        const imageParts = [
            {
                inlineData: {
                    data: fileData,
                    mimeType: mimeType
                }
            }
        ];

        const result = await model.generateContent([prompt, ...imageParts]);
        const response = await result.response;
        let text = response.text().trim();

        // Remove markdown formatting if the model still outputs it
        if (text.startsWith('\`\`\`json')) text = text.substring(7);
        if (text.startsWith('\`\`\`')) text = text.substring(3);
        if (text.endsWith('\`\`\`')) text = text.substring(0, text.length - 3);
        text = text.trim();

        const generatedData = JSON.parse(text);
        res.json(generatedData);

    } catch (error) {
        console.error("AI Generation from JD Error:", error?.message || error);
        res.status(500).json({ message: error?.message || "Failed to generate AI content from Job Description." });
    }
});

module.exports = router;
