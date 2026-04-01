import { useNavigate } from 'react-router-dom';
import { Heart, PlusCircle, Trash2 } from 'lucide-react';
import { templates } from '../utils/templatesData';
import { useWishlist } from '../hooks/useWishlist';

const Wishlist = () => {
    const navigate = useNavigate();
    const { wishlist, removeFromWishlist } = useWishlist();

    const wishlistedTemplates = templates.filter(t => wishlist.includes(t.id));

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <h2 className="text-4xl font-extrabold mb-12 text-center text-slate-900">
                My Template Wishlist
            </h2>

            {wishlistedTemplates.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-slate-600 pt-10">
                    <Heart className="w-16 h-16 text-slate-300 mb-6" />
                    <p className="text-xl mb-6">Your wishlist is currently empty.</p>
                    <button
                        onClick={() => navigate('/templates')}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold"
                    >
                        <PlusCircle size={20} /> Browse Templates
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto">
                    {wishlistedTemplates.map((template) => (
                        <div key={template.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:border-green-600 group">
                            
                            <div className="h-64 bg-slate-100 mb-5 flex items-center justify-center rounded-lg overflow-hidden relative">
                                {template.image && !template.image.includes('placeholder') ? (
                                    <img src={template.image} alt={template.name} className="w-full h-full object-cover object-top" />
                                ) : (
                                    <span className="text-slate-500 font-medium">Preview: {template.name}</span>
                                )}
                            </div>
                            
                            <div className="flex flex-col gap-4">
                                <span className="font-bold text-xl text-slate-900">{template.name}</span>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => navigate(`/editor?template=${template.id}`)}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg shadow-sm font-semibold flex items-center justify-center gap-2"
                                    >
                                        <PlusCircle size={18} /> Create Resume
                                    </button>
                                    <button
                                        onClick={() => removeFromWishlist(template.id)}
                                        className="flex-none p-2.5 bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-500 rounded-lg shadow-sm"
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
