const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed origins — supports comma-separated FRONTEND_URLS env var
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://ai-resume-maker-beta-beryl.vercel.app', // Vercel deployment
    // Also support any extra URLs set in Render env vars (comma-separated)
    ...(process.env.FRONTEND_URLS ? process.env.FRONTEND_URLS.split(',').map(u => u.trim()) : []),
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.some(allowed => origin.startsWith(allowed))) {
            return callback(null, true);
        }
        console.warn(`CORS blocked origin: ${origin}`);
        return callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check
app.get('/', (req, res) => {
    res.send('Resume Maker API is running');
});

app.use('/api/resumes', require('./routes/resumeRoutes'));
app.use('/api/enhance', require('./routes/enhanceRoutes'));

// Global error handler — prevents silent 500s
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.message);
    res.status(500).json({ message: err.message || 'Internal Server Error' });
});

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resumemaker')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
