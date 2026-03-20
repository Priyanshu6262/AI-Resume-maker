import { useNavigate } from 'react-router-dom';
import { Heart, PlusCircle, Trash2 } from 'lucide-react';
import { templates } from '../utils/templatesData';
import { useWishlist } from '../hooks/useWishlist';

const Wishlist = () => {
    const navigate = useNavigate();
    const { wishlist, removeFromWishlist } = useWishlist();

    const wishlistedTemplates = templates.filter(t => wishlist.includes(t.id));

    return (
        <div className="min-h-screen bg-slate-900 p-8">
            <h2 className="text-4xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                My Template Wishlist
            </h2>

            {wishlistedTemplates.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-slate-400 pt-10">
                    <Heart className="w-16 h-16 text-slate-700 mb-6" />
                    <p className="text-xl mb-6">Your wishlist is currently empty.</p>
                    <button
                        onClick={() => navigate('/templates')}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                    >
                        <PlusCircle size={20} /> Browse Templates
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto">
                    {wishlistedTemplates.map((template) => (
                        <div key={template.id} className="bg-slate-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700 hover:border-purple-500 transform hover:-translate-y-2 group">
                            
                            <div className="h-64 bg-slate-700 mb-5 flex items-center justify-center rounded-lg overflow-hidden relative">
                                {template.image && !template.image.includes('placeholder') ? (
                                    <img src={template.image} alt={template.name} className="w-full h-full object-cover object-top" />
                                ) : (
                                    <span className="text-slate-400 font-medium">Preview: {template.name}</span>
                                )}
                            </div>
                            
                            <div className="flex flex-col gap-4">
                                <span className="font-bold text-xl text-white">{template.name}</span>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => navigate(`/editor?template=${template.id}`)}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
                                    >
                                        <PlusCircle size={18} /> Create Resume
                                    </button>
                                    <button
                                        onClick={() => removeFromWishlist(template.id)}
                                        className="flex-none p-2.5 bg-slate-700 hover:bg-slate-600 text-red-500 hover:text-red-400 rounded-lg transition-colors shadow-sm"
                                        title="Remove from Wishlist"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
