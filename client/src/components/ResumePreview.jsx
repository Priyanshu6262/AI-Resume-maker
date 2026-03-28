import React from 'react';
import SimpleTemplate from './templates/SimpleTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import ModernTemplate from './templates/ModernTemplate';

import FSTemplate1 from './templates/FSTemplate1';
import FSTemplate2 from './templates/FSTemplate2';
import FSTemplate3 from './templates/FSTemplate3';

import DATemplate1 from './templates/DATemplate1';
import DATemplate2 from './templates/DATemplate2';
import DATemplate3 from './templates/DATemplate3';

import SDTemplate1 from './templates/SDTemplate1';
import SDTemplate2 from './templates/SDTemplate2';
import SDTemplate3 from './templates/SDTemplate3';

import SalesTemplate1 from './templates/SalesTemplate1';
import SalesTemplate2 from './templates/SalesTemplate2';
import SalesTemplate3 from './templates/SalesTemplate3';

import HRTemplate1 from './templates/HRTemplate1';
import HRTemplate2 from './templates/HRTemplate2';
import HRTemplate3 from './templates/HRTemplate3';

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
        case 'professional': return <ProfessionalTemplate data={safeData} />;
        case 'modern': return <ModernTemplate data={safeData} />;
        case 'fs1': return <FSTemplate1 data={safeData} />;
        case 'fs2': return <FSTemplate2 data={safeData} />;
        case 'fs3': return <FSTemplate3 data={safeData} />;
        case 'da1': return <DATemplate1 data={safeData} />;
        case 'da2': return <DATemplate2 data={safeData} />;
        case 'da3': return <DATemplate3 data={safeData} />;
        case 'sd1': return <SDTemplate1 data={safeData} />;
        case 'sd2': return <SDTemplate2 data={safeData} />;
        case 'sd3': return <SDTemplate3 data={safeData} />;
        case 'sales1': return <SalesTemplate1 data={safeData} />;
        case 'sales2': return <SalesTemplate2 data={safeData} />;
        case 'sales3': return <SalesTemplate3 data={safeData} />;
        case 'hr1': return <HRTemplate1 data={safeData} />;
        case 'hr2': return <HRTemplate2 data={safeData} />;
        case 'hr3': return <HRTemplate3 data={safeData} />;
        case 'simple':
        default:
            return <SimpleTemplate data={safeData} />;
    }
};

export default ResumePreview;
