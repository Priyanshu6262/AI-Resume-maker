import { Plus, Trash2 } from 'lucide-react';

const ResumeForm = ({ data, updateData }) => {
    const handleChange = (section, field, value) => {
        updateData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [field]: value },
        }));
    };

    const handleArrayChange = (section, index, field, value) => {
        const newArray = [...data[section]];
        newArray[index][field] = value;
        updateData((prev) => ({ ...prev, [section]: newArray }));
    };

    const addItem = (section, initialItem) => {
        updateData((prev) => ({
            ...prev,
            [section]: [...prev[section], initialItem],
        }));
    };

    const removeItem = (section, index) => {
        const newArray = [...data[section]];
        newArray.splice(index, 1);
        updateData((prev) => ({ ...prev, [section]: newArray }));
    };

    const inputClasses = "w-full p-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all";
    const labelClasses = "block text-sm font-medium text-slate-300 mb-1";
    const sectionTitleClasses = "text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2";

    return (
        <div className="space-y-8 pb-10">
            {/* Personal Info */}
            <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h3 className={sectionTitleClasses}>Personal Information</h3>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className={labelClasses}>Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={data.personalInfo.fullName}
                            onChange={(e) => handleChange('personalInfo', 'fullName', e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Email</label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            value={data.personalInfo.email}
                            onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Phone</label>
                        <input
                            type="text"
                            placeholder="+1 234 567 890"
                            value={data.personalInfo.phone}
                            onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Address</label>
                        <input
                            type="text"
                            placeholder="City, Country"
                            value={data.personalInfo.address}
                            onChange={(e) => handleChange('personalInfo', 'address', e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>LinkedIn</label>
                        <input
                            type="text"
                            placeholder="https://linkedin.com/in/..."
                            value={data.personalInfo.linkedIn || ''}
                            onChange={(e) => handleChange('personalInfo', 'linkedIn', e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Portfolio / Website</label>
                        <input
                            type="text"
                            placeholder="https://yourportfolio.com"
                            value={data.personalInfo.website || ''}
                            onChange={(e) => handleChange('personalInfo', 'website', e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>GitHub</label>
                        <input
                            type="text"
                            placeholder="https://github.com/username"
                            value={data.personalInfo.github || ''}
                            onChange={(e) => handleChange('personalInfo', 'github', e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Twitter / X</label>
                        <input
                            type="text"
                            placeholder="https://twitter.com/username"
                            value={data.personalInfo.twitter || ''}
                            onChange={(e) => handleChange('personalInfo', 'twitter', e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Professional Summary</label>
                        <textarea
                            placeholder="Briefly describe your professional background..."
                            value={data.personalInfo.summary}
                            onChange={(e) => handleChange('personalInfo', 'summary', e.target.value)}
                            className={`${inputClasses} h-24 resize-none`}
                        />
                    </div>
                </div>
            </section>

            {/* Education */}
            <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
                    <h3 className="text-lg font-bold text-white">Education</h3>
                    <button
                        onClick={() => addItem('education', { institution: '', degree: '', year: '' })}
                        className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm font-medium transition-colors"
                    >
                        <Plus size={16} /> Add Education
                    </button>
                </div>
                <div className="space-y-4">
                    {data.education.map((edu, index) => (
                        <div key={index} className="p-4 border border-slate-600 rounded-lg bg-slate-800 relative group hover:border-purple-500/50 transition-colors">
                            <button
                                onClick={() => removeItem('education', index)}
                                className="absolute top-3 right-3 text-slate-500 hover:text-red-400 opacity-100 transition-colors"
                                title="Remove"
                            >
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 gap-3">
                                <input
                                    type="text"
                                    placeholder="Institution"
                                    value={edu.institution}
                                    onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                                    className={inputClasses}
                                />
                                <input
                                    type="text"
                                    placeholder="Degree"
                                    value={edu.degree}
                                    onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                                    className={inputClasses}
                                />
                                <input
                                    type="text"
                                    placeholder="Year"
                                    value={edu.year}
                                    onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
                                    className={inputClasses}
                                />
                            </div>
                        </div>
                    ))}
                    {data.education.length === 0 && (
                        <p className="text-slate-500 text-sm text-center italic py-2">No education added yet.</p>
                    )}
                </div>
            </section>

            {/* Experience */}
            <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
                    <h3 className="text-lg font-bold text-white">Experience</h3>
                    <button
                        onClick={() => addItem('experience', { company: '', role: '', duration: '', description: '' })}
                        className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm font-medium transition-colors"
                    >
                        <Plus size={16} /> Add Experience
                    </button>
                </div>
                <div className="space-y-4">
                    {data.experience.map((exp, index) => (
                        <div key={index} className="p-4 border border-slate-600 rounded-lg bg-slate-800 relative group hover:border-purple-500/50 transition-colors">
                            <button
                                onClick={() => removeItem('experience', index)}
                                className="absolute top-3 right-3 text-slate-500 hover:text-red-400 opacity-100 transition-colors"
                                title="Remove"
                            >
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 gap-3">
                                <input
                                    type="text"
                                    placeholder="Company"
                                    value={exp.company}
                                    onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                                    className={inputClasses}
                                />
                                <input
                                    type="text"
                                    placeholder="Role"
                                    value={exp.role}
                                    onChange={(e) => handleArrayChange('experience', index, 'role', e.target.value)}
                                    className={inputClasses}
                                />
                                <input
                                    type="text"
                                    placeholder="Duration"
                                    value={exp.duration}
                                    onChange={(e) => handleArrayChange('experience', index, 'duration', e.target.value)}
                                    className={inputClasses}
                                />
                                <textarea
                                    placeholder="Description"
                                    value={exp.description}
                                    onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                                    className={`${inputClasses} h-20 resize-none`}
                                />
                            </div>
                        </div>
                    ))}
                    {data.experience.length === 0 && (
                        <p className="text-slate-500 text-sm text-center italic py-2">No experience added yet.</p>
                    )}
                </div>
            </section>

            {/* Projects */}
            <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
                    <h3 className="text-lg font-bold text-white">Projects</h3>
                    <button
                        onClick={() => addItem('projects', { title: '', link: '', sourceLink: '', description: '' })}
                        className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm font-medium transition-colors"
                    >
                        <Plus size={16} /> Add Project
                    </button>
                </div>
                <div className="space-y-4">
                    {(data.projects || []).map((proj, index) => (
                        <div key={index} className="p-4 border border-slate-600 rounded-lg bg-slate-800 relative group hover:border-purple-500/50 transition-colors">
                            <button
                                onClick={() => removeItem('projects', index)}
                                className="absolute top-3 right-3 text-slate-500 hover:text-red-400 opacity-100 transition-colors"
                                title="Remove"
                            >
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 gap-3">
                                <input
                                    type="text"
                                    placeholder="Project Title"
                                    value={proj.title}
                                    onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)}
                                    className={inputClasses}
                                />
                                <input
                                    type="text"
                                    placeholder="Project Link (Live Demo)"
                                    value={proj.link}
                                    onChange={(e) => handleArrayChange('projects', index, 'link', e.target.value)}
                                    className={inputClasses}
                                />
                                <input
                                    type="text"
                                    placeholder="Source Code Link (GitHub)"
                                    value={proj.sourceLink || ''}
                                    onChange={(e) => handleArrayChange('projects', index, 'sourceLink', e.target.value)}
                                    className={inputClasses}
                                />
                                <textarea
                                    placeholder="Description"
                                    value={proj.description}
                                    onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                                    className={`${inputClasses} h-20 resize-none`}
                                />
                            </div>
                        </div>
                    ))}
                    {(!data.projects || data.projects.length === 0) && (
                        <p className="text-slate-500 text-sm text-center italic py-2">No projects added yet.</p>
                    )}
                </div>
            </section>

            {/* Skills */}
            <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
                    <h3 className="text-lg font-bold text-white">Skills</h3>
                    <button
                        onClick={() => {
                            const newSkills = [...data.skills, ''];
                            updateData(prev => ({ ...prev, skills: newSkills }));
                        }}
                        className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm font-medium transition-colors"
                    >
                        <Plus size={16} /> Add Skill
                    </button>
                </div>
                <div className="flex flex-wrap gap-3">
                    {data.skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-2 bg-slate-800 border border-slate-600 rounded-lg p-1.5 pl-3 group focus-within:ring-1 focus-within:ring-purple-500">
                            <input
                                type="text"
                                value={skill}
                                onChange={(e) => {
                                    const newSkills = [...data.skills];
                                    newSkills[index] = e.target.value;
                                    updateData(prev => ({ ...prev, skills: newSkills }));
                                }}
                                className="bg-transparent text-white outline-none w-32 placeholder-slate-500 text-sm"
                                placeholder="Skill"
                            />
                            <button onClick={() => {
                                const newSkills = [...data.skills];
                                newSkills.splice(index, 1);
                                updateData(prev => ({ ...prev, skills: newSkills }));
                            }} className="text-slate-500 hover:text-red-400 p-1 rounded-full hover:bg-slate-700 transition-colors">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                    {data.skills.length === 0 && (
                        <p className="text-slate-500 text-sm italic w-full text-center py-2">No skills added yet.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ResumeForm;
