import { useState } from 'react';
import { X, Sparkles, AlertCircle } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AIGenerateModal = ({ isOpen, onClose, onGenerate }) => {
    const [jobDescription, setJobDescription] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleGenerate = async () => {
        if (!jobDescription.trim()) {
            toast.error('Job Description is required.');
            return;
        }

        try {
            setLoading(true);
            const { data } = await api.post('/enhance/generate-from-jd', {
                jobDescription,
            });

            onGenerate(data);
            toast.success('ATS-friendly resume generated successfully!');
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
                        <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Job Fit Resume</h2>
                            <p className="text-sm text-slate-500 mt-1">Provide a job description to generate a tailored ATS-friendly resume.</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full"
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
                            className="w-full p-3 border border-slate-200 rounded-xl focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none placeholder:text-slate-400 min-h-[120px] resize-y text-slate-700 shadow-sm"
                            placeholder="Paste the job description or role requirements here..."
                        />
                    </div>

                    <div className="flex items-center gap-2 p-4 bg-blue-50 text-blue-800 rounded-xl border border-blue-100">
                        <AlertCircle size={20} className="shrink-0 text-blue-500" />
                        <p className="text-sm">
                            This will overwrite your entire resume to tailor it perfectly to the job description.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 bg-slate-100 rounded-xl disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleGenerate}
                        disabled={loading || !jobDescription.trim()}
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl disabled:opacity-50 flex items-center gap-2 shadow-sm"
                    >
                        {loading ? (
                            <>
                                <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></span>
                                Analyzing Job Description &amp; Optimizing Resume...
                            </>
                        ) : (
                            <>
                                <Sparkles size={18} />
                                Generate Resume
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIGenerateModal;
