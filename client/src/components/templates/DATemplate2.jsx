import React from 'react';

const DATemplate2 = ({ data }) => {
    const { personalInfo, education, experience, skills, projects } = data;
    
    return (
        <div className="resume-page min-h-[297mm] w-[210mm] bg-white text-gray-800 p-10 shadow-lg font-sans border-t-[12px] border-emerald-600">
            <header className="mb-8 text-center">
                <h1 className="text-5xl font-light text-gray-900 tracking-wider mb-2">{personalInfo.fullName || 'Your Name'}</h1>
                <p className="text-emerald-700 font-semibold uppercase tracking-[0.2em] text-sm">Data Scientist / Analyst</p>
                <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                    {personalInfo.email && <span className="flex items-center gap-1">✉ {personalInfo.email}</span>}
                    {personalInfo.phone && <span className="flex items-center gap-1">✦ {personalInfo.phone}</span>}
                    {personalInfo.address && <span className="flex items-center gap-1">✦ {personalInfo.address}</span>}
                    {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="flex items-center gap-1 hover:text-emerald-600">✦ LinkedIn</a>}
                    {personalInfo.github && <a href={personalInfo.github} className="flex items-center gap-1 hover:text-emerald-600">✦ GitHub</a>}
                </div>
            </header>

            {personalInfo.summary && (
                <div className="mb-8 text-center px-12">
                    <p className="text-gray-600 italic text-sm leading-relaxed content-html" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
                </div>
            )}

            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                <div className="col-span-2 md:col-span-1 space-y-8">
                    {experience && experience.length > 0 && (
                        <section>
                            <h2 className="text-xl font-medium text-gray-900 border-b border-gray-300 pb-2 mb-4 uppercase tracking-wider relative">
                                <span className="absolute bottom-[-1px] left-0 w-12 h-0.5 bg-emerald-600"></span>
                                Work Experience
                            </h2>
                            <div className="space-y-6">
                                {experience.map((exp, i) => (
                                    <div key={i}>
                                        <h3 className="font-bold text-gray-900">{exp.role}</h3>
                                        <div className="text-emerald-700 text-sm font-medium mb-1">{exp.company} <span className="text-gray-400 font-normal">| {exp.duration}</span></div>
                                        <div className="text-gray-600 text-sm content-html" dangerouslySetInnerHTML={{ __html: exp.description }} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-2 md:col-span-1 space-y-8">
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-xl font-medium text-gray-900 border-b border-gray-300 pb-2 mb-4 uppercase tracking-wider relative">
                                <span className="absolute bottom-[-1px] left-0 w-12 h-0.5 bg-emerald-600"></span>
                                Technical Skills
                            </h2>
                            <div className="grid grid-cols-2 gap-2">
                                {skills.map((skill, i) => (
                                    <div key={i} className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded shadow-sm border border-gray-100 flex items-center">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                                        {typeof skill === 'object' ? skill.name : skill}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects && projects.length > 0 && (
                        <section>
                            <h2 className="text-xl font-medium text-gray-900 border-b border-gray-300 pb-2 mb-4 uppercase tracking-wider relative">
                                <span className="absolute bottom-[-1px] left-0 w-12 h-0.5 bg-emerald-600"></span>
                                Projects
                            </h2>
                            <div className="space-y-5">
                                {projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-gray-900">{proj.title}</h3>
                                            {(proj.link || proj.sourceLink) && (
                                                <span className="text-emerald-600 text-xs">
                                                    [{proj.link ? <a href={proj.link} className="hover:underline">Link</a> : null}
                                                    {proj.link && proj.sourceLink ? ' | ' : null}
                                                    {proj.sourceLink ? <a href={proj.sourceLink} className="hover:underline">Code</a> : null}]
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-gray-600 text-sm content-html" dangerouslySetInnerHTML={{ __html: proj.description }} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xl font-medium text-gray-900 border-b border-gray-300 pb-2 mb-4 uppercase tracking-wider relative">
                                <span className="absolute bottom-[-1px] left-0 w-12 h-0.5 bg-emerald-600"></span>
                                Education
                            </h2>
                            <div className="space-y-4">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                        <div className="text-emerald-700 text-sm font-medium">{edu.institution} <span className="text-gray-400 font-normal">| {edu.year}</span></div>
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

export default DATemplate2;
