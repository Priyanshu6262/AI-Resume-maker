import React from 'react';

const FSTemplate2 = ({ data }) => {
    const { personalInfo, education, experience, skills, projects } = data;
    
    return (
        <div className="resume-page min-h-[297mm] w-[210mm] bg-white text-slate-800 p-8 shadow-lg font-sans">
            <header className="mb-8 border-b-4 border-indigo-600 pb-4">
                <h1 className="text-5xl font-black text-slate-900 tracking-tight">{personalInfo.fullName || 'Full Stack Engineer'}</h1>
                <p className="text-indigo-600 font-bold uppercase tracking-widest mt-1">Full Stack Developer</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm font-medium text-slate-500">
                    {personalInfo.email && <span className="flex items-center gap-1">✉ {personalInfo.email}</span>}
                    {personalInfo.phone && <span className="flex items-center gap-1">📱 {personalInfo.phone}</span>}
                    {personalInfo.github && <a href={personalInfo.github} className="hover:text-indigo-600">GitHub</a>}
                    {personalInfo.website && <a href={personalInfo.website} className="hover:text-indigo-600">Portfolio</a>}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                <main className="col-span-8 space-y-8">
                    {personalInfo.summary && (
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span className="w-8 h-8 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">01</span> Profile
                            </h2>
                            <div className="text-slate-600 content-html" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
                        </section>
                    )}

                    {experience && experience.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">02</span> Experience
                            </h2>
                            <div className="space-y-6">
                                {experience.map((exp, i) => (
                                    <div key={i} className="relative pl-6">
                                        <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-indigo-600"></div>
                                        <div className="absolute left-[3px] top-4 bottom-[-16px] w-0.5 bg-indigo-100 last:hidden"></div>
                                        <h3 className="font-bold text-lg text-slate-900">{exp.role}</h3>
                                        <div className="flex justify-between items-center text-sm mb-2">
                                            <span className="font-semibold text-indigo-600">{exp.company}</span>
                                            <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{exp.duration}</span>
                                        </div>
                                        <div className="text-slate-600 text-sm content-html" dangerouslySetInnerHTML={{ __html: exp.description }} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects && projects.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">03</span> Key Projects
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                {projects.map((proj, i) => (
                                    <div key={i} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-slate-900">{proj.title}</h3>
                                            <div className="flex gap-2">
                                                {proj.sourceLink && <a href={proj.sourceLink} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded hover:bg-slate-200">Source</a>}
                                                {proj.link && <a href={proj.link} className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100">Live</a>}
                                            </div>
                                        </div>
                                        <div className="text-sm text-slate-600 content-html" dangerouslySetInnerHTML={{ __html: proj.description }} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <aside className="col-span-4 space-y-8">
                    {skills && skills.length > 0 && (
                        <div className="bg-slate-50 p-6 rounded-xl">
                            <h2 className="text-lg font-bold text-slate-900 mb-4">Core Technologies</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, i) => (
                                    <span key={i} className="bg-white border border-slate-200 text-slate-700 font-medium px-3 py-1 rounded-full text-sm shadow-sm">
                                        {typeof skill === 'object' ? skill.name : skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {education && education.length > 0 && (
                        <div className="bg-slate-50 p-6 rounded-xl">
                            <h2 className="text-lg font-bold text-slate-900 mb-4">Education</h2>
                            <div className="space-y-4">
                                {education.map((edu, i) => (
                                    <div key={i} className="border-l-2 border-indigo-200 pl-3">
                                        <div className="font-bold text-slate-900 text-sm leading-tight mb-1">{edu.degree}</div>
                                        <div className="text-sm text-slate-600 mb-1">{edu.institution}</div>
                                        <div className="text-xs font-medium text-indigo-600">{edu.year}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default FSTemplate2;
