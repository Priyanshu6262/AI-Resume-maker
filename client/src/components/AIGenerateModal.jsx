import { useState } from 'react';
import { X, Sparkles, AlertCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AIGenerateModal = ({ isOpen, onClose, onGenerate }) => {
    const [jobDescription, setJobDescription] = useState('');
    const [requiredSkills, setRequiredSkills] = useState('');
    const [projectDetails, setProjectDetails] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleGenerate = async () => {
        if (!jobDescription.trim()) {
            toast.error('Job Description is required.');
            return;
        }

        try {
            setLoading(true);
            const { data } = await axios.post('http://localhost:5000/api/enhance/generate-from-jd', {
                jobDescription,
                requiredSkills,
                projectDetails
            });

            onGenerate(data);
            toast.success('Resume data generated successfully based on JD!');
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to generate tailored resume data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-100">
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 text-[#3c5a38] rounded-lg">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Generate Tailored Content</h2>
                            <p className="text-sm text-slate-500 mt-1">Provide job details to generate personalized resume content.</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto flex-1 space-y-5">
                    
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Job Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            className="w-full p-3 border border-slate-200 rounded-xl focus:border-[#3c5a38] focus:ring-1 focus:ring-[#3c5a38] outline-none transition-all placeholder:text-slate-400 min-h-[120px] resize-y text-slate-700 shadow-sm"
                            placeholder="Paste the job description or role requirements here..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Target Skills (Optional)
                        </label>
                        <textarea
                            value={requiredSkills}
                            onChange={(e) => setRequiredSkills(e.target.value)}
                            className="w-full p-3 border border-slate-200 rounded-xl focus:border-[#3c5a38] focus:ring-1 focus:ring-[#3c5a38] outline-none transition-all placeholder:text-slate-400 min-h-[80px] resize-y text-slate-700 shadow-sm"
                            placeholder="E.g. React, Node.js, Agile, AWS..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Your Current Project Details / Experience (Optional)
                        </label>
                        <textarea
                            value={projectDetails}
                            onChange={(e) => setProjectDetails(e.target.value)}
                            className="w-full p-3 border border-slate-200 rounded-xl focus:border-[#3c5a38] focus:ring-1 focus:ring-[#3c5a38] outline-none transition-all placeholder:text-slate-400 min-h-[100px] resize-y text-slate-700 shadow-sm"
                            placeholder="Briefly describe your existing projects or context so the AI can align them with the job."
                        />
                    </div>

                    <div className="flex items-center gap-2 p-4 bg-blue-50 text-blue-800 rounded-xl border border-blue-100">
                        <AlertCircle size={20} className="shrink-0 text-blue-500" />
                        <p className="text-sm">
                            This will overwrite your current Professional Summary, and update your Skills and Project descriptions. 
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleGenerate}
                        disabled={loading || !jobDescription.trim()}
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-[#3c5a38] hover:bg-[#2e452a] rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 shadow-md hover:shadow-lg disabled:hover:shadow-md"
                    >
                        {loading ? (
                            <>
                                <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></span>
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles size={18} />
                                Generate Context
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIGenerateModal;
