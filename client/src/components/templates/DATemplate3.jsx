import React from 'react';

const DATemplate3 = ({ data }) => {
    const { personalInfo, education, experience, skills, projects } = data;
    
    return (
        <div className="resume-page min-h-[297mm] w-[210mm] bg-[#1a1c23] text-gray-300 p-8 shadow-lg font-sans">
            <header className="flex justify-between items-center mb-8 border-b border-gray-700 pb-6">
                <div className="w-2/3">
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">{personalInfo.fullName || 'Data Analyst'}</h1>
                    <div className="text-teal-400 font-mono text-sm uppercase">&gt; DATA_ANALYST</div>
                </div>
                <div className="w-1/3 text-right text-xs font-mono text-gray-400 space-y-1">
                    {personalInfo.email && <div>{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.address && <div>{personalInfo.address}</div>}
                    {personalInfo.github && <a href={personalInfo.github} className="block text-teal-400 hover:text-teal-300">github.com</a>}
                </div>
            </header>

            {personalInfo.summary && (
                <div className="mb-8 bg-gray-800/50 p-4 border-l-4 border-teal-500 rounded">
                    <div className="text-sm leading-relaxed content-html text-gray-300" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
                </div>
            )}

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8 space-y-8">
                    {experience && experience.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                                <span className="text-teal-500 mr-2">■</span> EXPERIENCE
                            </h2>
                            <div className="space-y-6">
                                {experience.map((exp, i) => (
                                    <div key={i} className="relative">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-gray-100 text-lg">{exp.role}</h3>
                                            <span className="text-xs font-mono text-gray-400">{exp.duration}</span>
                                        </div>
                                        <div className="text-teal-400 text-sm mb-2 font-mono">@ {exp.company}</div>
                                        <div className="text-sm text-gray-400 content-html" dangerouslySetInnerHTML={{ __html: exp.description }} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects && projects.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                                <span className="text-teal-500 mr-2">■</span> PROJECTS
                            </h2>
                            <div className="space-y-6">
                                {projects.map((proj, i) => (
                                    <div key={i} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-bold text-gray-100">{proj.title}</h3>
                                        </div>
                                        <div className="text-sm text-gray-400 content-html mb-3" dangerouslySetInnerHTML={{ __html: proj.description }} />
                                        <div className="flex gap-3 text-xs font-mono">
                                            {proj.link && <a href={proj.link} className="text-teal-400 hover:text-teal-300">→ Dashboard</a>}
                                            {proj.sourceLink && <a href={proj.sourceLink} className="text-gray-500 hover:text-gray-300">→ Code</a>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-4 space-y-8">
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                                <span className="text-teal-500 mr-2">■</span> SKILLS
                            </h2>
                            <div className="flex flex-col gap-2">
                                {skills.map((skill, i) => (
                                    <div key={i} className="bg-gray-800 border border-gray-700 font-mono text-xs text-teal-300 px-3 py-2 rounded">
                                        &gt; {typeof skill === 'object' ? skill.name : skill}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                                <span className="text-teal-500 mr-2">■</span> EDUCATION
                            </h2>
                            <div className="space-y-4">
                                {education.map((edu, i) => (
                                    <div key={i} className="border-l-2 border-gray-600 pl-3">
                                        <h3 className="font-bold text-gray-100 text-sm mb-1">{edu.degree}</h3>
                                        <div className="text-teal-400 text-xs mb-1 font-mono">{edu.institution}</div>
                                        <div className="text-xs text-gray-500 font-mono">{edu.year}</div>
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

export default DATemplate3;
