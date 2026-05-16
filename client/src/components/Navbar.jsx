import { Link, useLocation } from 'react-router-dom';
import { useNavbar } from '../context/NavbarContext';
import { Bold, Italic, Underline, Palette } from 'lucide-react';
import { globalActiveQuill } from './RichTextEditor';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const { title, actions } = useNavbar();
    const location = useLocation();
    const [activeFormats, setActiveFormats] = useState({});

    useEffect(() => {
        let interval;
        if (title === 'Resume Editor') {
            interval = setInterval(() => {
                if (globalActiveQuill) {
                    if (globalActiveQuill.hasFocus()) {
                        const fmt = globalActiveQuill.getFormat();
                        setActiveFormats(prev => JSON.stringify(prev) === JSON.stringify(fmt) ? prev : fmt);
                    } else {
                        setActiveFormats(prev => Object.keys(prev).length === 0 ? prev : {});
                    }
                }
            }, 200);
        }
        return () => clearInterval(interval);
    }, [title]);

    // Helper for active link styles
    const getLinkStyle = (path) => {
        const isActive = location.pathname === path;
        return isActive
            ? 'text-green-600 font-bold border-b-2 border-green-600 pb-1'
            : 'text-slate-600 hover:text-green-600 font-medium pb-1 border-b-2 border-transparent hover:border-green-600/30';
    };

    return (
        <nav className="bg-white border-b border-gray-100 text-slate-800 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">

                {/* Logo / Home Link */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-2xl font-extrabold text-slate-900 hover:opacity-80 z-10 flex items-center">
                        resume<span className="text-green-600">.ai</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8 text-sm pt-1">
                        <Link to="/" className={getLinkStyle('/')}>Home</Link>
                        <Link to="/about" className={getLinkStyle('/about')}>About</Link>
                        <Link to="/templates" className={getLinkStyle('/templates')}>Templates</Link>
                        <Link to="/features" className={getLinkStyle('/features')}>Features</Link>
                    </div>

                    {/* Global Toolbar Container */}
                    <div
                        id="custom-global-toolbar"
                        onMouseDown={(e) => e.preventDefault()}
                        className={title === 'Resume Editor' ? "flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 ml-4 shadow-sm" : "hidden"}
                    >
                        {/* Native color picker masked behind an icon */}
                        <label className={`relative flex items-center justify-center p-1.5 rounded cursor-pointer group transition-colors ${activeFormats.color ? 'bg-green-100 text-green-700' : 'hover:bg-slate-200 text-slate-600 hover:text-green-600'}`} title="Text Color">
                            <Palette size={16} className={activeFormats.color ? "" : "group-hover:text-green-600"} />
                            <input
                                type="color"
                                className="absolute opacity-0 w-0 h-0"
                                onChange={(e) => {
                                    if (globalActiveQuill) {
                                        globalActiveQuill.format('color', e.target.value);
                                        setActiveFormats(globalActiveQuill.getFormat());
                                    }
                                }}
                            />
                        </label>
                        <div className="w-px h-5 bg-gray-300 mx-1"></div>
                        <button
                            type="button"
                            title="Bold"
                            onClick={() => {
                                if (globalActiveQuill) {
                                    const fmt = globalActiveQuill.getFormat();
                                    globalActiveQuill.format('bold', !fmt['bold']);
                                    setActiveFormats(globalActiveQuill.getFormat());
                                }
                            }}
                            className={`p-1.5 rounded transition-colors ${activeFormats.bold ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'hover:bg-slate-200 text-slate-600 hover:text-green-600'}`}
                        >
                            <Bold size={16} />
                        </button>
                        <button
                            type="button"
                            title="Italic"
                            onClick={() => {
                                if (globalActiveQuill) {
                                    const fmt = globalActiveQuill.getFormat();
                                    globalActiveQuill.format('italic', !fmt['italic']);
                                    setActiveFormats(globalActiveQuill.getFormat());
                                }
                            }}
                            className={`p-1.5 rounded transition-colors ${activeFormats.italic ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'hover:bg-slate-200 text-slate-600 hover:text-green-600'}`}
                        >
                            <Italic size={16} />
                        </button>
                        <button
                            type="button"
                            title="Underline"
                            onClick={() => {
                                if (globalActiveQuill) {
                                    const fmt = globalActiveQuill.getFormat();
                                    globalActiveQuill.format('underline', !fmt['underline']);
                                    setActiveFormats(globalActiveQuill.getFormat());
                                }
                            }}
                            className={`p-1.5 rounded transition-colors ${activeFormats.underline ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'hover:bg-slate-200 text-slate-600 hover:text-green-600'}`}
                        >
                            <Underline size={16} />
                        </button>
                    </div>
                </div>

                {/* Centered Title -> only on internal pages */}
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden xl:block z-0">
                    {location.pathname !== '/' && title !== 'ResumeAI' && title !== 'Resume Editor' && (
                        <div className="font-semibold text-lg tracking-wide text-center text-slate-800">
                            {title}
                        </div>
                    )}
                </div>

                {/* Right Side: Actions */}
                <div className="flex items-center gap-4 z-10">
                    {actions && (
                        <div className="flex items-center gap-4">
                            {actions}
                        </div>
                    )}

                    {/* CTA Button */}
                    <Link
                        to="/templates"
                        className="px-5 py-2 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white rounded-full shadow-sm transition-colors"
                    >
                        Create Resume
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
