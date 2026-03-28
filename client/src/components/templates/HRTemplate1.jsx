import React from 'react';

const HRTemplate1 = ({ data }) => {
    const { personalInfo, education, experience, skills, projects } = data;
    
    return (
        <div className="resume-page min-h-[297mm] w-[210mm] bg-[#fafaf9] text-stone-800 p-12 font-serif shadow-lg">
            <header className="mb-10 text-center">
                <h1 className="text-4xl text-stone-900 tracking-wide mb-3">{personalInfo.fullName || 'Human Resources'}</h1>
                <div className="h-0.5 w-16 bg-teal-600 mx-auto mb-4"></div>
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-stone-500 font-sans tracking-wide">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.linkedIn && <a href={personalInfo.linkedIn} className="hover:text-teal-700 transition-colors">• LinkedIn</a>}
                    {personalInfo.address && <span>• {personalInfo.address}</span>}
                </div>
            </header>

            {personalInfo.summary && (
                <section className="mb-10 text-center px-8">
                    <p className="text-stone-600 italic leading-loose content-html max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
                </section>
            )}

            {experience && experience.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-xl text-stone-900 uppercase tracking-widest mb-6 text-center">Professional Experience</h2>
                    <div className="space-y-8 font-sans">
                        {experience.map((exp, i) => (
                            <div key={i} className="max-w-3xl mx-auto">
                                <div className="flex flex-col md:flex-row justify-between items-baseline mb-2">
                                    <h3 className="font-bold text-lg text-stone-900">{exp.role}</h3>
                                    <span className="text-sm font-medium text-teal-600 mt-1 md:mt-0">{exp.duration}</span>
                                </div>
                                <div className="text-stone-500 font-medium tracking-wide mb-3">{exp.company}</div>
                                <div className="text-stone-600 text-sm leading-relaxed content-html prose prose-stone max-w-none" dangerouslySetInnerHTML={{ __html: exp.description }} />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div className="grid grid-cols-2 gap-12 max-w-3xl mx-auto font-sans">
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-lg font-serif text-stone-900 uppercase tracking-widest mb-4 border-b border-stone-200 pb-2">Core Competencies</h2>
                        <ul className="space-y-2">
                            {skills.map((skill, i) => (
                                <li key={i} className="text-stone-700 text-sm flex items-center gap-3">
                                    <div className="w-1 h-1 bg-teal-600 rounded-full"></div>
                                    {typeof skill === 'object' ? skill.name : skill}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {education && education.length > 0 && (
                    <section>
                        <h2 className="text-lg font-serif text-stone-900 uppercase tracking-widest mb-4 border-b border-stone-200 pb-2">Education</h2>
                        <div className="space-y-5">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-bold text-stone-900 text-[15px] mb-1">{edu.degree}</h3>
                                    <div className="text-sm text-stone-600 mb-1">{edu.institution}</div>
                                    <div className="text-xs text-teal-600 font-medium tracking-wider uppercase">{edu.year}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
            
            {projects && projects.length > 0 && (
                 <section className="mt-10 max-w-3xl mx-auto font-sans">
                     <h2 className="text-lg font-serif text-stone-900 uppercase tracking-widest mb-4 border-b border-stone-200 pb-2 text-center mt-12">HR Initiatives</h2>
                     <div className="space-y-6">
                         {projects.map((proj, i) => (
                             <div key={i} className="bg-white border border-stone-100 p-5 rounded shadow-sm">
                                 <h3 className="font-bold text-stone-900 mb-2">{proj.title}</h3>
                                 <div className="text-stone-600 text-sm leading-relaxed content-html" dangerouslySetInnerHTML={{ __html: proj.description }} />
                             </div>
                         ))}
                     </div>
                 </section>
            )}
        </div>
    );
};

export default HRTemplate1;
