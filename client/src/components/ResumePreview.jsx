import { useState, useLayoutEffect, useRef, useEffect } from 'react';
import LatexTemplate from './LatexTemplate';

// A4 height in px at 96 DPI is approx 1123px. We use a safe height to account for margins.
const PAGE_HEIGHT = 1050; // Leaving some buffer for padding

const PagedResume = ({ children }) => {
    const [pages, setPages] = useState([]);
    const containerRef = useRef(null);

    // This effect measures the children and distributes them into pages
    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const childrenNodes = Array.from(containerRef.current.children);
        const newPages = [];
        let currentPage = [];
        let currentHeight = 0;

        childrenNodes.forEach((node) => {
            const h = node.offsetHeight;
            const style = window.getComputedStyle(node);
            const margin = parseInt(style.marginTop) + parseInt(style.marginBottom);
            const totalH = h + margin;

            if (currentHeight + totalH > PAGE_HEIGHT) {
                newPages.push(currentPage);
                currentPage = [node.innerHTML]; // Store HTML to re-render or clone
                currentHeight = totalH;
            } else {
                currentPage.push(node.innerHTML);
                currentHeight += totalH;
            }
        });

        // Push last page
        if (currentPage.length > 0) newPages.push(currentPage);

        // However, we can't easily "move" React nodes once rendered. 
        // A better approach for React is to pre-calculate block heights if possible, 
        // OR simply render "Pages" by passing data chunks.
        // The DOM scraping method above is destructive to React events.

        // ALTERNATIVE: Just let the user scroll for now in the editor (Linear) 
        // and handle Pagination ONLY for PDF? 
        // The user ASKED for "show everything properly across multiple pages".

    }, [children]);

    return (
        <div>
            {/* Hidden container to render all blocks and measure */}
            <div ref={containerRef} className="absolute left-[-9999px] w-[210mm] bg-white">
                {children}
            </div>

            {/* Real Paged Output would go here, requiring State to hold the segmented data */}
            {/* Since 'children' are React Elements, we can't easily serialize them back from DOM */}
        </div>
    );
};

// --- SIMPLER APPROACH: SEGMENTED DATA RENDERING ---

