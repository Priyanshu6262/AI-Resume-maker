import { Link, useNavigate } from 'react-router-dom';
import { useNavbar } from '../context/NavbarContext';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, FileText, ChevronDown, Edit, Save, Heart } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const Navbar = () => {
    const { title, actions, dropdownItems } = useNavbar();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.charAt(0).toUpperCase();
    };

    // Close dropdown when clicking outside
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

    return (
        <nav className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
            <div className="container mx-auto px-6 py-2 flex justify-between items-center relative">
                {/* Logo / Home Link */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-opacity z-10">
                        ResumeAI
                    </Link>

                    {/* Main Nav Links - HIDDEN/REMOVED as per request */}
                    {/* <div className="hidden md:flex space-x-6">
                        <Link to="/templates" className="flex items-center gap-2 hover:text-purple-400 transition-colors font-medium">
                            <FileText size={18} /> Templates
                        </Link>
                    </div> */}

                    {/* Global Toolbar Container next to Logo */}
                    <div id="global-quill-toolbar" className={title === 'Resume Editor' ? "ql-toolbar ql-snow flex items-center gap-1 bg-slate-800/80 rounded-lg px-2 py-1 ml-4" : "hidden"}>
                        <select className="ql-font" defaultValue="sans-serif">
                            <option value="sans-serif"></option>
                            <option value="serif"></option>
                            <option value="monospace"></option>
                        </select>
                        <select className="ql-size" defaultValue="14px">
                            <option value="10px"></option>
                            <option value="12px"></option>
                            <option value="14px"></option>
                            <option value="16px"></option>
                            <option value="18px"></option>
                            <option value="20px"></option>
                            <option value="24px"></option>
                            <option value="30px"></option>
                        </select>
                        <div className="w-px h-5 bg-slate-600 mx-1"></div>
                        <select className="ql-color"></select>
                        <div className="w-px h-5 bg-slate-600 mx-1"></div>
                        <button className="ql-bold"></button>
                        <button className="ql-italic"></button>
                        <button className="ql-underline"></button>
                    </div>
                </div>

                {/* Centered Title */}
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
                    {/* Centered Title (Dynamic) - Hide if it is 'ResumeAI' or 'Resume Editor' to avoid duplication/collision */}
                    {title !== 'ResumeAI' && title !== 'Resume Editor' && (
                        <div className="font-semibold text-lg tracking-wide text-center">
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
                                className="flex items-center gap-2 focus:outline-none hover:bg-slate-800 p-2 rounded-lg transition-colors"
                            >
                                {user.avatar ? (
                                    <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-slate-600" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-sm font-bold shadow-md ring-1 ring-slate-700">
                                        {getInitials(user.name)}
                                    </div>
                                )}
                                <span className="text-sm font-medium hidden sm:block max-w-[100px] truncate">
                                    {user.name}
                                </span>
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 text-slate-800 transform origin-top-right transition-all duration-200 border border-slate-200">
                                    <div className="px-4 py-2 border-b border-slate-100 mb-2">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Account</p>
                                        <p className="text-sm font-medium truncate">{user.email}</p>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="flex flex-col">
                                        <Link
                                            to="/profile"
                                            className="px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 text-slate-700 transition-colors"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <Edit size={16} /> Profile Edit
                                        </Link>

                                        <Link
                                            to="/saved-resumes"
                                            className="px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 text-slate-700 transition-colors"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <Save size={16} /> Save Resume
                                        </Link>

                                        <Link
                                            to="/wishlist"
                                            className="px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 text-slate-700 transition-colors"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <Heart size={16} /> Templates Wishlist
                                        </Link>

                                        {/* Dynamic Items from Context (if any remain pertinent) */}
                                        {dropdownItems.map((item, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    item.onClick();
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors"
                                            >
                                                {item.icon}
                                                {item.label}
                                            </button>
                                        ))}

                                        <div className="border-t border-slate-100 mt-2 pt-2">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600 flex items-center gap-2 transition-colors"
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
                            <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                Login
                            </Link>
                            <Link to="/register" className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white rounded-lg transition-opacity">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
