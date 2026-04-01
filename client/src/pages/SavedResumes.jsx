import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Edit, Download as DownloadIcon, PlusCircle, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ResumePreview from '../components/ResumePreview';

const SavedResumes = () => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [downloadingResume, setDownloadingResume] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const hiddenPrintRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo || !userInfo.token) {
                navigate('/login');
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get('http://localhost:5000/api/resumes', config);
            
            if (Array.isArray(data)) {
                setResumes(data);
            } else if (data && data._id) {
                setResumes([data]);
            } else {
                setResumes([]);
            }
        } catch (error) {
            toast.error('Failed to fetch saved resumes');
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteResume = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to permanently delete this resume?")) return;
        
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.delete(`http://localhost:5000/api/resumes/${id}`, config);
            setResumes(resumes.filter(r => r._id !== id));
            toast.success('Resume deleted successfully');
        } catch (error) {
            toast.error('Failed to delete resume');
        }
    };

    const handleDownloadClick = (resume) => {
        setDownloadingResume(resume);
        setIsGenerating(true);
    };

    useEffect(() => {
        const generatePdf = async () => {
            if (!downloadingResume || !hiddenPrintRef.current) return;

            try {
                // Wait briefly to ensure the DOM is fully painted and images load
                await new Promise(resolve => setTimeout(resolve, 800));

                const element = hiddenPrintRef.current;
                const pages = element.querySelectorAll('.resume-page');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();

                const addLinksToPdf = (pageElement, pdfDoc, scaleFactor) => {
                    const links = pageElement.querySelectorAll('a');
                    const pageRect = pageElement.getBoundingClientRect();
                    links.forEach(link => {
                        const linkRect = link.getBoundingClientRect();
                        const x = (linkRect.left - pageRect.left) * scaleFactor;
                        const y = (linkRect.top - pageRect.top) * scaleFactor;
                        const w = linkRect.width * scaleFactor;
                        const h = linkRect.height * scaleFactor;
                        if (link.href) pdfDoc.link(x, y, w, h, { url: link.href });
                    });
                };

                if (pages.length > 0) {
                    for (let i = 0; i < pages.length; i++) {
                        const page = pages[i];
                        if (i > 0) pdf.addPage();
                        const canvas = await html2canvas(page, { scale: 2, useCORS: true, logging: false });
                        const imgData = canvas.toDataURL('image/png');
                        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                        addLinksToPdf(page, pdf, pdfWidth / page.offsetWidth);
                    }
                } else {
                    const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false });
                    const imgData = canvas.toDataURL('image/png');
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    addLinksToPdf(element, pdf, pdfWidth / element.offsetWidth);
                }

                const filename = downloadingResume.personalInfo?.fullName 
                    ? `${downloadingResume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf` 
                    : 'Resume.pdf';
                
                pdf.save(filename);
                toast.success('Resume downloaded successfully');
            } catch (error) {
                console.error(error);
                toast.error('Failed to generate PDF');
            } finally {
                setDownloadingResume(null);
                setIsGenerating(false);
            }
        };

        if (downloadingResume && isGenerating) {
            generatePdf();
        }
    }, [downloadingResume, isGenerating]);

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <h2 className="text-4xl font-extrabold mb-12 text-center text-slate-900">
                My Saved Resumes
            </h2>

            {loading ? (
                <div className="flex justify-center text-slate-900 font-medium text-xl">Loading...</div>
            ) : resumes.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-slate-600 pt-10">
                    <p className="text-xl mb-6">You haven't saved any resumes yet.</p>
                    <button
                        onClick={() => navigate('/templates')}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold"
                    >
                        <PlusCircle size={20} /> Create New Resume
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
                    {resumes.map((resume) => (
                        <div key={resume._id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:border-green-600 group">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2 truncate">
                                    {resume.personalInfo?.fullName || 'Untitled Resume'}
                                </h3>
                                <p className="text-slate-600 text-sm capitalize">
                                    Template: <span className="text-green-600 font-medium">{resume.templateId}</span>
                                </p>
                                <p className="text-slate-500 text-xs mt-2">
                                    Last saved: {new Date(resume.updatedAt).toLocaleDateString()} at {new Date(resume.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </p>
                            </div>

                            <div className="mt-auto">
                                <div className="mb-4">
                                    <label className="text-xs text-slate-600 font-medium mb-1 flex items-center justify-between">
                                        Resume for:
                                        <span className="text-[10px] text-slate-500 italic px-2">(Future functionality)</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Frontend Developer Role..." 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-sm text-slate-600 focus:outline-none cursor-not-allowed opacity-70"
                                        disabled
                                        title="This functionality will be activated in a future update"
                                    />
                                </div>

                                <div className="flex gap-3 border-t border-slate-200 pt-4">
                                    <button
                                        onClick={() => navigate(`/editor?template=${resume.templateId}&id=${resume._id}`)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg font-medium text-sm"
                                    >
                                        <Edit size={16} /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDownloadClick(resume)}
                                        disabled={isGenerating && downloadingResume?._id === resume._id}
                                        className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium text-sm disabled:opacity-50"
                                    >
                                        <DownloadIcon size={16} /> 
                                        {isGenerating && downloadingResume?._id === resume._id ? 'Generating...' : 'Download'}
                                    </button>
                                    <button
                                        onClick={(e) => handleDeleteResume(resume._id, e)}
                                        className="flex-none p-2 bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-500 rounded-lg shadow-sm"
                                        title="Delete Resume"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Hidden Print Container */}
            {downloadingResume && (
                <div style={{ position: 'fixed', left: '-10000px', top: '0', width: '210mm', zIndex: -9999 }}>
                    <div ref={hiddenPrintRef}>
                        <ResumePreview data={downloadingResume} templateId={downloadingResume.templateId} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavedResumes;
