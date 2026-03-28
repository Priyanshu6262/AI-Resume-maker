import React from 'react';

const FSTemplate3 = ({ data }) => {
    const { personalInfo, education, experience, skills, projects } = data;
    
    return (
        <div className="resume-page min-h-[297mm] w-[210mm] bg-slate-50 text-slate-800 p-0 shadow-lg flex">
            {/* Sidebar Dark */}
            <div className="w-[35%] bg-slate-900 text-slate-300 p-8 flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full border-4 border-slate-700 mb-6 bg-slate-800 flex items-center justify-center text-4xl font-black text-white">
                    {personalInfo.fullName ? personalInfo.fullName.charAt(0) : 'FS'}
                </div>
                
                <h1 className="text-2xl font-bold text-white mb-2">{personalInfo.fullName || 'Your Name'}</h1>
                <p className="text-emerald-400 font-medium tracking-wide text-sm mb-8 uppercase">Software Engineer</p>

                <div className="w-full text-left space-y-4 mb-10 text-sm border-t border-slate-700 pt-6">
                    <h2 className="text-white font-bold tracking-widest uppercase mb-4 text-xs">Contact</h2>
                    {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.address && <div>{personalInfo.address}</div>}
                    {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="block hover:text-white truncate">{personalInfo.linkedIn}</a>}
                    {personalInfo.github && <a href={personalInfo.github} className="block hover:text-white truncate">{personalInfo.github}</a>}
                </div>

                {skills && skills.length > 0 && (
                    <div className="w-full text-left border-t border-slate-700 pt-6">
                        <h2 className="text-white font-bold tracking-widest uppercase mb-4 text-xs">Skills</h2>
                        <div className="flex flex-col gap-2">
                            {skills.map((skill, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></div>
                                    <span>{typeof skill === 'object' ? skill.name : skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="w-[65%] p-10 bg-white">
                {personalInfo.summary && (
                    <section className="mb-10">
                        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-4 border-b pb-2">Profile</h2>
                        <div className="text-slate-700 leading-relaxed content-html" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
                    </section>
                )}

                {experience && experience.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-6 border-b pb-2">Work Experience</h2>
                        <div className="space-y-6">
                            {experience.map((exp, i) => (
                                <div key={i}>
                                    <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                                    <div className="flex justify-between items-baseline mb-2 text-sm">
                                        <span className="font-semibold text-emerald-600">{exp.company}</span>
                                        <span className="text-slate-500 font-medium">{exp.duration}</span>
                                    </div>
                                    <div className="text-slate-600 text-sm content-html" dangerouslySetInnerHTML={{ __html: exp.description }} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {projects && projects.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-6 border-b pb-2">Projects</h2>
                        <div className="space-y-6">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold text-slate-900">{proj.title}</h3>
                                        {proj.sourceLink && <a href={proj.sourceLink} className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 px-2 py-1 rounded text-slate-600">Code</a>}
                                        {proj.link && <a href={proj.link} className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 px-2 py-1 rounded">Live</a>}
                                    </div>
                                    <div className="text-slate-600 text-sm content-html mt-2" dangerouslySetInnerHTML={{ __html: proj.description }} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {education && education.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-6 border-b pb-2">Education</h2>
                        <div className="space-y-4">
                            {education.map((edu, i) => (
                                <div key={i} className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                                        <div className="text-slate-500 text-sm">{edu.institution}</div>
                                    </div>
                                    <span className="text-sm text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">{edu.year}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default FSTemplate3;
