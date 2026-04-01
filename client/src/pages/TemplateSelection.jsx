import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Heart } from 'lucide-react';
import { templates } from '../utils/templatesData';
import { useWishlist } from '../hooks/useWishlist';

const TemplateSelection = () => {
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);
    const { wishlist, toggleWishlist } = useWishlist();

    const handleSelect = (templateId) => {
        navigate(`/editor?template=${templateId}`);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <h2 className="text-4xl font-extrabold mb-12 text-center text-slate-900">
                Choose Your Template
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto">
                {templates.map((template) => (
                    <div key={template.id} className="relative bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:border-green-600 group">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleWishlist(template.id);
                            }}
                            className="absolute top-8 right-8 z-10 p-2.5 bg-white/80 hover:bg-white rounded-full backdrop-blur-md shadow-sm border border-slate-200"
                            title={wishlist.includes(template.id) ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            <Heart 
                                className={`w-6 h-6 ${wishlist.includes(template.id) ? 'fill-red-500 text-red-500' : 'text-slate-400 hover:text-red-400'}`} 
                            />
                        </button>
                        <div className="h-64 bg-slate-100 mb-5 flex items-center justify-center rounded-lg overflow-hidden relative">
                            {/* Render image if available */}
                            {template.image && !template.image.includes('placeholder') ? (
                                <img src={template.image} alt={template.name} className="w-full h-full object-cover object-top" />
                            ) : (
                                <span className="text-slate-500 font-medium">Preview: {template.name}</span>
                            )}
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-xl text-slate-900">{template.name}</span>
                            <div className="space-x-3 flex">
                                <button 
                                    onClick={() => setPreviewImage(template.image)}
                                    className="text-slate-600 hover:text-slate-900 font-medium"
                                >
                                    Preview
                                </button>
                                <button
                                    onClick={() => handleSelect(template.id)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-semibold"
                                >
                                    Use Template
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Full Screen Image Preview Modal */}
            {previewImage && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 cursor-zoom-out"
                    onClick={() => setPreviewImage(null)}
                >
                    <div 
                        className="relative max-w-5xl w-full max-h-[95vh] flex flex-col items-center cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setPreviewImage(null)}
                            className="absolute -top-12 -right-2 md:-right-12 text-white hover:bg-white/20 p-2 rounded-full"
                        >
                            <X size={32} />
                        </button>
                        <div className="w-full max-h-[90vh] overflow-y-auto no-scrollbar rounded-xl flex justify-center">
                            <img 
                                src={previewImage} 
                                alt="Template Full Preview" 
                                className="w-full max-w-[210mm] h-auto object-contain shadow-2xl ring-1 ring-white/10 bg-white"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TemplateSelection;
