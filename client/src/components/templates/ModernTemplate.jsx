import React from 'react';

const ModernTemplate = ({ data }) => {
    const { personalInfo, education, experience, skills } = data;
    return (
        <div className="resume-page min-h-[297mm] w-[210mm] bg-white flex shadow-lg">
            {/* Sidebar */}
            <div className="w-1/3 bg-slate-800 text-white p-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold leading-tight mb-4">{personalInfo.fullName || 'Your Name'}</h1>
                    <div className="text-sm space-y-2 opacity-90">
                        <div>{personalInfo.email}</div>
                        <div>{personalInfo.phone}</div>
                        <div>{personalInfo.address}</div>
                        {personalInfo.linkedIn && <a href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" className="block hover:text-blue-300">LinkedIn</a>}
                        {personalInfo.github && <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="block hover:text-blue-300">GitHub</a>}
                        {personalInfo.twitter && <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="block hover:text-blue-300">Twitter</a>}
                        {personalInfo.website && <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="block hover:text-blue-300">Portfolio</a>}
                    </div>
                </div>

                {skills.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-lg font-bold border-b border-slate-600 mb-4 pb-1">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, i) => (
                                <span key={i} className="bg-slate-700 px-2 py-1 rounded text-xs">{skill}</span>
                            ))}
                        </div>
                    </div>
                )}

                {education.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold border-b border-slate-600 mb-4 pb-1">Education</h2>
                        {education.map((edu, i) => (
                            <div key={i} className="mb-4">
                                <div className="font-bold text-sm">{edu.institution}</div>
                                <div className="text-xs opacity-80">{edu.degree}</div>
                                <div className="text-xs opacity-60">{edu.year}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="w-2/3 p-8">
                {personalInfo.summary && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 mb-4">Profile</h2>
                        <p className="text-gray-600">{personalInfo.summary}</p>
                    </div>
                )}

                {experience.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 mb-4">Experience</h2>
                        {experience.map((exp, i) => (
                            <div key={i} className="mb-6">
                                <h3 className="font-bold text-lg text-slate-700">{exp.role}</h3>
                                <div className="flex justify-between text-sm text-slate-500 mb-2">
                                    <span>{exp.company}</span>
                                    <span>{exp.duration}</span>
                                </div>
                                <p className="text-gray-600 text-sm">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {data.projects && data.projects.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 mb-4">Projects</h2>
                        {data.projects.map((proj, i) => (
                            <div key={i} className="mb-6">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-bold text-lg text-slate-700">
                                        {proj.link ? (
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 underline-offset-2 hover:underline">{proj.title}</a>
                                        ) : (
                                            proj.title
                                        )}
                                    </h3>
                                    {proj.sourceLink && (
                                        <a href={proj.sourceLink} target="_blank" rel="noopener noreferrer" className="text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-300 hover:bg-slate-200 text-slate-600">
                                            Source
                                        </a>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModernTemplate;
