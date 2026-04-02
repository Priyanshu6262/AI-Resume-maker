import { Plus, Trash2, Wand2, Loader2, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import RichTextEditor from './RichTextEditor';

const ResumeForm = ({ data, updateData }) => {
    const [enhancingField, setEnhancingField] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [errors, setErrors] = useState({});

    const steps = [
        { id: 0, title: 'Personal Info' },
        { id: 1, title: 'Education' },
        { id: 2, title: 'Experience' },
        { id: 3, title: 'Projects' },
        { id: 4, title: 'Skills' },
    ];

    const validateStep = () => {
        const newErrors = {};
        if (currentStep === 0) {
            if (!data.personalInfo.fullName?.trim()) newErrors.fullName = true;
            if (!data.personalInfo.email?.trim()) newErrors.email = true;
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fill in the required fields");
            
            // Clear errors after animation completes (0.4s) so they can re-trigger if needed
            setTimeout(() => setErrors({}), 500); 
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep()) {
            setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
        }
    };

    const handlePrev = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    const enhanceText = async (text, type, trackingId, callback) => {
        if (!text || text.trim() === '') {
            toast.error('Please enter some text first');
            return;
        }

        try {
            setEnhancingField(trackingId);
            const response = await axios.post('http://localhost:5000/api/enhance', { text, type });
            callback(response.data.enhancedText);
            toast.success('Text enhanced with AI!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to enhance text');
        } finally {
            setEnhancingField(null);
        }
    };

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

    const getInputClass = (fieldName) => `w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600 transition-all ${errors[fieldName] ? 'input-error' : ''}`;
    const labelClasses = "block text-sm font-medium text-slate-700 mb-1";
    
    // Shared Navigation Buttons Component
    const NavButtons = () => (
        <div className="flex items-center gap-2">
            {currentStep > 0 && (
                <button onClick={handlePrev} className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors flex items-center gap-1">
                    <ChevronLeft size={14} /> Previous
                </button>
            )}
            {currentStep < steps.length - 1 && (
                <button onClick={handleNext} className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors flex items-center gap-1">
                    Next <ChevronRight size={14} />
                </button>
            )}
        </div>
    );

    return (
        <div className="space-y-6 pb-10">
            {/* Progress Tracker / Status */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative z-0">
                {/* Connecting Line Tracker Background */}
                <div className="absolute top-8 left-8 right-8 h-1 bg-slate-100 rounded-full z-[-1] overflow-hidden">
                    <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}></div>
                </div>
                
                <div className="flex justify-between items-center relative px-2">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-all duration-300 border-2 bg-white ${
                                currentStep === index 
                                    ? 'border-green-600 text-green-700 shadow-[0_0_0_4px_rgba(34,197,94,0.15)]' 
                                    : currentStep > index 
                                        ? 'border-green-500 bg-green-500 text-white' 
                                        : 'border-slate-300 text-slate-400'
                            }`}>
                                {index + 1}
                            </div>
                            <span className={`text-xs font-bold ${currentStep === index ? 'text-slate-900' : 'text-slate-500'}`}>{step.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Step 0: Personal Info */}
            {currentStep === 0 && (
                <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-3">
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide">Personal Information</h3>
                        <NavButtons />
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <label className={labelClasses}>Full Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={data.personalInfo.fullName}
                                onChange={(e) => handleChange('personalInfo', 'fullName', e.target.value)}
                                className={getInputClass('fullName')}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>Email <span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                value={data.personalInfo.email}
                                onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
                                className={getInputClass('email')}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>Phone</label>
                            <input
                                type="text"
                                placeholder="+1 234 567 890"
                                value={data.personalInfo.phone}
                                onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
                                className={getInputClass('phone')}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>Address</label>
                            <input
                                type="text"
                                placeholder="City, Country"
                                value={data.personalInfo.address}
                                onChange={(e) => handleChange('personalInfo', 'address', e.target.value)}
                                className={getInputClass('address')}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>LinkedIn</label>
                            <input
                                type="text"
                                placeholder="https://linkedin.com/in/..."
                                value={data.personalInfo.linkedIn || ''}
                                onChange={(e) => handleChange('personalInfo', 'linkedIn', e.target.value)}
                                className={getInputClass('linkedIn')}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>Portfolio / Website</label>
                            <input
                                type="text"
                                placeholder="https://yourportfolio.com"
                                value={data.personalInfo.website || ''}
                                onChange={(e) => handleChange('personalInfo', 'website', e.target.value)}
                                className={getInputClass('website')}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>GitHub</label>
                            <input
                                type="text"
                                placeholder="https://github.com/username"
                                value={data.personalInfo.github || ''}
                                onChange={(e) => handleChange('personalInfo', 'github', e.target.value)}
                                className={getInputClass('github')}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>Twitter / X</label>
                            <input
                                type="text"
                                placeholder="https://twitter.com/username"
                                value={data.personalInfo.twitter || ''}
                                onChange={(e) => handleChange('personalInfo', 'twitter', e.target.value)}
                                className={getInputClass('twitter')}
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-sm font-medium text-slate-700">Professional Summary</label>
                                <button
                                    type="button"
                                    onClick={() => enhanceText(data.personalInfo.summary, 'summary', 'summary', (newText) => handleChange('personalInfo', 'summary', newText))}
                                    disabled={enhancingField === 'summary'}
                                    className="text-xs flex items-center gap-1 text-green-600 hover:text-green-700 font-medium disabled:opacity-50"
                                >
                                    {enhancingField === 'summary' ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
                                    Enhance with AI
                                </button>
                            </div>
                            <RichTextEditor
                                placeholder="Briefly describe your professional background..."
                                value={data.personalInfo.summary}
                                onChange={(val) => handleChange('personalInfo', 'summary', val)}
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Step 1: Education */}
            {currentStep === 1 && (
                <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-3">
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide">Education</h3>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => addItem('education', { institution: '', degree: '', year: '' })}
                                className="text-green-600 hover:text-green-700 flex items-center gap-1 text-sm font-medium mr-2"
                            >
                                <Plus size={16} /> Add
                            </button>
                            <NavButtons />
                        </div>
                    </div>
                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index} className="p-4 border border-slate-200 rounded-lg bg-slate-50 relative group">
                                <button
                                    onClick={() => removeItem('education', index)}
                                    className="absolute top-3 right-3 text-slate-400 hover:text-red-500"
                                    title="Remove"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <div className="grid grid-cols-1 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Institution (e.g. Harvard University)"
                                        value={edu.institution}
                                        onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                                        className={getInputClass('')}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Degree (e.g. B.S. across Computer Science)"
                                        value={edu.degree}
                                        onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                                        className={getInputClass('')}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Year (e.g. 2018 - 2022)"
                                        value={edu.year}
                                        onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
                                        className={getInputClass('')}
                                    />
                                </div>
                            </div>
                        ))}
                        {data.education.length === 0 && (
                            <p className="text-slate-500 text-sm text-center italic py-6 bg-slate-50 border border-dashed border-slate-300 rounded-lg">No education added yet. Click 'Add' to insert an item.</p>
                        )}
                    </div>
                </section>
            )}

            {/* Step 2: Experience */}
            {currentStep === 2 && (
                <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-3">
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide">Experience</h3>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => addItem('experience', { company: '', role: '', duration: '', description: '' })}
                                className="text-green-600 hover:text-green-700 flex items-center gap-1 text-sm font-medium mr-2"
                            >
                                <Plus size={16} /> Add
                            </button>
                            <NavButtons />
                        </div>
                    </div>
                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="p-4 border border-slate-200 rounded-lg bg-slate-50 relative group">
                                <button
                                    onClick={() => removeItem('experience', index)}
                                    className="absolute top-3 right-3 text-slate-400 hover:text-red-500"
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
                                        className={getInputClass('')}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Role"
                                        value={exp.role}
                                        onChange={(e) => handleArrayChange('experience', index, 'role', e.target.value)}
                                        className={getInputClass('')}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Duration (e.g. Jan 2020 - Present)"
                                        value={exp.duration}
                                        onChange={(e) => handleArrayChange('experience', index, 'duration', e.target.value)}
                                        className={getInputClass('')}
                                    />
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-medium text-slate-700">Description</label>
                                            <button
                                                type="button"
                                                onClick={() => enhanceText(exp.description, 'experience', `experience-${index}`, (newText) => handleArrayChange('experience', index, 'description', newText))}
                                                disabled={enhancingField === `experience-${index}`}
                                                className="text-xs flex items-center gap-1 text-green-600 hover:text-green-700 font-medium disabled:opacity-50 border border-slate-200 bg-white hover:bg-slate-50 px-2 py-1 rounded-md"
                                                title="Enhance with AI"
                                            >
                                                {enhancingField === `experience-${index}` ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
                                                <span className="hidden sm:inline">Enhance</span>
                                            </button>
                                        </div>
                                        <RichTextEditor
                                            placeholder="Description of your responsibilities and achievements..."
                                            value={exp.description}
                                            onChange={(val) => handleArrayChange('experience', index, 'description', val)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {data.experience.length === 0 && (
                            <p className="text-slate-500 text-sm text-center italic py-6 bg-slate-50 border border-dashed border-slate-300 rounded-lg">No experience added yet.</p>
                        )}
                    </div>
                </section>
            )}

            {/* Step 3: Projects */}
            {currentStep === 3 && (
                <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-3">
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide">Projects</h3>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => addItem('projects', { title: '', link: '', sourceLink: '', description: '' })}
                                className="text-green-600 hover:text-green-700 flex items-center gap-1 text-sm font-medium mr-2"
                            >
                                <Plus size={16} /> Add
                            </button>
                            <NavButtons />
                        </div>
                    </div>
                    <div className="space-y-4">
                        {(data.projects || []).map((proj, index) => (
                            <div key={index} className="p-4 border border-slate-200 rounded-lg bg-slate-50 relative group">
                                <button
                                    onClick={() => removeItem('projects', index)}
                                    className="absolute top-3 right-3 text-slate-400 hover:text-red-500"
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
                                        className={getInputClass('')}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Project Link (Live Demo URL)"
                                        value={proj.link}
                                        onChange={(e) => handleArrayChange('projects', index, 'link', e.target.value)}
                                        className={getInputClass('')}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Source Code Link (GitHub)"
                                        value={proj.sourceLink || ''}
                                        onChange={(e) => handleArrayChange('projects', index, 'sourceLink', e.target.value)}
                                        className={getInputClass('')}
                                    />
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-medium text-slate-700">Description</label>
                                            <button
                                                type="button"
                                                onClick={() => enhanceText(proj.description, 'project', `project-${index}`, (newText) => handleArrayChange('projects', index, 'description', newText))}
                                                disabled={enhancingField === `project-${index}`}
                                                className="text-xs flex items-center gap-1 text-green-600 hover:text-green-700 font-medium disabled:opacity-50 border border-slate-200 bg-white hover:bg-slate-50 px-2 py-1 rounded-md"
                                                title="Enhance with AI"
                                            >
                                                {enhancingField === `project-${index}` ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
                                                <span className="hidden sm:inline">Enhance</span>
                                            </button>
                                        </div>
                                        <RichTextEditor
                                            placeholder="What did you build and what technologies did you use?"
                                            value={proj.description}
                                            onChange={(val) => handleArrayChange('projects', index, 'description', val)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {(!data.projects || data.projects.length === 0) && (
                            <p className="text-slate-500 text-sm text-center italic py-6 bg-slate-50 border border-dashed border-slate-300 rounded-lg">No projects added yet.</p>
                        )}
                    </div>
                </section>
            )}

            {/* Step 4: Skills */}
            {currentStep === 4 && (
                <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-3">
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide">Skills</h3>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => {
                                    const newSkills = [...data.skills, ''];
                                    updateData(prev => ({ ...prev, skills: newSkills }));
                                }}
                                className="text-green-600 hover:text-green-700 flex items-center gap-1 text-sm font-medium mr-2"
                            >
                                <Plus size={16} /> Add
                            </button>
                            <NavButtons />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {data.skills.map((skill, index) => (
                            <div key={index} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-1.5 pl-3 group focus-within:ring-1 focus-within:ring-green-600">
                                <input
                                    type="text"
                                    value={typeof skill === 'object' ? skill.name : skill}
                                    onChange={(e) => {
                                        const newSkills = [...data.skills];
                                        newSkills[index] = e.target.value;
                                        updateData(prev => ({ ...prev, skills: newSkills }));
                                    }}
                                    className="bg-transparent text-slate-900 outline-none w-32 placeholder-slate-400 text-sm"
                                    placeholder="Skill (e.g. React)"
                                />
                                <button onClick={() => {
                                    const newSkills = [...data.skills];
                                    newSkills.splice(index, 1);
                                    updateData(prev => ({ ...prev, skills: newSkills }));
                                }} className="text-slate-400 hover:text-red-500 p-1 rounded-full hover:bg-slate-200">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                        {data.skills.length === 0 && (
                            <p className="text-slate-500 text-sm text-center italic py-6 w-full bg-slate-50 border border-dashed border-slate-300 rounded-lg">No skills added yet.</p>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ResumeForm;
