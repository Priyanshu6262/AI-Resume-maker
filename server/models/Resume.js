const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    templateId: { type: String, required: true },
    personalInfo: {
        fullName: String,
        email: String,
        phone: String,
        address: String,
        linkedIn: String,
        website: String,
        summary: String,
    },
    education: [
        {
            institution: String,
            degree: String,
            year: String,
        }
    ],
    experience: [
        {
            company: String,
            role: String,
            duration: String,
            description: String,
        }
    ],
    skills: [String],
    projects: [
        {
            title: String,
            description: String,
            link: String,
        }
    ],
}, { timestamps: true });

const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;
