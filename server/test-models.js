const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function listModels() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // Try different model names
        const modelsToTry = [
            'gemini-1.5-pro',
            'gemini-1.5-pro-latest',
            'gemini-2.0-flash',
            'gemini-2.0-flash-latest',
            'gemini-exp-1206',
            'gemini-1.0-pro'
        ];

        console.log('Testing available models...\n');

        for (const modelName of modelsToTry) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent('Test');
                console.log(`✅ ${modelName} - AVAILABLE`);
            } catch (error) {
                if (error.message.includes('404') || error.message.includes('not found')) {
                    console.log(`❌ ${modelName} - NOT AVAILABLE`);
                } else {
                    console.log(`⚠️  ${modelName} - OTHER ERROR: ${error.message}`);
                }
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

listModels();