const ResumePreview = ({ data, templateId }) => {
    const { personalInfo, education, experience, skills } = data;

    // Helper to generate blocks for Single-Column layouts (Simple, Professional)
    const getLinearBlocks = (TemplateComponents) => {
        const blocks = [];
        const { Header, SectionTitle, Summary, ExperienceItem, ProjectItem, EducationItem, SkillsList } = TemplateComponents;

        // 1. Header
        blocks.push({ id: 'header', component: <Header key="header" /> });

        // 2. Summary
        if (personalInfo.summary) {
            blocks.push({ id: 'summary-title', component: <SectionTitle key="sum-title" title="Summary" /> });
            blocks.push({ id: 'summary-content', component: <Summary key="sum-content" /> });
        }

        // 3. Experience
        if (experience.length > 0) {
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
        if (education.length > 0) {
            blocks.push({ id: 'edu-title', component: <SectionTitle key="edu-title" title="Education" /> });
            education.forEach((edu, i) => {
                blocks.push({ id: `edu-${i}`, component: <EducationItem key={`edu-${i}`} edu={edu} /> });
            });
        }

        // 6. Skills
        if (skills.length > 0) {
            blocks.push({ id: 'skill-title', component: <SectionTitle key="skill-title" title="Skills" /> });
            blocks.push({ id: 'skill-list', component: <SkillsList key="skill-list" /> });
        }

        return blocks;
    };

    // Components for "Simple" Template
    const SimpleComponents = {
        Header: () => (
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold uppercase tracking-wide text-slate-900 mb-2">{personalInfo.fullName || 'Your Name'}</h1>
                <div className="flex justify-center items-center flex-wrap gap-4 text-sm font-medium text-slate-600">
                    {personalInfo.email && <span className="flex items-center gap-1">✉ {personalInfo.email}</span>}
                    {personalInfo.phone && <span className="flex items-center gap-1">📞 {personalInfo.phone}</span>}
                    {personalInfo.address && <span className="flex items-center gap-1">📍 {personalInfo.address}</span>}
                    {personalInfo.linkedIn && <a href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-purple-600 hover:underline">🔗 LinkedIn</a>}
                    {personalInfo.github && <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-purple-600 hover:underline">🐙 GitHub</a>}
                    {personalInfo.twitter && <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-purple-600 hover:underline">🐦 Twitter</a>}
                    {personalInfo.website && <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-purple-600 hover:underline">🌐 Portfolio</a>}
                </div>
            </header>
        ),
        SectionTitle: ({ title }) => (
            <div className="flex items-center mb-4 mt-2">
                <div className="flex-grow h-px bg-slate-300"></div>
                <h2 className="text-lg font-black uppercase tracking-widest px-4 text-slate-800">{title}</h2>
                <div className="flex-grow h-px bg-slate-300"></div>
            </div>
        ),
        Summary: () => <p className="text-justify leading-relaxed text-slate-700 mb-4">{personalInfo.summary}</p>,
        ExperienceItem: ({ exp }) => (
            <div className="mb-6 last:mb-2">
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-xl text-slate-900">{exp.role}</h3>
                    <span className="text-sm font-semibold text-slate-500 whitespace-nowrap ml-4">{exp.duration}</span>
                </div>
                <div className="text-lg italic text-slate-600 mb-2 border-b border-dotted border-slate-300 inline-block pb-0.5">{exp.company}</div>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm mt-2">{exp.description}</p>
            </div>
        ),
        ProjectItem: ({ proj }) => (
            <div className="mb-4 last:mb-2">
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-lg text-slate-900">
                        {proj.link ? (
                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:text-purple-700 hover:underline">{proj.title}</a>
                        ) : (
                            proj.title
                        )}
                    </h3>
                    {proj.sourceLink && (
                        <a href={proj.sourceLink} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-600 hover:underline flex items-center gap-1">
                            &lt;/&gt; Source Code
                        </a>
                    )}
                </div>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm">{proj.description}</p>
            </div>
        ),
        EducationItem: ({ edu }) => (
            <div className="mb-4 flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg text-slate-900">{edu.degree}</h3>
                    <div className="italic text-slate-600">{edu.institution}</div>
                </div>
                <span className="text-sm font-semibold text-slate-500">{edu.year}</span>
            </div>
        ),
        SkillsList: () => (
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-slate-700 mb-4">
                {skills.map((skill, i) => (
                    <span key={i} className="font-medium">★ {skill}</span>
                ))}
            </div>
        )
    };

    // Components for "Professional" Template (Reusing logical structure, just different styles if needed, 
    // but here they are identical to SimpleTemplate in the previous code, just duplicated. 
    // If they were different, we'd define ProfessionalComponents object.)
    const ProfessionalComponents = { ...SimpleComponents }; // They were identical in previous code

    const PagedRenderer = ({ blocks, templateName }) => {
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

    // Modern Template (Sidebar) - Hard to paginate automatically. 
    // We will render it as a single growing page for now, or just warn.
    // Or we keep old logic for ModernTemplate.
    const ModernTemplate = () => (
        <div className="resume-page min-h-[297mm] w-[210mm] bg-white flex shadow-lg">
            {/* Sidebar */}
            <div className="w-1/3 bg-slate-800 text-white p-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold leading-tight mb-4">{personalInfo.fullName || 'Your Name'}</h1>
                    <div className="text-sm space-y-2 opacity-90">
                        <div>{personalInfo.email}</div>
                        <div>{personalInfo.phone}</div>
                        <div>{personalInfo.address}</div>
                        {personalInfo.linkedIn && <a href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" className="block hover:text-blue-300">LinkedIn</a>}
                        {personalInfo.github && <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="block hover:text-blue-300">GitHub</a>}
                        {personalInfo.twitter && <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="block hover:text-blue-300">Twitter</a>}
                        {personalInfo.website && <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="block hover:text-blue-300">Portfolio</a>}
                    </div>
                </div>

                {skills.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-lg font-bold border-b border-slate-600 mb-4 pb-1">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, i) => (
                                <span key={i} className="bg-slate-700 px-2 py-1 rounded text-xs">{skill}</span>
                            ))}
                        </div>
                    </div>
                )}

                {education.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold border-b border-slate-600 mb-4 pb-1">Education</h2>
                        {education.map((edu, i) => (
                            <div key={i} className="mb-4">
                                <div className="font-bold text-sm">{edu.institution}</div>
                                <div className="text-xs opacity-80">{edu.degree}</div>
                                <div className="text-xs opacity-60">{edu.year}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="w-2/3 p-8">
                {personalInfo.summary && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 mb-4">Profile</h2>
                        <p className="text-gray-600">{personalInfo.summary}</p>
                    </div>
                )}

                {experience.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 mb-4">Experience</h2>
                        {experience.map((exp, i) => (
                            <div key={i} className="mb-6">
                                <h3 className="font-bold text-lg text-slate-700">{exp.role}</h3>
                                <div className="flex justify-between text-sm text-slate-500 mb-2">
                                    <span>{exp.company}</span>
                                    <span>{exp.duration}</span>
                                </div>
                                <p className="text-gray-600 text-sm">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {data.projects && data.projects.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 mb-4">Projects</h2>
                        {data.projects.map((proj, i) => (
                            <div key={i} className="mb-6">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-bold text-lg text-slate-700">
                                        {proj.link ? (
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 underline-offset-2 hover:underline">{proj.title}</a>
                                        ) : (
                                            proj.title
                                        )}
                                    </h3>
                                    {proj.sourceLink && (
                                        <a href={proj.sourceLink} target="_blank" rel="noopener noreferrer" className="text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-300 hover:bg-slate-200 text-slate-600">
                                            Source
                                        </a>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    // Return selected template
    switch (templateId) {
        case 'professional':
            return <PagedRenderer blocks={getLinearBlocks(ProfessionalComponents)} templateName="professional" />;
        case 'modern': return <ModernTemplate />;
        case 'latex': return <LatexTemplate data={data} />;
        case 'simple':
        default:
            return <PagedRenderer blocks={getLinearBlocks(SimpleComponents)} templateName="simple" />;
    }
};

export default ResumePreview;
