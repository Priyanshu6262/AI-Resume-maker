import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Link as LinkIcon, ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, login } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            setName(user.name || '');
            setEmail(user.email || '');
            setAvatar(user.avatar || '');
        }
    }, [navigate, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password && password !== confirmPassword) {
            return toast.error('Passwords do not match');
        }

        try {
            setLoading(true);
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put(
                'http://localhost:5000/api/users/profile',
                { name, avatar, password },
                config
            );

            // Update AuthContext and LocalStorage seamlessly
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

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6 flex items-center justify-center relative overflow-hidden">
            <div className="max-w-xl w-full relative z-10">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 font-medium"
                >
                    <ArrowLeft size={18} /> Back
                </button>

                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                    <div className="text-center mb-8">
                        <div className="mb-4 inline-block">
                            {avatar ? (
                                <img src={avatar} alt="Profile Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-slate-200 shadow-sm mx-auto" />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-green-600 flex items-center justify-center text-3xl font-bold text-white shadow-sm ring-4 ring-white mx-auto">
                                    {name ? name.charAt(0).toUpperCase() : 'U'}
                                </div>
                            )}
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900">
                            Edit Profile
                        </h2>
                        <p className="text-slate-600 mt-2 text-sm">Update your account settings here.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
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

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 ml-1">Avatar Image URL (Optional)</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LinkIcon className="h-5 w-5 text-slate-400 group-focus-within:text-green-600" />
                                </div>
                                <input
                                    type="url"
                                    value={avatar}
                                    onChange={(e) => setAvatar(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
                                    placeholder="https://example.com/your-image.png"
                                />
                            </div>
                        </div>

                        <div className="border-t border-slate-200 pt-6 mt-6">
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
                            className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-white font-bold text-lg cursor-pointer mt-8 transition-none ${
                                loading ? 'bg-slate-400 opacity-70' : 'bg-green-600 hover:bg-green-700'
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
