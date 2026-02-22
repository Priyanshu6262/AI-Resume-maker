import React from 'react';

const LatexTemplate = ({ data }) => {
    const { personalInfo, education, experience, skills, projects } = data;

    // Helper for rendering bullet points
    const BulletPoint = ({ children }) => (
        <li className="text-sm leading-relaxed relative pl-3 before:content-['•'] before:absolute before:left-0 before:text-black">
            {children}
        </li>
    );

    // Section Header Component
    const SectionHeader = ({ title }) => (
        <div className="mb-2 mt-4">
            <h2 className="font-serif text-lg font-bold uppercase tracking-wide text-black border-b border-black pb-1 mb-2">
                {title}
            </h2>
        </div>
    );

    return (
        <div className="h-full bg-white text-black font-serif p-8 overflow-hidden">
            {/* Header */}
            <header className="mb-6">
                <div className="flex justify-between items-start">
                    <div className="w-[75%]">
                        <h1 className="text-3xl font-normal text-black mb-2">{personalInfo.fullName || 'Your Name'}</h1>

                        <div className="text-sm space-y-1">
                            {/* Tagline or Title could go here if added to schema */}
                            {/* <div className="italic">Your Tagline</div> */}

                            <div className="flex flex-wrap items-center gap-2 text-black/80">
                                {personalInfo.address && (
                                    <>
                                        <span>{personalInfo.address}</span>
                                        <span className="font-bold">·</span>
                                    </>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-black/80">
                                {personalInfo.website && (
                                    <>
                                        <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">Portfolio</a>
                                        <span className="font-bold">·</span>
                                    </>
                                )}
                                {personalInfo.email && (
                                    <>
                                        <a href={`mailto:${personalInfo.email}`} className="hover:underline">Email</a>
                                        <span className="font-bold">·</span>
                                    </>
                                )}
                                {personalInfo.phone && (
                                    <>
                                        <a href={`tel:${personalInfo.phone}`} className="hover:underline">{personalInfo.phone}</a>
                                        <span className="font-bold">·</span>
                                    </>
                                )}
                                {personalInfo.linkedIn && (
                                    <>
                                        <a href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                                        {/* <span className="font-bold">·</span> */}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Placeholder for Photo if we add image upload later, kept structure compatible */}
                    {/* <div className="w-[20%]">
                        <img src="mypic.png" alt="Profile" className="w-full object-cover" />
                    </div> */}
                </div>
            </header>

            {/* Summary */}
            {personalInfo.summary && (
                <section>
                    <SectionHeader title="Summary" />
                    <ul className="list-none m-0 p-0">
                        <BulletPoint>{personalInfo.summary}</BulletPoint>
                    </ul>
                </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <section>
                    <SectionHeader title="Education" />
                    <ul className="list-none m-0 p-0 space-y-3">
                        {education.map((edu, index) => (
                            <li key={index}>
                                <div className="flex justify-between items-baseline">
                                    <span className="font-bold text-base">{edu.degree}</span>
                                    <span className="font-bold text-sm italic">({edu.year})</span>
                                </div>
                                <div className="text-sm">{edu.institution}</div>
                                {/* Marks/CGPA could go here if schema is updated */}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
                <section>
                    <SectionHeader title="Skills" />
                    <ul className="list-none m-0 p-0">
                        <BulletPoint>
                            <span className="font-bold">Technical Skills: </span>
                            {skills.join(', ')}
                        </BulletPoint>
                    </ul>
                </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
                <section>
                    <SectionHeader title="Projects" />
                    <ul className="list-none m-0 p-0 space-y-3">
                        {projects.map((proj, index) => (
                            <li key={index}>
                                <div className="flex items-baseline gap-4">
                                    <span className="font-bold text-base">{proj.title}</span>
                                    {proj.link && (
                                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-800 hover:underline">
                                            Link
                                        </a>
                                    )}
                                </div>
                                <div className="text-sm pl-4 mt-1 text-justify">
                                    {proj.description}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
                <section>
                    <SectionHeader title="Experience" />
                    <ul className="list-none m-0 p-0 space-y-4">
                        {experience.map((exp, index) => (
                            <li key={index}>
                                <div className="flex justify-between items-baseline">
                                    <span className="font-bold text-base">{exp.company}</span>
                                    <span className="text-sm font-bold italic">{exp.duration}</span>
                                </div>
                                <div className="text-sm italic mb-1">{exp.role}</div>
                                <div className="text-sm pl-2 text-justify">
                                    {exp.description}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Declaration - Added to match template */}
            <section>
                <SectionHeader title="Declaration" />
                <ul className="list-none m-0 p-0">
                    <BulletPoint>
                        I hereby declare that the above mentioned information is correct up to my knowledge and I bear the responsibility for the correctness of the above mentioned.
                    </BulletPoint>
                </ul>
            </section>
        </div>
    );
};

export default LatexTemplate;
