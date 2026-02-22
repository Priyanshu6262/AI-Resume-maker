import { useNavigate } from 'react-router-dom';

const TemplateSelection = () => {
    const navigate = useNavigate();

    const templates = [
        { id: 'simple', name: 'Simple', image: '/templates/simple-preview.png' },
        { id: 'modern', name: 'Modern', image: 'https://via.placeholder.com/150' },
        { id: 'professional', name: 'Professional', image: 'https://via.placeholder.com/150' },
        { id: 'latex', name: 'Academic (LaTeX)', image: 'https://via.placeholder.com/150' },
    ];

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
                    <div key={template.id} className="bg-slate-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700 hover:border-purple-500 transform hover:-translate-y-2 group">
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
                                <button className="text-slate-400 hover:text-white font-medium transition-colors">Preview</button>
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
        </div>
    );
};

export default TemplateSelection;
