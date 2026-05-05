import { useState, useRef } from 'react';
import { X, Sparkles, AlertCircle, UploadCloud, FileText, CheckCircle } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AIGenerateModal = ({ isOpen, onClose, onGenerate }) => {
    const [jobDescription, setJobDescription] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const ACCEPTED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    const ACCEPTED_LABELS = 'PDF, DOC, DOCX, JPG, PNG';

    const handleFileSelect = (file) => {
        if (!file) return;
        if (!ACCEPTED_TYPES.includes(file.type)) {
            toast.error(`Unsupported file type. Please upload ${ACCEPTED_LABELS}.`);
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size exceeds 5MB limit.');
            return;
        }
        setResumeFile(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        handleFileSelect(e.dataTransfer.files[0]);
    };

    const handleGenerate = async () => {
        if (!jobDescription.trim()) {
            toast.error('Job Description is required.');
            return;
        }
        if (!resumeFile) {
            toast.error('Please upload your existing resume.');
            return;
        }

        try {
            setLoading(true);

            // Read the file as base64
            const fileData = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result.split(',')[1]);
                reader.onerror = reject;
                reader.readAsDataURL(resumeFile);
            });

            const { data } = await api.post('/api/enhance/generate-job-fit', {
                jobDescription,
                fileData,
                mimeType: resumeFile.type,
            });

            onGenerate(data);
            toast.success('ATS-friendly resume generated successfully!');
            // Reset state
            setJobDescription('');
            setResumeFile(null);
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to generate tailored resume. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col border border-slate-100">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-green-50 to-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-green-600 text-white rounded-xl shadow-sm">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Job Fit Resume</h2>
                            <p className="text-xs text-slate-500 mt-0.5">AI-powered ATS optimization tailored to the job</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto flex-1 space-y-6">

                    {/* Job Description */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Job Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            disabled={loading}
                            className="w-full p-3.5 border border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none placeholder:text-slate-400 min-h-[130px] resize-y text-slate-700 text-sm leading-relaxed transition-all disabled:opacity-60"
                            placeholder="Paste the full job description or role requirements here. The more detail you provide, the better the AI can tailor your resume..."
                        />
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Upload Your Existing Resume <span className="text-red-500">*</span>
                        </label>

                        {resumeFile ? (
                            /* File selected state */
                            <div className="flex items-center gap-4 p-4 border-2 border-green-300 bg-green-50 rounded-xl">
                                <div className="p-2.5 bg-green-100 text-green-600 rounded-lg flex-shrink-0">
                                    <FileText size={22} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-800 truncate">{resumeFile.name}</p>
                                    <p className="text-xs text-slate-500 mt-0.5">{(resumeFile.size / 1024).toFixed(1)} KB &bull; {resumeFile.type.split('/')[1].toUpperCase()}</p>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <CheckCircle size={18} className="text-green-500" />
                                    <button
                                        onClick={() => { setResumeFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                                        disabled={loading}
                                        className="text-xs text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* Drop zone */
                            <div
                                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all ${dragOver ? 'border-green-500 bg-green-50 scale-[1.01]' : 'border-slate-200 bg-slate-50/60 hover:border-green-400 hover:bg-green-50/50'}`}
                            >
                                <div className={`p-3 rounded-full transition-colors ${dragOver ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                                    <UploadCloud size={26} />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-semibold text-slate-700">
                                        <span className="text-green-600">Click to upload</span> or drag &amp; drop
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">{ACCEPTED_LABELS} &bull; Max 5MB</p>
                                </div>
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(e) => handleFileSelect(e.target.files[0])}
                        />
                    </div>

                    {/* Info Banner */}
                    <div className="flex items-start gap-3 p-4 bg-amber-50 text-amber-800 rounded-xl border border-amber-100">
                        <AlertCircle size={18} className="shrink-0 text-amber-500 mt-0.5" />
                        <p className="text-xs leading-relaxed">
                            <span className="font-semibold">Heads up:</span> Generating will overwrite your current resume data with an AI-optimized version tailored to the job description. Your original data will be replaced.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/60">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 bg-slate-100 rounded-xl disabled:opacity-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleGenerate}
                        disabled={loading || !jobDescription.trim() || !resumeFile}
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 active:scale-95 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm transition-all"
                    >
                        {loading ? (
                            <>
                                <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full flex-shrink-0" />
                                Analyzing Job Description &amp; Optimizing Resume...
                            </>
                        ) : (
                            <>
                                <Sparkles size={16} />
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
