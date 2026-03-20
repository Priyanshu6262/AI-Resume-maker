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
    const [pages, setPages] = useState([]);
    const measureRef = useRef(null);

    useLayoutEffect(() => {
        if (!measureRef.current) return;

        const blockNodes = Array.from(measureRef.current.children);
        const calculatedPages = [];
        let currentPageBlocks = [];
        let currentHeight = 0;
        // 60px padding top/bottom accounted for in PAGE_HEIGHT or here. 
        // The container has p-10 (2.5rem = 40px). 
        // Total available height ~ 1123px - 80px = 1043px.
        const MAX_HEIGHT = 1040;

        blockNodes.forEach((node, index) => {
            const height = node.offsetHeight;
            if (currentHeight + height > MAX_HEIGHT && currentPageBlocks.length > 0) {
                calculatedPages.push(currentPageBlocks);
                currentPageBlocks = [blocks[index]];
                currentHeight = height;
            } else {
                currentPageBlocks.push(blocks[index]);
                currentHeight += height;
            }
        });

        if (currentPageBlocks.length > 0) calculatedPages.push(currentPageBlocks);
        setPages(calculatedPages);

    }, [blocks, data]); // Re-calculate when data changes

    return (
        <>
            {/* Hidden Measurement Container */}
            <div ref={measureRef} className="absolute top-0 left-0 w-[210mm] opacity-0 pointer-events-none z-[-1] bg-white p-10 font-serif">
                {blocks.map(b => <div key={b.id}>{b.component}</div>)}
            </div>

            {/* Visible Pages */}
            <div className="flex flex-col gap-8">
                {pages.map((pageBlocks, pageIndex) => (
                    // Each page is an A4 sheet
                    <div key={pageIndex} className="resume-page bg-white w-[210mm] min-h-[297mm] p-10 font-serif shadow-lg relative">
                        {pageBlocks.map(b => (
                            <div key={b.id}>{b.component}</div>
                        ))}
                        {/* Page Number */}
                        <div className="absolute bottom-2 right-4 text-xs text-slate-400">
                            Page {pageIndex + 1}
                        </div>
                    </div>
                ))}
                {/* If pages are calculating or empty, show loading or empty state */}
                {pages.length === 0 && (
                    <div className="bg-white w-[210mm] min-h-[297mm] p-10 font-serif shadow-lg flex items-center justify-center text-slate-400">
                        Preparing layout...
                    </div>
                )}
            </div>
        </>
    );
};
