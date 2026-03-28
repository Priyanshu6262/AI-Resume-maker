import React from 'react';

const SDTemplate1 = ({ data }) => {
    const { personalInfo, education, experience, skills, projects } = data;
    
    return (
        <div className="resume-page min-h-[297mm] w-[210mm] bg-white text-slate-900 p-10 font-sans shadow-lg">
            <header className="mb-6 flex flex-col items-center border-b-[3px] border-slate-900 pb-6">
                <h1 className="text-4xl font-extrabold uppercase tracking-tight text-slate-900 mb-2">{personalInfo.fullName || 'Software Developer'}</h1>
                <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-600 justify-center">
                    {personalInfo.email && <span className="hover:text-slate-900">{personalInfo.email}</span>}
                    {personalInfo.phone && <span className="hover:text-slate-900">• {personalInfo.phone}</span>}
                    {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="hover:text-blue-600">• LinkedIn</a>}
                    {personalInfo.github && <a href={personalInfo.github} className="hover:text-slate-900">• GitHub</a>}
                    {personalInfo.website && <a href={personalInfo.website} className="hover:text-slate-900">• Portfolio</a>}
                </div>
            </header>

            {personalInfo.summary && (
                <section className="mb-6 bg-slate-50 p-4 rounded text-sm text-slate-700 leading-relaxed content-html border border-slate-200" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
            )}

            {skills && skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-3 border-b border-slate-300 pb-1 flex items-center justify-between">
                        <span>Technical Skills</span>
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, i) => (
                            <span key={i} className="bg-slate-800 text-white px-3 py-1 rounded text-xs font-semibold shadow-sm">
                                {typeof skill === 'object' ? skill.name : skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {experience && experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-300 pb-1">Experience</h2>
                    <div className="space-y-5">
                        {experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-end mb-1">
                                    <h3 className="font-bold text-slate-900 text-lg">{exp.role}</h3>
                                    <span className="text-sm font-semibold text-slate-500">{exp.duration}</span>
                                </div>
                                <div className="text-blue-700 font-bold text-sm mb-2">{exp.company}</div>
                                <div className="text-sm text-slate-700 leading-relaxed content-html pl-4 border-l-[3px] border-slate-200" dangerouslySetInnerHTML={{ __html: exp.description }} />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {projects && projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-300 pb-1">Projects</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {projects.map((proj, i) => (
                            <div key={i} className="border border-slate-200 p-4 rounded shadow-sm hover:shadow-md transition-shadow bg-white">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-slate-900">{proj.title}</h3>
                                </div>
                                <div className="text-sm text-slate-600 mb-3 content-html leading-relaxed max-h-24 overflow-hidden" dangerouslySetInnerHTML={{ __html: proj.description }} />
                                <div className="flex gap-2 text-xs font-bold">
                                    {proj.sourceLink && <a href={proj.sourceLink} className="text-slate-600 bg-slate-100 px-2 py-1 rounded hover:bg-slate-200">GitHub</a>}
                                    {proj.link && <a href={proj.link} className="text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100">Live Demo</a>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {education && education.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-3 border-b border-slate-300 pb-1">Education</h2>
                    <div className="space-y-3">
                        {education.map((edu, i) => (
                            <div key={i} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                                    <div className="text-sm text-slate-600 font-medium">{edu.institution}</div>
                                </div>
                                <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">{edu.year}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default SDTemplate1;
