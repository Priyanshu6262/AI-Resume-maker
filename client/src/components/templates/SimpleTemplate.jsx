import React from 'react';
import { getLinearBlocks, PagedRenderer } from './TemplateUtils';

const SimpleTemplate = ({ data }) => {
    const { personalInfo, education, experience, skills } = data;

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
        Summary: () => <div className="leading-relaxed text-slate-700 mb-4 content-html" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />,
        ExperienceItem: ({ exp }) => (
            <div className="mb-6 last:mb-2">
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-xl text-slate-900">{exp.role}</h3>
                    <span className="text-sm font-semibold text-slate-500 whitespace-nowrap ml-4">{exp.duration}</span>
                </div>
                <div className="text-lg italic text-slate-600 mb-2 border-b border-dotted border-slate-300 inline-block pb-0.5">{exp.company}</div>
                <div className="text-slate-700 leading-relaxed text-sm mt-2 content-html" dangerouslySetInnerHTML={{ __html: exp.description }} />
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
                <div className="text-slate-700 leading-relaxed text-sm content-html" dangerouslySetInnerHTML={{ __html: proj.description }} />
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
                    <span key={i} className="font-medium">★ {typeof skill === 'object' ? skill.name : skill}</span>
                ))}
            </div>
        )
    };

    return <PagedRenderer blocks={getLinearBlocks(SimpleComponents, data)} data={data} templateName="simple" />;
};

export default SimpleTemplate;
