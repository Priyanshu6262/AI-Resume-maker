import React from 'react';

const HRTemplate3 = ({ data }) => {
    const { personalInfo, education, experience, skills, projects } = data;
    
    return (
        <div className="resume-page min-h-[297mm] w-[210mm] bg-stone-50 text-stone-800 p-10 font-sans shadow-lg">
            <header className="mb-8 grid grid-cols-3 gap-6 items-end pb-8 border-b border-stone-300">
                <div className="col-span-2">
                    <p className="text-rose-700 font-bold uppercase tracking-widest text-xs mb-2">Human Resources Manager</p>
                    <h1 className="text-5xl font-black text-stone-900 tracking-tighter">{personalInfo.fullName || 'YOUR NAME'}</h1>
                </div>
                <div className="col-span-1 text-right text-xs font-medium text-stone-600 space-y-1.5 border-l border-stone-300 pl-6">
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.email && <div>{personalInfo.email}</div>}
                    {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="block hover:text-rose-700">LinkedIn Profile</a>}
                    {personalInfo.address && <div>{personalInfo.address}</div>}
                </div>
            </header>

            {personalInfo.summary && (
                <section className="mb-10">
                    <h2 className="text-sm font-black text-stone-900 uppercase tracking-widest mb-3">Profile</h2>
                    <div className="text-[15px] text-stone-700 leading-relaxed content-html font-serif" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
                </section>
            )}

            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-8 space-y-10">
                    {experience && experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black text-stone-900 uppercase tracking-widest mb-6 border-b-2 border-stone-200 pb-2">Experience</h2>
                            <div className="space-y-8">
                                {experience.map((exp, i) => (
                                    <div key={i} className="group">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-lg text-stone-900 group-hover:text-rose-700 transition-colors">{exp.role}</h3>
                                            <span className="text-xs font-bold text-stone-500 bg-stone-200/50 px-2 py-1 rounded">{exp.duration}</span>
                                        </div>
                                        <div className="text-sm font-bold text-stone-600 mb-3">{exp.company}</div>
                                        <div className="text-sm text-stone-600 leading-relaxed content-html font-serif prose prose-stone max-w-none" dangerouslySetInnerHTML={{ __html: exp.description }} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects && projects.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black text-stone-900 uppercase tracking-widest mb-6 border-b-2 border-stone-200 pb-2">Strategic Initiatives</h2>
                            <div className="space-y-6">
                                {projects.map((proj, i) => (
                                    <div key={i}>
                                        <h3 className="font-bold text-stone-900 mb-2">{proj.title}</h3>
                                        <div className="text-sm text-stone-600 leading-relaxed content-html font-serif" dangerouslySetInnerHTML={{ __html: proj.description }} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-4 space-y-10 border-l border-stone-200 pl-8">
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black text-stone-900 uppercase tracking-widest mb-6 border-b-2 border-stone-200 pb-2">Key Competencies</h2>
                            <div className="flex flex-col gap-y-3">
                                {skills.map((skill, i) => (
                                    <div key={i} className="flex justify-between items-center bg-white border border-stone-200 px-3 py-2 shadow-sm rounded-sm">
                                        <span className="text-xs font-bold text-stone-700">{typeof skill === 'object' ? skill.name : skill}</span>
                                        <span className="text-rose-600 text-xs">◆</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black text-stone-900 uppercase tracking-widest mb-6 border-b-2 border-stone-200 pb-2">Education</h2>
                            <div className="space-y-6">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="text-xs font-bold text-rose-700 mb-1">{edu.year}</div>
                                        <h3 className="font-bold text-stone-900 text-[14px] leading-tight mb-1">{edu.degree}</h3>
                                        <div className="text-sm text-stone-500 font-serif italic">{edu.institution}</div>
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

export default HRTemplate3;
