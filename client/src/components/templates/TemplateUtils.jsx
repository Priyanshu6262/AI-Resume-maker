import React, { useState, useLayoutEffect, useRef } from 'react';

export const getLinearBlocks = (TemplateComponents, data) => {
    const blocks = [];
    const { personalInfo, education, experience, skills } = data;
    const { Header, SectionTitle, Summary, ExperienceItem, ProjectItem, EducationItem, SkillsList } = TemplateComponents;

    // 1. Header
    blocks.push({ id: 'header', component: <Header key="header" /> });

    // 2. Summary
    if (personalInfo && personalInfo.summary) {
        blocks.push({ id: 'summary-title', component: <SectionTitle key="sum-title" title="Summary" /> });
        blocks.push({ id: 'summary-content', component: <Summary key="sum-content" /> });
    }

    // 3. Experience
    if (experience && experience.length > 0) {
        blocks.push({ id: 'exp-title', component: <SectionTitle key="exp-title" title="Professional Experience" /> });
        experience.forEach((exp, i) => {
            blocks.push({ id: `exp-${i}`, component: <ExperienceItem key={`exp-${i}`} exp={exp} /> });
        });
    }

    // 4. Projects
    if (data.projects && data.projects.length > 0) {
        blocks.push({ id: 'proj-title', component: <SectionTitle key="proj-title" title="Projects" /> });
        data.projects.forEach((proj, i) => {
            blocks.push({ id: `proj-${i}`, component: <ProjectItem key={`proj-${i}`} proj={proj} /> });
        });
    }

    // 5. Education
    if (education && education.length > 0) {
        blocks.push({ id: 'edu-title', component: <SectionTitle key="edu-title" title="Education" /> });
        education.forEach((edu, i) => {
            blocks.push({ id: `edu-${i}`, component: <EducationItem key={`edu-${i}`} edu={edu} /> });
        });
    }

    // 6. Skills
    if (skills && skills.length > 0) {
        blocks.push({ id: 'skill-title', component: <SectionTitle key="skill-title" title="Skills" /> });
        blocks.push({ id: 'skill-list', component: <SkillsList key="skill-list" /> });
    }

    return blocks;
};

export const PagedRenderer = ({ blocks, data }) => {
    return (
        <div className="flex flex-col gap-8">
            <div className="resume-page bg-white w-full min-h-full p-10 font-serif relative">
                {blocks.map(b => (
                    <div key={b.id}>{b.component}</div>
                ))}
            </div>
        </div>
    );
};
