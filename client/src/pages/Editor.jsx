import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Save, Download, FileText } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

import ResumePreview from '../components/ResumePreview';
import ResumeForm from '../components/ResumeForm';
import { useNavbar } from '../context/NavbarContext';

const Editor = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const resumeId = searchParams.get('id');
    const templateId = searchParams.get('template') || 'simple';
    const previewRef = useRef();
    const navigate = useNavigate();
    const { setTitle, setActions } = useNavbar();

    const [resumeData, setResumeData] = useState({
        personalInfo: { fullName: '', email: '', phone: '', address: '', summary: '', linkedIn: '', website: '', github: '', twitter: '' },
        education: [],
        experience: [],
        skills: [],
        projects: [],
    });

    // Fetch existing resume data if editing
    useEffect(() => {
        if (resumeId) {
            const fetchResume = async () => {
                try {
                    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                    if (!userInfo || !userInfo.token) return;

                    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                    const { data } = await axios.get(`http://localhost:5000/api/resumes/${resumeId}`, config);
                    
                    if (data) {
                        setResumeData({
                            personalInfo: data.personalInfo || {},
                            education: data.education || [],
                            experience: data.experience || [],
                            skills: data.skills || [],
                            projects: data.projects || []
                        });
                        
                        // If template in DB is different from URL, update URL silently
                        if (data.templateId && data.templateId !== templateId) {
                            setSearchParams({ template: data.templateId, id: resumeId }, { replace: true });
                        }
                    }
                } catch (error) {
                    toast.error('Failed to load resume data');
                }
            };
            fetchResume();
        }
    }, [resumeId]);

    const handleDownload = async () => {
        const element = previewRef.current;
        if (!element) return;

        try {
            // Wait a moment for images to load if they are dynamic
            await new Promise(resolve => setTimeout(resolve, 500));

            // Create a clone of the element to avoid interfering with current view/scale
            const clone = element.cloneNode(true);

            // Apply styles to the clone to ensure it renders at full scale and correct layout
            clone.style.transform = 'scale(1)';
            clone.style.position = 'fixed'; // Remove from document flow
            clone.style.left = '-10000px'; // Move off-screen
            clone.style.top = '0';
            clone.style.width = '210mm'; // Force A4 width
            // clone.style.minHeight = '297mm'; // Remove minHeight constraint so it can hold multiple pages if not paginated? 
            // Actually, if we use pagination, 'element' might contain multiple pages.
            // If the preview in Editor IS paginated (multiple .resume-page divs), then cloning the container works.

            clone.style.margin = '0';
            clone.style.zIndex = '-9999';

            // Append to body so it gets rendered
            document.body.appendChild(clone);

            // Find all pages within the clone
            const pages = clone.querySelectorAll('.resume-page');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm

            // Function to add links for a specific page element
            const addLinksToPdf = (pageElement, pdfDoc, scaleFactor) => {
                const links = pageElement.querySelectorAll('a');
                const pageRect = pageElement.getBoundingClientRect();

                links.forEach(link => {
                    const linkRect = link.getBoundingClientRect();

                    // Calculate relative position and size in PDF units
                    const x = (linkRect.left - pageRect.left) * scaleFactor;
                    const y = (linkRect.top - pageRect.top) * scaleFactor;
                    const w = linkRect.width * scaleFactor;
                    const h = linkRect.height * scaleFactor;

                    if (link.href) {
                        pdfDoc.link(x, y, w, h, { url: link.href });
                    }
                });
            };

            if (pages.length > 0) {
                // Multi-page logic
                for (let i = 0; i < pages.length; i++) {
                    const page = pages[i];
                    if (i > 0) pdf.addPage();

                    const canvas = await html2canvas(page, {
                        scale: 2,
                        useCORS: true,
                        logging: false,
                        allowTaint: true,
                        backgroundColor: '#ffffff',
                        windowWidth: page.scrollWidth,
                        windowHeight: page.scrollHeight
                    });

                    const imgData = canvas.toDataURL('image/png');
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

                    // Calculate scale factor: 210mm / page width in pixels
                    // note: page.scrollWidth might be slightly different than bounding client rect due to rounding
                    // Safer to use the ratio of PDF width to Canvas width (scaled down by the html2canvas scale)
                    // OR just pdfWidth / page.offsetWidth
                    const scaleFactor = pdfWidth / page.offsetWidth;
                    addLinksToPdf(page, pdf, scaleFactor);
                }
            } else {
                // Fallback for single page / non-paginated templates (like Modern)
                const canvas = await html2canvas(clone, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    allowTaint: true,
                    backgroundColor: '#ffffff',
                    windowWidth: clone.scrollWidth,
                    windowHeight: clone.scrollHeight
                });

                const imgData = canvas.toDataURL('image/png');
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

                const scaleFactor = pdfWidth / clone.offsetWidth;
                addLinksToPdf(clone, pdf, scaleFactor);
            }

            // Remove clone
            document.body.removeChild(clone);

            pdf.save('resume.pdf');
            toast.success('PDF downloaded successfully');
        } catch (error) {
            console.error('Download failed', error);
            toast.error('Failed to generate PDF. check console for details.');
        }
    };

    const handleSave = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo || !userInfo.token) {
                toast.error('Please login to save');
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const payload = {
                templateId,
                ...resumeData
            };
            if (resumeId) {
                payload._id = resumeId;
            }

            const { data } = await axios.post('http://localhost:5000/api/resumes', payload, config);

            toast.success('Resume saved successfully');

            if (!resumeId && data._id) {
                setSearchParams({ template: templateId, id: data._id }, { replace: true });
            }
        } catch (error) {
            toast.error('Failed to save resume');
        }
    };

    // Update Navbar Title and Actions
    useEffect(() => {
        setTitle('Resume Editor');
        setActions(
            <div className="flex items-center gap-3">
                <button
                    onClick={() => window.location.href = '/templates'}
                    title="Change Template"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <FileText size={18} />
                    <span className="hidden sm:inline">Templates</span>
                </button>
                <div className="h-6 w-px bg-slate-700 mx-1"></div>
                <button onClick={handleSave} title="Save Resume" className="p-2 text-slate-300 hover:text-white transition-colors rounded-full hover:bg-slate-800">
                    <Save size={20} />
                </button>
                <button onClick={handleDownload} title="Download PDF" className="p-2 text-slate-300 hover:text-white transition-colors rounded-full hover:bg-slate-800">
                    <Download size={20} />
                </button>
            </div>
        );

        // Cleanup on unmount
        return () => {
            setTitle('ResumeAI');
            setActions(null);
        };
    }, [resumeData]); // Re-run when resumeData changes so handleSave has latest state

    return (
        <div className="h-[calc(100vh-65px)] flex bg-slate-900 overflow-hidden">
            {/* Left Side: Form */}
            <div className="w-1/2 p-4 overflow-y-auto border-r border-slate-700 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 shadow-inner">
                <ResumeForm data={resumeData} updateData={setResumeData} />
            </div>

            {/* Right Side: Preview */}
            <div className="w-1/2 bg-slate-950 overflow-y-auto overflow-x-hidden p-4 flex justify-center items-start relative scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950">
                {/* Visual indicator for A4 sheet */}
                <div className="relative shadow-2xl transition-transform origin-top transform scale-[0.65] my-4">
                    {/* The preview container itself must remain white to represent paper */}
                    <div className="w-[210mm] min-h-[297mm]" ref={previewRef}>
                        <ResumePreview data={resumeData} templateId={templateId} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editor;
