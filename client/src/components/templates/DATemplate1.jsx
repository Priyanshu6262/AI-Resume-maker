import React from 'react';

const DATemplate1 = ({ data }) => {
    const { personalInfo, education, experience, skills, projects } = data;
    
    return (
        <div className="resume-page min-h-[297mm] w-[210mm] bg-[#f8fafc] text-slate-800 p-8 shadow-lg font-sans">
            <header className="mb-6 flex justify-between items-end border-b-2 border-slate-900 pb-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">{personalInfo.fullName || 'Data Analyst'}</h1>
                    <p className="text-lg font-medium text-slate-600 tracking-wide uppercase">Data & Analytics Professional</p>
                </div>
                <div className="text-right text-xs text-slate-600 space-y-1 font-medium">
                    {personalInfo.email && <div>{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.address && <div>{personalInfo.address}</div>}
                    {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="block hover:text-blue-600">LinkedIn</a>}
                    {personalInfo.github && <a href={personalInfo.github} className="block hover:text-blue-600">GitHub</a>}
                </div>
            </header>

            <div className="grid grid-cols-1 gap-6">
                {personalInfo.summary && (
                    <section className="bg-white p-4 border border-slate-200 shadow-sm rounded-sm">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Executive Summary</h2>
                        <div className="text-sm text-slate-700 leading-relaxed content-html" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
                    </section>
                )}

                <div className="grid grid-cols-3 gap-6">
                    {/* Main column */}
                    <div className="col-span-2 space-y-6">
                        {experience && experience.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4 bg-slate-100 p-2 border-l-4 border-slate-900">Career History</h2>
                                <div className="space-y-5">
                                    {experience.map((exp, i) => (
                                        <div key={i} className="border-l-2 border-slate-200 pl-4 py-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <h3 className="font-bold text-slate-900 text-lg">{exp.role}</h3>
                                                <span className="text-xs font-mono bg-slate-800 text-white px-2 py-1 rounded-sm">{exp.duration}</span>
                                            </div>
                                            <div className="text-sm text-blue-700 font-semibold mb-2">{exp.company}</div>
                                            <div className="text-sm text-slate-700 content-html" dangerouslySetInnerHTML={{ __html: exp.description }} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {projects && projects.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4 bg-slate-100 p-2 border-l-4 border-slate-900">Key Projects / Analyses</h2>
                                <div className="space-y-5">
                                    {projects.map((proj, i) => (
                                        <div key={i} className="bg-white p-4 border border-slate-200 shadow-sm rounded-sm">
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="font-bold text-slate-900">{proj.title}</h3>
                                                <div className="flex gap-2">
                                                    {proj.sourceLink && <a href={proj.sourceLink} className="text-xs text-slate-500 hover:text-slate-900">Source</a>}
                                                    {proj.link && <a href={proj.link} className="text-xs text-blue-600 hover:text-blue-800 font-semibold">View Dash</a>}
                                                </div>
                                            </div>
                                            <div className="text-sm text-slate-600 content-html" dangerouslySetInnerHTML={{ __html: proj.description }} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="col-span-1 space-y-6">
                        {skills && skills.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4 bg-slate-100 p-2 border-l-4 border-slate-900">Core Competencies</h2>
                                <ul className="space-y-2">
                                    {skills.map((skill, i) => (
                                        <li key={i} className="flex items-center text-sm font-medium text-slate-700">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                                            {typeof skill === 'object' ? skill.name : skill}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {education && education.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4 bg-slate-100 p-2 border-l-4 border-slate-900">Education</h2>
                                <div className="space-y-4">
                                    {education.map((edu, i) => (
                                        <div key={i} className="bg-white p-3 border border-slate-200 shadow-sm rounded-sm">
                                            <h3 className="font-bold text-slate-900 text-sm leading-tight mb-1">{edu.degree}</h3>
                                            <div className="text-xs text-slate-600 mb-1">{edu.institution}</div>
                                            <div className="text-xs font-mono text-slate-500">{edu.year}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DATemplate1;
