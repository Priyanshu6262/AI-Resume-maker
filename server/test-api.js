const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testAPI() {
    try {
        console.log('Testing API Key:', process.env.GEMINI_API_KEY.substring(0, 15) + '...');
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        console.log('Sending test request...');
        const result = await model.generateContent('Say hello in 5 words');
        const response = await result.response;
        const text = response.text();
        
        console.log('✅ SUCCESS! API is working!');
        console.log('Response:', text);
    } catch (error) {
        console.error('❌ FAILED:', error.message);
        if (error.message.includes('429')) {
            console.error('\nThis API key has exceeded its quota.');
            console.error('You need to:');
            console.error('1. Get a fresh API key from https://aistudio.google.com/app/apikey');
            console.error('2. OR use a different Google account');
            console.error('3. OR enable billing on your Google Cloud project');
        }
    }
}

testAPI();
