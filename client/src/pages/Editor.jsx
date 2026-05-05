import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
<<<<<<< HEAD
import { Save, Download, FileText, Upload, Sparkles } from 'lucide-react';
import api from '../utils/api';
=======
import { Save, Download, FileText, Sparkles } from 'lucide-react';
import axios from 'axios';
>>>>>>> e0cd0a3 (Implement Job Fit Resume feature and fix PDF download issue)
import toast from 'react-hot-toast';

import ResumePreview from '../components/ResumePreview';
import ResumeForm from '../components/ResumeForm';
import AIGenerateModal from '../components/AIGenerateModal';
import { useNavbar } from '../context/NavbarContext';

const Editor = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const resumeId = searchParams.get('id');
    const templateId = searchParams.get('template') || 'simple';
    const previewRef = useRef();

    const navigate = useNavigate();
    const { setTitle, setActions } = useNavbar();
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);

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

                    const { data } = await api.get(`/api/resumes/${resumeId}`);
                    
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

    const handleJdDataGenerated = (data) => {
        setResumeData(prev => {
            const parsedSkills = data.skills && data.skills.length > 0 
                ? data.skills.map(skill => (typeof skill === 'object' ? skill.name : skill) || '')
                : prev.skills;

            const parsedProjects = data.projects && data.projects.length > 0
                ? data.projects.map(proj => ({
                    title: proj.name || proj.title || '',
                    description: proj.description || '',
                    link: proj.link || '',
                    sourceLink: proj.sourceLink || ''
                })) : prev.projects;

            const parsedEducation = data.education && data.education.length > 0
                ? data.education.map(edu => ({
                    institution: edu.school || edu.institution || '',
                    degree: edu.degree || '',
                    year: (edu.startDate || '') + (edu.startDate && edu.endDate ? ' - ' : '') + (edu.endDate || edu.year || '')
                })) : prev.education;

            const parsedExperience = data.experience && data.experience.length > 0
                ? data.experience.map(exp => ({
                    company: exp.company || '',
                    role: exp.position || exp.role || '',
                    duration: (exp.startDate || '') + (exp.startDate && exp.endDate ? ' - ' : '') + (exp.endDate || exp.duration || ''),
                    description: exp.description || ''
                })) : prev.experience;

            return {
                personalInfo: { ...prev.personalInfo, ...(data.personalInfo || {}) },
                education: parsedEducation,
                experience: parsedExperience,
                skills: parsedSkills,
                projects: parsedProjects
            };
        });
    };

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
            // Find the page container
            const page = clone.querySelector('.resume-page') || clone;

<<<<<<< HEAD
            // Canvas-based oklch resolver: the 2D canvas API accepts all modern CSS
            // color functions and always stores pixels as rgb, making it the only
            // reliable way to convert oklch → rgb independently of browser/version.
            const colorResolverCanvas = document.createElement('canvas');
            colorResolverCanvas.width = colorResolverCanvas.height = 1;
            const colorResolverCtx = colorResolverCanvas.getContext('2d');

            const resolveColor = (colorStr) => {
                try {
                    colorResolverCtx.clearRect(0, 0, 1, 1);
                    colorResolverCtx.fillStyle = colorStr;
                    colorResolverCtx.fillRect(0, 0, 1, 1);
                    const [r, g, b, a] = colorResolverCtx.getImageData(0, 0, 1, 1).data;
                    return a === 0 ? 'transparent' : `rgb(${r},${g},${b})`;
                } catch {
                    return 'rgb(0,0,0)';
                }
            };

            const patchStyleText = (text) =>
                text.replace(/oklch\([^)]+\)/g, (match) => resolveColor(match));

            const canvas = await html2canvas(page, {
                scale: 2,
                useCORS: true,
                logging: false,
                allowTaint: true,
                backgroundColor: '#ffffff',
                windowWidth: page.scrollWidth,
                windowHeight: page.scrollHeight,
                onclone: (clonedDoc) => {
                    // Patch <style> tags first — this removes oklch from CSS custom properties
                    clonedDoc.querySelectorAll('style').forEach((tag) => {
                        tag.textContent = patchStyleText(tag.textContent);
                    });
                    // Patch remaining oklch in any inline styles
                    Array.from(clonedDoc.getElementsByTagName('*')).forEach((el) => {
                        if (el.style.cssText.includes('oklch')) {
                            el.style.cssText = patchStyleText(el.style.cssText);
                        }
                    });
                },
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.82);
=======
            const imgData = await toPng(page, {
                pixelRatio: 2,
                backgroundColor: '#ffffff',
                width: page.scrollWidth,
                height: page.scrollHeight
            });

>>>>>>> e0cd0a3 (Implement Job Fit Resume feature and fix PDF download issue)
            const pdfWidth = 210; // Fixed A4 width in mm
            // Keep a minimum of standard A4 height, but let it grow endlessly if content needs it
            const pdfHeight = Math.max(297, (page.scrollHeight * pdfWidth) / page.scrollWidth);

            // Create a dynamic PDF that fits the entire infinitely scrolling page
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: [pdfWidth, pdfHeight]
            });

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

            // Add links
            const scaleFactor = pdfWidth / page.offsetWidth;
            const links = page.querySelectorAll('a');
            const pageRect = page.getBoundingClientRect();

            links.forEach(link => {
                const linkRect = link.getBoundingClientRect();
                const x = (linkRect.left - pageRect.left) * scaleFactor;
                const y = (linkRect.top - pageRect.top) * scaleFactor;
                const w = linkRect.width * scaleFactor;
                const h = linkRect.height * scaleFactor;

                if (link.href) {
                    pdf.link(x, y, w, h, { url: link.href });
                }
            });

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
            const payload = { templateId, ...resumeData };
            if (resumeId) payload._id = resumeId;

            const { data } = await api.post('/api/resumes', payload);

            toast.success('Resume saved successfully');

            if (!resumeId && data._id) {
                setSearchParams({ template: templateId, id: data._id }, { replace: true });
            }
        } catch (error) {
            toast.error('Failed to save resume');
        }
    };


