import React from 'react';

const SDTemplate2 = ({ data }) => {
    const { personalInfo, education, experience, skills, projects } = data;
    
    return (
        <div className="resume-page min-h-[297mm] w-[210mm] bg-[#fdfdfd] text-slate-800 p-0 shadow-lg font-sans flex border-l-[8px] border-blue-600">
            {/* Sidebar */}
            <div className="w-1/3 bg-slate-100 p-8 h-full border-r border-slate-200">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900 uppercase leading-none mb-2 break-words">{personalInfo.fullName || 'Software Engineer'}</h1>
                    <p className="text-blue-600 font-bold text-sm tracking-wider uppercase mt-2">Engineer / Developer</p>
                </div>

                <div className="mb-8 space-y-3 text-sm text-slate-700 font-medium border-t border-slate-300 pt-6">
                    <h2 className="text-xs font-black uppercase text-slate-900 tracking-widest mb-3">Contact</h2>
                    {personalInfo.email && <div className="break-words">{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.address && <div className="text-slate-500">{personalInfo.address}</div>}
                    {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="block hover:text-blue-600 truncate underline underline-offset-2">LinkedIn</a>}
                    {personalInfo.github && <a href={personalInfo.github} className="block hover:text-blue-600 truncate underline underline-offset-2">GitHub</a>}
                </div>

                {skills && skills.length > 0 && (
                    <div className="mb-8 border-t border-slate-300 pt-6">
                        <h2 className="text-xs font-black uppercase text-slate-900 tracking-widest mb-4">Skills</h2>
                        <div className="flex flex-col gap-2">
                            {skills.map((skill, i) => (
                                <div key={i} className="flex items-center group">
                                    <div className="h-0.5 w-4 bg-blue-600 mr-3 group-hover:w-6 transition-all"></div>
                                    <span className="text-sm font-semibold text-slate-700">{typeof skill === 'object' ? skill.name : skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {education && education.length > 0 && (
                    <div className="border-t border-slate-300 pt-6">
                        <h2 className="text-xs font-black uppercase text-slate-900 tracking-widest mb-4">Education</h2>
                        <div className="space-y-5">
                            {education.map((edu, i) => (
                                <div key={i} className="relative">
                                    <div className="absolute -left-3 top-1.5 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                    <h3 className="font-bold text-slate-900 text-sm leading-tight mb-1">{edu.degree}</h3>
                                    <div className="text-xs font-semibold text-blue-600 mb-0.5">{edu.institution}</div>
                                    <div className="text-xs text-slate-500">{edu.year}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="w-2/3 p-8">
                {personalInfo.summary && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Profile</h2>
                        <div className="text-sm text-slate-600 leading-relaxed content-html" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
                    </section>
                )}

                {experience && experience.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-black text-slate-900 mb-5 tracking-tight border-b-2 border-slate-100 pb-2">Experience</h2>
                        <div className="space-y-6">
                            {experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-lg text-slate-900">{exp.role}</h3>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{exp.duration}</span>
                                    </div>
                                    <div className="text-blue-600 font-bold text-sm mb-2">{exp.company}</div>
                                    <div className="text-sm text-slate-600 content-html" dangerouslySetInnerHTML={{ __html: exp.description }} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {projects && projects.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-black text-slate-900 mb-5 tracking-tight border-b-2 border-slate-100 pb-2">Projects</h2>
                        <div className="space-y-6">
                            {projects.map((proj, i) => (
                                <div key={i} className="bg-white p-4 rounded shadow-sm border border-slate-200">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-bold text-slate-900">{proj.title}</h3>
                                        <div className="flex gap-2">
                                            {proj.sourceLink && <a href={proj.sourceLink} className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 border border-slate-300 text-slate-600 px-2 py-1 rounded">Code</a>}
                                            {proj.link && <a href={proj.link} className="text-[10px] font-bold uppercase tracking-widest bg-blue-50 border border-blue-200 text-blue-700 px-2 py-1 rounded">Link</a>}
                                        </div>
                                    </div>
                                    <div className="text-sm text-slate-600 content-html" dangerouslySetInnerHTML={{ __html: proj.description }} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default SDTemplate2;
