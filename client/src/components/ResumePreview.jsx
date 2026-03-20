import React from 'react';
import SimpleTemplate from './templates/SimpleTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import ModernTemplate from './templates/ModernTemplate';

const ResumePreview = ({ data, templateId }) => {
    // Ensure all required properties exist even if missing from backend
    const safeData = {
        personalInfo: data?.personalInfo || {},
        education: data?.education || [],
        experience: data?.experience || [],
        skills: data?.skills || [],
        projects: data?.projects || []
    };

    // Return selected template
    switch (templateId) {
        case 'professional':
            return <ProfessionalTemplate data={safeData} />;
        case 'modern':
            return <ModernTemplate data={safeData} />;
        case 'simple':
        default:
            return <SimpleTemplate data={safeData} />;
    }
};

export default ResumePreview;