<<<<<<< HEAD
        if (file.size > 2 * 1024 * 1024) {
            toast.error('File size exceeds 2MB limit.');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const base64Data = e.target.result.split(',')[1];
                toast.loading("Analyzing and enhancing resume...", { id: 'upload-toast' });
                
                const { data } = await api.post('/api/enhance/upload', {
                    fileData: base64Data,
                    mimeType: file.type
                });

                setResumeData(prev => {
                    const parsedSkills = data.skills && data.skills.length > 0 
                        ? data.skills.map(skill => (typeof skill === 'object' ? skill.name : skill) || '')
                        : prev.skills;

                    const parsedProjects = data.projects && data.projects.length > 0
                        ? data.projects.map(proj => ({
                            title: proj.name || proj.title || '',
                            description: proj.description || '',
                            link: proj.link || '',
                            sourceLink: proj.sourceLink || ''
                        })) : prev.projects;

                    const parsedEducation = data.education && data.education.length > 0
                        ? data.education.map(edu => ({
                            institution: edu.school || edu.institution || '',
                            degree: edu.degree || '',
                            year: (edu.startDate || '') + (edu.startDate && edu.endDate ? ' - ' : '') + (edu.endDate || edu.year || '')
                        })) : prev.education;

                    const parsedExperience = data.experience && data.experience.length > 0
                        ? data.experience.map(exp => ({
                            company: exp.company || '',
                            role: exp.position || exp.role || '',
                            duration: (exp.startDate || '') + (exp.startDate && exp.endDate ? ' - ' : '') + (exp.endDate || exp.duration || ''),
                            description: exp.description || ''
                        })) : prev.experience;

                    return {
                        personalInfo: { ...prev.personalInfo, ...(data.personalInfo || {}) },
                        education: parsedEducation,
                        experience: parsedExperience,
                        skills: parsedSkills,
                        projects: parsedProjects
                    };
                });

                toast.success("Resume data automatically filled and enhanced!", { id: 'upload-toast' });
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message || "Failed to parse resume.", { id: 'upload-toast' });
            } finally {
                if (fileInputRef.current) fileInputRef.current.value = '';
            }
        };
        reader.readAsDataURL(file);
    };
=======
>>>>>>> e0cd0a3 (Implement Job Fit Resume feature and fix PDF download issue)

    // Update Navbar Title and Actions
    useEffect(() => {
        setTitle('Resume Editor');
        setActions(
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setIsAiModalOpen(true)}
                    title="Generate from Job Description"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-green-600 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200"
                >
                    <Sparkles size={16} />
                    <span className="hidden sm:inline">Job Fit Resume</span>
                </button>
                <div className="h-6 w-px bg-slate-300 mx-1"></div>

                

                <button onClick={handleSave} title="Save Resume" className="p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-200">
                    <Save size={20} />
                </button>
                <button onClick={handleDownload} title="Download PDF" className="p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-200">
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
        <div className="h-[calc(100vh-65px)] flex bg-slate-50 overflow-hidden">
            {/* Left Side: Form */}
            <div className="w-1/2 p-4 overflow-y-auto border-r border-slate-200 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-50 shadow-inner">
                <ResumeForm data={resumeData} updateData={setResumeData} />
            </div>

            {/* Right Side: Preview */}
            <div className="w-1/2 bg-slate-200/50 overflow-y-auto overflow-x-hidden p-8 flex justify-center items-start relative scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-200/50">
                {/* Visual indicator for A4 sheet */}
                <div className="relative shadow-2xl transition-transform origin-top transform scale-[0.80] my-4">
                    {/* The preview container itself must remain white to represent paper */}
                    <div className="w-[210mm] min-h-[297mm]" ref={previewRef}>
                        <ResumePreview data={resumeData} templateId={templateId} />
                    </div>
                </div>
            </div>
            <AIGenerateModal 
                isOpen={isAiModalOpen} 
                onClose={() => setIsAiModalOpen(false)} 
                onGenerate={handleJdDataGenerated} 
            />
        </div>
    );
};

export default Editor;
