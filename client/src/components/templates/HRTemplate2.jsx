import React from 'react';

const HRTemplate2 = ({ data }) => {
    const { personalInfo, education, experience, skills, projects } = data;
    
    return (
        <div className="resume-page min-h-[297mm] w-[210mm] bg-white text-slate-800 font-sans shadow-lg flex">
            {/* Soft Blue Sidebar */}
            <div className="w-[38%] bg-[#e0f2fe] p-10 flex flex-col items-center">
                <div className="w-40 h-40 rounded-full bg-white border-4 border-[#bae6fd] shadow-md flex items-center justify-center text-5xl font-light text-slate-400 mb-6">
                    {personalInfo.fullName ? personalInfo.fullName.charAt(0) : 'HR'}
                </div>
                
                <h2 className="text-lg font-bold text-slate-800 tracking-wider uppercase mb-8 border-b-2 border-slate-300 pb-2 w-full text-center">Contact Info</h2>
                
                <div className="w-full space-y-4 text-sm font-medium text-slate-700 mb-12">
                    {personalInfo.phone && (
                        <div className="flex flex-col items-center text-center">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Phone</span>
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo.email && (
                        <div className="flex flex-col items-center text-center">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Email</span>
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.address && (
                        <div className="flex flex-col items-center text-center">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Location</span>
                            <span>{personalInfo.address}</span>
                        </div>
                    )}
                    {personalInfo.linkedIn && (
                        <div className="flex flex-col items-center text-center">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">LinkedIn</span>
                            <a href={personalInfo.linkedIn} className="text-sky-700 hover:underline">Profile Link</a>
                        </div>
                    )}
                </div>

                {skills && skills.length > 0 && (
                    <div className="w-full">
                        <h2 className="text-lg font-bold text-slate-800 tracking-wider uppercase mb-6 border-b-2 border-slate-300 pb-2 text-center">Expertise</h2>
                        <div className="flex flex-col gap-3">
                            {skills.map((skill, i) => (
                                <div key={i} className="bg-white/60 text-slate-800 text-sm font-semibold py-2 px-4 rounded-full text-center shadow-sm">
                                    {typeof skill === 'object' ? skill.name : skill}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="w-[62%] p-10 bg-white">
                <header className="mb-10">
                    <h1 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tight">{personalInfo.fullName || 'Human Resources'}</h1>
                    <p className="text-sky-600 font-bold uppercase tracking-widest text-sm">HR Business Partner</p>
                </header>

                {personalInfo.summary && (
                    <section className="mb-10">
                        <div className="text-slate-600 leading-relaxed content-html text-[15px] bg-slate-50 p-5 rounded-tr-3xl rounded-bl-3xl border border-slate-100 shadow-sm" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
                    </section>
                )}

                {experience && experience.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center">
                            <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded mr-3 text-sm">01</span>
                            Experience
                        </h2>
                        <div className="space-y-8 pl-4 border-l-2 border-sky-100">
                            {experience.map((exp, i) => (
                                <div key={i} className="relative">
                                    <div className="absolute -left-[21px] top-1.5 w-3 h-3 bg-white border-2 border-sky-400 rounded-full"></div>
                                    <h3 className="font-bold text-slate-900 text-lg mb-1">{exp.role}</h3>
                                    <div className="text-sky-700 font-semibold text-[15px] mb-2">{exp.company} <span className="text-slate-400 text-sm font-normal ml-2">[{exp.duration}]</span></div>
                                    <div className="text-sm text-slate-600 leading-relaxed content-html" dangerouslySetInnerHTML={{ __html: exp.description }} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {projects && projects.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center">
                            <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded mr-3 text-sm">02</span>
                            Programs
                        </h2>
                        <div className="space-y-6">
                            {projects.map((proj, i) => (
                                <div key={i}>
                                    <h3 className="font-bold text-slate-900 text-lg mb-2">{proj.title}</h3>
                                    <div className="text-sm text-slate-600 leading-relaxed content-html bg-slate-50 p-4 rounded border-l-4 border-sky-300" dangerouslySetInnerHTML={{ __html: proj.description }} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {education && education.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center">
                            <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded mr-3 text-sm">03</span>
                            Education
                        </h2>
                        <div className="space-y-5">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-bold text-slate-900 text-[15px]">{edu.degree}</h3>
                                    <div className="text-slate-600 text-sm">{edu.institution}</div>
                                    <div className="text-sky-600 text-xs font-bold mt-1 tracking-wider">{edu.year}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default HRTemplate2;
