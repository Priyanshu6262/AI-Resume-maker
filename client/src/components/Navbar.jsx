import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useNavbar } from '../context/NavbarContext';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, FileText, ChevronDown, Edit, Save, Heart, Upload, Bold, Italic, Underline, Palette } from 'lucide-react';
import { globalActiveQuill } from './RichTextEditor';
import toast from 'react-hot-toast';
import { useState, useRef, useEffect } from 'react';

const Navbar = () => {
    const { title, actions, dropdownItems } = useNavbar();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeFormats, setActiveFormats] = useState({});
    const dropdownRef = useRef(null);

    const isLandingPage = location.pathname === '/';

    useEffect(() => {
        let interval;
        if (title === 'Resume Editor') {
            interval = setInterval(() => {
                if (globalActiveQuill) {
                    if (globalActiveQuill.hasFocus()) {
                        const fmt = globalActiveQuill.getFormat();
                        setActiveFormats(prev => JSON.stringify(prev) === JSON.stringify(fmt) ? prev : fmt);
                    } else {
                        // Clear visually if the editor loses focus completely
                        setActiveFormats(prev => Object.keys(prev).length === 0 ? prev : {});
                    }
                }
            }, 200);
        }
        return () => clearInterval(interval);
    }, [title]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.charAt(0).toUpperCase();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Helper for active link styles
    const getLinkStyle = (path, hash) => {
        const isActive = hash 
            ? location.pathname === '/' && location.hash === hash 
            : location.pathname === path && !location.hash;
        
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

                    {/* Navigation Links (Visible on Landing Page OR if user is logged in) */}
                    {(isLandingPage || user) && (
                        <div className="hidden md:flex items-center gap-8 text-sm pt-1">
                            <Link to="/" className={getLinkStyle('/', '')}>Home</Link>
                            <Link to="/about" className={getLinkStyle('/about', '')}>About</Link>
                            <Link to="/templates" className={getLinkStyle('/templates', '')}>Templates</Link>
                            <Link to="/features" className={getLinkStyle('/features', '')}>Features</Link>
                        </div>
                    )}

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
                    {!isLandingPage && title !== 'ResumeAI' && title !== 'Resume Editor' && (
                        <div className="font-semibold text-lg tracking-wide text-center text-slate-800">
                            {title}
                        </div>
                    )}
                </div>

                {/* Right Side: Profile / Actions */}
                <div className="flex items-center gap-4 z-10">
                    {/* Existing Actions */}
                    {actions && (
                        <div className="flex items-center gap-4">
                            {actions}
                        </div>
                    )}

                    {/* Profile Section */}
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 focus:outline-none p-2 rounded-lg hover:bg-gray-100 text-slate-800"
                            >
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full object-cover border border-gray-200 shadow-sm"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                <div
                                    className="w-8 h-8 rounded-full bg-green-600 items-center justify-center text-sm font-bold shadow-md text-white"
                                    style={{ display: user.avatar ? 'none' : 'flex' }}
                                >
                                    {getInitials(user.name)}
                                </div>
                                <span className="text-sm font-medium hidden sm:block max-w-[100px] truncate text-slate-800">
                                    {user.name}
                                </span>
                                <ChevronDown size={14} className={`text-slate-500 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 text-slate-800 border border-gray-100">
                                    <div className="px-4 py-3 border-b border-gray-100 mb-2 flex items-center gap-3">
                                        {/* Mini avatar in dropdown header */}
                                        {user.avatar ? (
                                            <img src={user.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-base font-bold text-white shrink-0">
                                                {getInitials(user.name)}
                                            </div>
                                        )}
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold truncate">{user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            {!user.avatar && (
                                                <Link
                                                    to="/profile"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                    className="text-[11px] text-green-600 hover:text-green-700 font-medium flex items-center gap-0.5 mt-0.5"
                                                >
                                                    <Upload size={10} /> Add profile photo
                                                </Link>
                                            )}
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="flex flex-col">
                                        <Link
                                            to="/profile"
                                            className="px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-slate-700"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <Edit size={16} className="text-green-600" /> Profile Edit
                                        </Link>

                                        <Link
                                            to="/saved-resumes"
                                            className="px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-slate-700"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <Save size={16} className="text-green-600" /> Save Resume
                                        </Link>

                                        <Link
                                            to="/wishlist"
                                            className="px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-slate-700"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <Heart size={16} className="text-green-600" /> Templates Wishlist
                                        </Link>

                                        {dropdownItems.map((item, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    item.onClick();
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-slate-700 hover:text-green-600"
                                            >
                                                {item.icon}
                                                {item.label}
                                            </button>
                                        ))}

                                        <div className="border-t border-gray-100 mt-2 pt-2">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                                            >
                                                <LogOut size={16} /> Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="px-5 py-2 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white rounded-full shadow-sm order-2 sm:order-1">
                                Get started
                            </Link>
                            <Link to="/login" className="px-5 py-2 text-sm font-semibold border border-gray-200 hover:border-gray-300 text-slate-700 rounded-full bg-white hover:bg-gray-50 order-1 sm:order-2">
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
