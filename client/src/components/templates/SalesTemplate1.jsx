import React from 'react';

const SalesTemplate1 = ({ data }) => {
    const { personalInfo, education, experience, skills, projects } = data;
    
    return (
        <div className="resume-page min-h-[297mm] w-[210mm] bg-white text-slate-800 p-8 font-sans shadow-lg border-t-[16px] border-[#d946ef]">
            <header className="mb-6 flex flex-col items-center">
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase mb-2">{personalInfo.fullName || 'Sales Executive'}</h1>
                <p className="text-[#d946ef] font-bold tracking-[0.2em] uppercase text-sm mb-4">Sales & Business Development</p>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600 border-y border-slate-200 py-3 w-full">
                    {personalInfo.email && <span className="hover:text-[#d946ef] transition-colors">{personalInfo.email}</span>}
                    {personalInfo.phone && <span className="hover:text-[#d946ef] transition-colors">{personalInfo.phone}</span>}
                    {personalInfo.address && <span className="hover:text-[#d946ef] transition-colors">{personalInfo.address}</span>}
                    {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="text-blue-600 hover:text-blue-800 transition-colors font-bold">LinkedIn</a>}
                </div>
            </header>

            {personalInfo.summary && (
                <section className="mb-8 px-6 text-center">
                    <p className="text-slate-600 italic text-[15px] leading-relaxed content-html" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
                </section>
            )}

            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-8 space-y-8">
                    {experience && experience.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-5 flex items-center gap-3">
                                <span className="w-8 h-8 flex items-center justify-center bg-[#fdf4ff] text-[#d946ef] rounded text-lg">■</span> 
                                Professional Experience
                            </h2>
                            <div className="space-y-6">
                                {experience.map((exp, i) => (
                                    <div key={i} className="relative">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-extrabold text-[#d946ef] text-xl">{exp.role}</h3>
                                            <span className="text-sm font-bold text-slate-400 uppercase">{exp.duration}</span>
                                        </div>
                                        <div className="font-bold text-slate-900 text-[15px] mb-2">{exp.company}</div>
                                        <div className="text-slate-700 text-sm leading-relaxed content-html pl-4 border-l-2 border-[#fdf4ff]" dangerouslySetInnerHTML={{ __html: exp.description }} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects && projects.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-5 flex items-center gap-3">
                                <span className="w-8 h-8 flex items-center justify-center bg-[#fdf4ff] text-[#d946ef] rounded text-lg">■</span> 
                                Key Achievements
                            </h2>
                            <div className="space-y-5">
                                {projects.map((proj, i) => (
                                    <div key={i} className="bg-[#fcfcfc] border border-slate-100 p-4 rounded shadow-sm">
                                        <h3 className="font-bold text-slate-900 text-lg mb-2">{proj.title}</h3>
                                        <div className="text-sm text-slate-600 leading-relaxed content-html" dangerouslySetInnerHTML={{ __html: proj.description }} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-4 space-y-8">
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4 border-b-2 border-slate-100 pb-2">Core Competencies</h2>
                            <ul className="space-y-2">
                                {skills.map((skill, i) => (
                                    <li key={i} className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <span className="text-[#d946ef] text-[10px]">▼</span>
                                        {typeof skill === 'object' ? skill.name : skill}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4 border-b-2 border-slate-100 pb-2">Education</h2>
                            <div className="space-y-4">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <h3 className="font-extrabold text-slate-900 text-[15px] leading-tight mb-1">{edu.degree}</h3>
                                        <div className="text-sm font-semibold text-[#d946ef] mb-1">{edu.institution}</div>
                                        <div className="text-xs text-slate-500 font-bold uppercase">{edu.year}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SalesTemplate1;
