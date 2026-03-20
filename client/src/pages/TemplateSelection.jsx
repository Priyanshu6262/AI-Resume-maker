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
        <div className="min-h-screen bg-slate-900 p-8">
            <h2 className="text-4xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Choose Your Template
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto">
                {templates.map((template) => (
                    <div key={template.id} className="relative bg-slate-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700 hover:border-purple-500 transform hover:-translate-y-2 group">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleWishlist(template.id);
                            }}
                            className="absolute top-8 right-8 z-10 p-2.5 bg-slate-900/40 hover:bg-slate-900/80 rounded-full backdrop-blur-md transition-all shadow-sm group-hover:scale-110"
                            title={wishlist.includes(template.id) ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            <Heart 
                                className={`w-6 h-6 transition-colors duration-300 ${wishlist.includes(template.id) ? 'fill-red-500 text-red-500' : 'text-white/80 hover:text-red-400'}`} 
                            />
                        </button>
                        <div className="h-64 bg-slate-700 mb-5 flex items-center justify-center rounded-lg overflow-hidden group-hover:opacity-90 transition-opacity relative">
                            {/* Render image if available */}
                            {template.image && !template.image.includes('placeholder') ? (
                                <img src={template.image} alt={template.name} className="w-full h-full object-cover object-top" />
                            ) : (
                                <span className="text-slate-400 font-medium group-hover:text-white transition-colors">Preview: {template.name}</span>
                            )}
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-xl text-white">{template.name}</span>
                            <div className="space-x-3 flex">
                                <button 
                                    onClick={() => setPreviewImage(template.image)}
                                    className="text-slate-400 hover:text-white font-medium transition-colors"
                                >
                                    Preview
                                </button>
                                <button
                                    onClick={() => handleSelect(template.id)}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all font-semibold"
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
                            className="absolute -top-12 -right-2 md:-right-12 text-slate-300 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
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
