import React from 'react';

const SalesTemplate3 = ({ data }) => {
    const { personalInfo, education, experience, skills, projects } = data;
    
    return (
        <div className="resume-page min-h-[297mm] w-[210mm] bg-[#1e293b] text-slate-300 p-0 font-sans shadow-lg flex flex-col">
            <header className="bg-gradient-to-r from-rose-600 to-orange-500 p-10 text-white">
                <h1 className="text-5xl font-black tracking-tight mb-2 uppercase">{personalInfo.fullName || 'Sales Manager'}</h1>
                <p className="text-rose-100 font-bold text-lg tracking-widest uppercase mb-6">Director of Sales</p>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                    {personalInfo.email && <span className="flex items-center gap-2">✉ {personalInfo.email}</span>}
                    {personalInfo.phone && <span className="flex items-center gap-2">📱 {personalInfo.phone}</span>}
                    {personalInfo.address && <span className="flex items-center gap-2">📍 {personalInfo.address}</span>}
                    {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="flex items-center gap-2 hover:text-white underline underline-offset-4">🔗 LinkedIn</a>}
                </div>
            </header>

            <div className="flex-grow p-10 grid grid-cols-12 gap-10">
                <div className="col-span-8 space-y-10">
                    {personalInfo.summary && (
                        <section>
                            <h2 className="text-xl font-black text-white uppercase tracking-wider mb-4 border-b border-slate-700 pb-2 flex items-center gap-2">
                                <span className="text-rose-500">/01</span> Executive Summary
                            </h2>
                            <div className="text-[15px] leading-relaxed content-html text-slate-400" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
                        </section>
                    )}

                    {experience && experience.length > 0 && (
                        <section>
                            <h2 className="text-xl font-black text-white uppercase tracking-wider mb-6 border-b border-slate-700 pb-2 flex items-center gap-2">
                                <span className="text-rose-500">/02</span> Experience
                            </h2>
                            <div className="space-y-8">
                                {experience.map((exp, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-xl text-white">{exp.role}</h3>
                                            <span className="text-sm font-bold text-rose-500 bg-rose-500/10 px-2 py-1 rounded">{exp.duration}</span>
                                        </div>
                                        <div className="text-slate-400 font-semibold mb-3">{exp.company}</div>
                                        <div className="text-sm text-slate-400 leading-relaxed content-html" dangerouslySetInnerHTML={{ __html: exp.description }} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects && projects.length > 0 && (
                        <section>
                            <h2 className="text-xl font-black text-white uppercase tracking-wider mb-6 border-b border-slate-700 pb-2 flex items-center gap-2">
                                <span className="text-rose-500">/03</span> Key Accounts & Projects
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                {projects.map((proj, i) => (
                                    <div key={i} className="bg-slate-800/50 p-5 border-l-4 border-rose-500 rounded-r">
                                        <h3 className="font-bold text-lg text-white mb-2">{proj.title}</h3>
                                        <div className="text-sm text-slate-400 content-html line-clamp-3" dangerouslySetInnerHTML={{ __html: proj.description }} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-4 space-y-10">
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-xl font-black text-white uppercase tracking-wider mb-4 border-b border-slate-700 pb-2 flex items-center gap-2">
                                <span className="text-rose-500">/04</span> Skills
                            </h2>
                            <ul className="space-y-3">
                                {skills.map((skill, i) => (
                                    <li key={i} className="flex justify-between items-center text-sm font-bold text-slate-300">
                                        <span>{typeof skill === 'object' ? skill.name : skill}</span>
                                        <div className="flex gap-1">
                                            {[1,2,3,4,5].map(dot => (
                                                <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot <= 4 ? 'bg-rose-500' : 'bg-slate-700'}`}></div>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xl font-black text-white uppercase tracking-wider mb-4 border-b border-slate-700 pb-2 flex items-center gap-2">
                                <span className="text-rose-500">/05</span> Education
                            </h2>
                            <div className="space-y-6">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <h3 className="font-bold text-white text-[15px] leading-tight mb-1">{edu.degree}</h3>
                                        <div className="text-sm text-slate-400 mb-1">{edu.institution}</div>
                                        <div className="text-xs font-bold text-rose-500 uppercase tracking-widest">{edu.year}</div>
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

export default SalesTemplate3;
