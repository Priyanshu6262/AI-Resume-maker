const express = require('express');
const Resume = require('../models/Resume');

const router = express.Router();

// Create or Update Resume
router.post('/', async (req, res) => {
    const { _id, templateId, personalInfo, education, experience, skills, projects } = req.body;

    try {
        let resume = null;
        if (_id) {
            resume = await Resume.findById(_id);
        }

        if (resume) {
            // Update existing
            resume.templateId = templateId;
            resume.personalInfo = personalInfo;
            resume.education = education;
            resume.experience = experience;
            resume.skills = skills;
            resume.projects = projects;
        } else {
            // Create new
            resume = new Resume({
                templateId,
                personalInfo,
                education,
                experience,
                skills,
                projects,
            });
        }

        const savedResume = await resume.save();
        res.json(savedResume);
    } catch (error) {
        console.error("Save Resume Error:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get ALL Resumes
router.get('/', async (req, res) => {
    try {
        const resumes = await Resume.find().sort({ updatedAt: -1 });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get specific Resume
router.get('/:id', async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (resume) {
            res.json(resume);
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete Resume
router.delete('/:id', async (req, res) => {
    try {
        const resume = await Resume.findByIdAndDelete(req.params.id);
        if (resume) {
            res.json({ message: 'Resume deleted successfully' });
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
