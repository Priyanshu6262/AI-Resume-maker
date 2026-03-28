import React from 'react';

const SalesTemplate2 = ({ data }) => {
    const { personalInfo, education, experience, skills, projects } = data;
    
    return (
        <div className="resume-page min-h-[297mm] w-[210mm] bg-[#fdfbf7] text-slate-800 p-10 font-sans shadow-lg">
            <header className="mb-10 text-center">
                <div className="inline-block border-4 border-slate-900 p-6 bg-white shadow-[8px_8px_0px_#eab308]">
                    <h1 className="text-5xl font-black text-slate-900 uppercase tracking-widest">{personalInfo.fullName || 'YOUR NAME'}</h1>
                    <p className="text-amber-500 font-bold tracking-[0.3em] uppercase mt-2">Sales Professional</p>
                </div>
            </header>

            <div className="bg-slate-900 text-white p-4 flex flex-wrap justify-center gap-6 text-sm font-semibold tracking-wide mb-10 shadow-md">
                {personalInfo.email && <span className="flex items-center gap-2 text-amber-400">✉ <span className="text-white">{personalInfo.email}</span></span>}
                {personalInfo.phone && <span className="flex items-center gap-2 text-amber-400">📞 <span className="text-white">{personalInfo.phone}</span></span>}
                {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors">🔗 <span className="text-white">LinkedIn</span></a>}
                {personalInfo.address && <span className="flex items-center gap-2 text-amber-400">📍 <span className="text-white">{personalInfo.address}</span></span>}
            </div>

            {personalInfo.summary && (
                <section className="mb-10 px-8 text-center">
                    <div className="text-slate-700 font-medium text-lg leading-relaxed content-html inline-block max-w-3xl" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
                </section>
            )}

            <div className="grid grid-cols-2 gap-12 px-4">
                <div className="col-span-1 space-y-10">
                    {experience && experience.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wider mb-6 pb-2 border-b-4 border-amber-500 inline-block">Experience</h2>
                            <div className="space-y-8">
                                {experience.map((exp, i) => (
                                    <div key={i}>
                                        <h3 className="font-extrabold text-xl text-slate-900 uppercase">{exp.role}</h3>
                                        <div className="text-amber-600 font-bold mb-2 text-sm">{exp.company} // {exp.duration}</div>
                                        <div className="text-slate-600 text-sm leading-relaxed content-html" dangerouslySetInnerHTML={{ __html: exp.description }} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-1 space-y-10">
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wider mb-6 pb-2 border-b-4 border-amber-500 inline-block">Expertise</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, i) => (
                                    <span key={i} className="bg-slate-100 text-slate-800 border border-slate-300 font-bold px-4 py-2 text-sm uppercase shadow-sm">
                                        {typeof skill === 'object' ? skill.name : skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects && projects.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wider mb-6 pb-2 border-b-4 border-amber-500 inline-block">Highlights</h2>
                            <div className="space-y-6">
                                {projects.map((proj, i) => (
                                    <div key={i}>
                                        <h3 className="font-extrabold text-lg text-slate-900 mb-1">{proj.title}</h3>
                                        <div className="text-slate-600 text-sm leading-relaxed content-html" dangerouslySetInnerHTML={{ __html: proj.description }} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wider mb-6 pb-2 border-b-4 border-amber-500 inline-block">Education</h2>
                            <div className="space-y-5">
                                {education.map((edu, i) => (
                                    <div key={i} className="bg-slate-50 p-4 border-l-4 border-amber-500">
                                        <h3 className="font-extrabold text-slate-900 text-lg leading-tight mb-1">{edu.degree}</h3>
                                        <div className="text-sm font-bold text-slate-600">{edu.institution}</div>
                                        <div className="text-xs font-bold text-amber-600 mt-2 tracking-widest uppercase">{edu.year}</div>
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

export default SalesTemplate2;
