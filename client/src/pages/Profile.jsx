import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, ArrowLeft, Save, Camera, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const avatarInputRef = useRef(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');       // current saved avatar (url or base64)
    const [avatarPreview, setAvatarPreview] = useState(''); // local preview before save
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            setName(user.name || '');
            setEmail(user.email || '');
            setAvatar(user.avatar || '');
            setAvatarPreview(user.avatar || '');
        }
    }, [navigate, user]);

    // Convert selected/dropped file to base64 and preview it
    const processImageFile = (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file (JPG, PNG, GIF, WebP)');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Image must be smaller than 2 MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target.result;
            setAvatar(base64);       // will be sent to server on submit
            setAvatarPreview(base64); // shown immediately in UI
        };
        reader.readAsDataURL(file);
    };

    const handleAvatarFileChange = (e) => {
        processImageFile(e.target.files[0]);
        // Reset so the same file can be re-selected
        e.target.value = '';
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        processImageFile(e.dataTransfer.files[0]);
    };

    const handleRemoveAvatar = () => {
        setAvatar('');
        setAvatarPreview('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password && password !== confirmPassword) {
            return toast.error('Passwords do not match');
        }

        try {
            setLoading(true);

            const { data } = await api.put('/api/auth/profile', {
                name,
                avatar,   // base64 string or empty string
                password,
            });

            // Update AuthContext + localStorage → Navbar re-renders with new avatar
            login(data);
            toast.success('Profile updated successfully');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const initials = name ? name.charAt(0).toUpperCase() : 'U';

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6 flex items-center justify-center">
            <div className="max-w-xl w-full">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 font-medium"
                >
                    <ArrowLeft size={18} /> Back
                </button>

                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">

                    {/* ── Avatar Upload Section ── */}
                    <div className="flex flex-col items-center mb-8">
                        {/* Clickable avatar with camera overlay */}
                        <div
                            className={`relative group cursor-pointer mb-3 ${isDragOver ? 'ring-4 ring-green-400 ring-offset-2 rounded-full' : ''}`}
                            onClick={() => avatarInputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                            onDragLeave={() => setIsDragOver(false)}
                            onDrop={handleDrop}
                            title="Click or drag & drop to change photo"
                        >
                            {avatarPreview ? (
                                <img
                                    src={avatarPreview}
                                    alt="Profile"
                                    className="w-28 h-28 rounded-full object-cover border-4 border-slate-200 shadow-md"
                                />
                            ) : (
                                <div className="w-28 h-28 rounded-full bg-green-600 flex items-center justify-center text-4xl font-bold text-white shadow-md border-4 border-white">
                                    {initials}
                                </div>
                            )}

                            {/* Camera overlay on hover */}
                            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera size={24} className="text-white" />
                            </div>
                        </div>

                        {/* Hidden file input */}
                        <input
                            ref={avatarInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            className="hidden"
                            onChange={handleAvatarFileChange}
                        />

                        <div className="flex items-center gap-3 mt-1">
                            <button
                                type="button"
                                onClick={() => avatarInputRef.current?.click()}
                                className="text-xs font-semibold text-green-600 hover:text-green-700 border border-green-200 hover:border-green-400 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-full transition-colors"
                            >
                                Upload photo
                            </button>
                            {avatarPreview && (
                                <button
                                    type="button"
                                    onClick={handleRemoveAvatar}
                                    className="text-xs font-semibold text-red-500 hover:text-red-600 border border-red-200 hover:border-red-400 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
                                >
                                    <Trash2 size={11} /> Remove
                                </button>
                            )}
                        </div>

                        <p className="text-[11px] text-slate-400 mt-2">JPG, PNG, GIF or WebP · Max 2 MB</p>

                        <div className="mt-4 text-center">
                            <h2 className="text-2xl font-extrabold text-slate-900">Edit Profile</h2>
                            <p className="text-slate-500 mt-1 text-sm">Update your account settings</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 ml-1">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-green-600" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>

                        {/* Email (read-only) */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 ml-1 flex justify-between">
                                Email Address
                                <span className="text-[10px] text-slate-500 italic mt-0.5">Read only</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    disabled
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Change Password */}
                        <div className="border-t border-slate-200 pt-5 mt-2">
                            <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4 ml-1">Change Password</h3>
                            <div className="space-y-4">
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-green-600" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
                                        placeholder="New Password (leave blank to keep current)"
                                    />
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-green-600" />
                                    </div>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
                                        placeholder="Confirm New Password"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-white font-bold text-lg mt-6 transition-colors ${
                                loading ? 'bg-slate-400 opacity-70 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                            }`}
                        >
                            <Save size={20} />
                            {loading ? 'Saving Changes...' : 'Save Profile'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
