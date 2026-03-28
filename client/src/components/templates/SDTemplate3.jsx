import React from 'react';

const SDTemplate3 = ({ data }) => {
    const { personalInfo, education, experience, skills, projects } = data;
    
    return (
        <div className="resume-page min-h-[297mm] w-[210mm] bg-black text-gray-300 p-8 shadow-2xl font-mono text-sm border-4 border-gray-800">
            <header className="mb-6 border-b-2 border-gray-800 pb-6">
                <div className="text-green-500 mb-2">user@local:~$ ./show-profile.sh</div>
                <h1 className="text-3xl font-bold text-white mb-2">{personalInfo.fullName || 'SOFTWARE ENGINEER'}</h1>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mt-4">
                    {personalInfo.email && <div><span className="text-yellow-500">email:</span> {personalInfo.email}</div>}
                    {personalInfo.phone && <div><span className="text-yellow-500">tel:</span> {personalInfo.phone}</div>}
                    {personalInfo.github && <div><span className="text-yellow-500">github:</span> <a href={personalInfo.github} className="text-blue-400">{personalInfo.github}</a></div>}
                    {personalInfo.linkedIn && <div><span className="text-yellow-500">linkedin:</span> <a href={personalInfo.linkedIn} className="text-blue-400">{personalInfo.linkedIn}</a></div>}
                </div>
            </header>

            {personalInfo.summary && (
                <section className="mb-6">
                    <div className="text-green-500 mb-2">user@local:~$ cat summary.txt</div>
                    <div className="text-gray-400 leading-relaxed content-html bg-gray-900 p-3 rounded border border-gray-800" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
                </section>
            )}

            <div className="grid grid-cols-2 gap-8">
                <div className="col-span-1 space-y-6">
                    {skills && skills.length > 0 && (
                        <section>
                            <div className="text-green-500 mb-2">user@local:~$ lshw -C skills</div>
                            <div className="bg-gray-900 border border-gray-800 p-3 rounded">
                                <ul className="flex flex-wrap gap-2">
                                    {skills.map((skill, i) => (
                                        <li key={i} className="text-xs text-green-400 bg-gray-800 px-2 py-1 rounded border border-gray-700">
                                            {typeof skill === 'object' ? skill.name : skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    )}

                    {projects && projects.length > 0 && (
                        <section>
                            <div className="text-green-500 mb-2">user@local:~$ ls -la /projects</div>
                            <div className="space-y-4 bg-gray-900 border border-gray-800 p-3 rounded">
                                {projects.map((proj, i) => (
                                    <div key={i} className="border-b border-gray-800 last:border-0 pb-3 last:pb-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-bold text-white text-xs">{proj.title}</h3>
                                        </div>
                                        <div className="text-xs text-gray-500 mb-2 content-html" dangerouslySetInnerHTML={{ __html: proj.description }} />
                                        <div className="flex gap-2 text-[10px] uppercase">
                                            {proj.sourceLink && <a href={proj.sourceLink} className="text-purple-400 hover:underline">REPO</a>}
                                            {proj.link && <a href={proj.link} className="text-blue-400 hover:underline">LIVE</a>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-1 space-y-6">
                    {experience && experience.length > 0 && (
                        <section>
                            <div className="text-green-500 mb-2">user@local:~$ tail -f /var/log/experience.log</div>
                            <div className="space-y-4 bg-gray-900 border border-gray-800 p-3 rounded">
                                {experience.map((exp, i) => (
                                    <div key={i} className="relative pl-3 border-l-2 border-gray-700">
                                        <div className="text-xs text-gray-500 mb-1">[{exp.duration}]</div>
                                        <h3 className="font-bold text-white text-sm">{exp.role}</h3>
                                        <div className="text-yellow-500 text-xs mb-2">@ {exp.company}</div>
                                        <div className="text-xs text-gray-400 content-html" dangerouslySetInnerHTML={{ __html: exp.description }} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education && education.length > 0 && (
                        <section>
                            <div className="text-green-500 mb-2">user@local:~$ grep "education" history.txt</div>
                            <div className="space-y-3 bg-gray-900 border border-gray-800 p-3 rounded">
                                {education.map((edu, i) => (
                                    <div key={i}>
                                        <h3 className="font-bold text-white text-xs">{edu.degree}</h3>
                                        <div className="text-xs text-gray-400">{edu.institution}</div>
                                        <div className="text-[10px] text-gray-600 mt-1">{edu.year}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
            
            <div className="mt-8 text-center text-xs text-gray-600">
                <span className="animate-pulse">_</span> END OF OUTPUT
            </div>
        </div>
    );
};

export default SDTemplate3;
