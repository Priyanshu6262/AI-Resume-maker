import React from 'react';

const FSTemplate1 = ({ data }) => {
    const { personalInfo, education, experience, skills, projects } = data;
    
    return (
        <div className="resume-page min-h-[297mm] w-[210mm] bg-[#0d1117] text-[#c9d1d9] font-mono p-8 shadow-lg">
            {/* Header */}
            <header className="border-b border-[#30363d] pb-6 mb-6">
                <h1 className="text-4xl font-bold text-[#58a6ff] mb-2">&lt;{personalInfo.fullName || 'Full Stack Developer'} /&gt;</h1>
                <div className="flex flex-wrap gap-4 text-sm text-[#8b949e]">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>| {personalInfo.phone}</span>}
                    {personalInfo.github && <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#58a6ff]">| GitHub</a>}
                    {personalInfo.linkedIn && <a href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-[#58a6ff]">| LinkedIn</a>}
                </div>
            </header>

            {/* Content */}
            <div className="grid grid-cols-3 gap-8">
                {/* Left Column - Tech Stack & Edu */}
                <div className="col-span-1 space-y-6 border-r border-[#30363d] pr-6">
                    {skills && skills.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold text-[#58a6ff] border-b border-[#30363d] pb-2 mb-3">Tech Stack</h2>
                            <ul className="space-y-1 text-sm list-inside">
                                {skills.map((skill, i) => (
                                    <li key={i} className="text-[#3fb950] bg-[#1f2428] px-2 py-1 rounded inline-block m-1">
                                        {typeof skill === 'object' ? skill.name : skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {education && education.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold text-[#58a6ff] border-b border-[#30363d] pb-2 mb-3">Education</h2>
                            {education.map((edu, i) => (
                                <div key={i} className="mb-3">
                                    <div className="font-semibold text-white">{edu.degree}</div>
                                    <div className="text-sm text-[#8b949e]">{edu.institution}</div>
                                    <div className="text-xs text-[#8b949e]">{edu.year}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column - Exp & Proj */}
                <div className="col-span-2 space-y-6">
                    {personalInfo.summary && (
                        <div>
                            <h2 className="text-xl font-semibold text-[#58a6ff] border-b border-[#30363d] pb-2 mb-3">/* Summary */</h2>
                            <div className="text-sm leading-relaxed content-html text-[#c9d1d9]" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
                        </div>
                    )}

                    {experience && experience.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold text-[#58a6ff] border-b border-[#30363d] pb-2 mb-3">const Experience = [</h2>
                            {experience.map((exp, i) => (
                                <div key={i} className="mb-5 pl-4 border-l-2 border-[#30363d]">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-[#d2a8ff]">{exp.role}</h3>
                                        <span className="text-xs text-[#8b949e]">{exp.duration}</span>
                                    </div>
                                    <div className="text-sm font-semibold text-white mb-2">@ {exp.company}</div>
                                    <div className="text-sm leading-relaxed content-html text-[#c9d1d9]" dangerouslySetInnerHTML={{ __html: exp.description }} />
                                </div>
                            ))}
                            <h2 className="text-xl font-semibold text-[#58a6ff] mb-3">];</h2>
                        </div>
                    )}

                    {projects && projects.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold text-[#58a6ff] border-b border-[#30363d] pb-2 mb-3">export const Projects = {`{`}</h2>
                            {projects.map((proj, i) => (
                                <div key={i} className="mb-5 pl-4 border-l-2 border-[#30363d]">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-bold text-[#ff7b72]">{proj.title}</h3>
                                        <div className="flex gap-2">
                                            {proj.sourceLink && <a href={proj.sourceLink} target="_blank" rel="noopener noreferrer" className="text-xs border border-[#30363d] px-2 py-0.5 rounded hover:bg-[#30363d]">&lt;Code/&gt;</a>}
                                            {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs border border-[#30363d] px-2 py-0.5 rounded hover:bg-[#30363d]">LiveDemo()</a>}
                                        </div>
                                    </div>
                                    <div className="text-sm leading-relaxed content-html text-[#c9d1d9]" dangerouslySetInnerHTML={{ __html: proj.description }} />
                                </div>
                            ))}
                            <h2 className="text-xl font-semibold text-[#58a6ff] mb-3">{`}`};</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FSTemplate1;
