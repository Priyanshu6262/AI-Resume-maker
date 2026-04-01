import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
    const { login } = useAuth();
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(location.pathname === '/login'); // Default based on route
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isLogin && !agreedToTerms) {
            toast.error("Please agree to the terms & policy.");
            return;
        }

        const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';

        try {
            const { data } = await axios.post(url, formData);
            login(data);
            toast.success(isLogin ? 'Login Successful' : 'Registration Successful');
            navigate('/templates');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans text-slate-800">
            {/* Left Column - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24">
                <div className="max-w-md w-full mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-slate-900 tracking-tight">
                        {isLogin ? 'Welcome Back' : 'Get Started Now'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-bold text-slate-800 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600 shadow-sm placeholder-gray-300"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-bold text-slate-800 mb-2">Email address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600 shadow-sm placeholder-gray-300"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-800 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600 shadow-sm placeholder-gray-300"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {!isLogin && (
                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="w-4 h-4 text-green-600 bg-white border-gray-300 rounded focus:ring-green-600 focus:ring-2 cursor-pointer"
                                />
                                <label htmlFor="terms" className="text-xs font-medium text-slate-800 cursor-pointer">
                                    I agree to the terms & policy
                                </label>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-lg shadow-md text-sm mt-4"
                        >
                            {isLogin ? 'Sign In' : 'Signup'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-8">
                        <div className="flex-1 border-t border-gray-100"></div>
                        <span className="px-4 text-xs font-medium text-gray-500 bg-white">Or</span>
                        <div className="flex-1 border-t border-gray-100"></div>
                    </div>

                    {/* Social Logins */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <button type="button" className="flex-1 flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 rounded-full hover:bg-gray-50 bg-white font-medium text-sm text-slate-700 shadow-sm">
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                <path fill="none" d="M1 1h22v22H1z" />
                            </svg>
                            Sign in with Google
                        </button>
                        <button type="button" className="flex-1 flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 rounded-full hover:bg-gray-50 bg-white font-medium text-sm text-slate-700 shadow-sm">
                            <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16.365 7.172c-.035-.045-1.464-1.748-3.664-1.748-2.553 0-3.9 1.944-4.8 3.522-.843 1.474-3.567 7.098-1.574 10.63.793 1.405 1.902 2.378 2.834 2.378.895 0 1.259-.57 2.65-.57 1.344 0 1.69.574 2.664.57s2.176-1.125 2.854-2.21a9.239 9.239 0 0 0 1.218-2.607S15.655 16 15.61 12.83c-.046-2.54 1.832-3.826 1.832-3.826a5.532 5.532 0 0 0-4.04-2.14m-1.393-5.26c-1.258.077-2.673.882-3.483 1.87-.714.87-1.173 2.05-1 3.167 1.385.053 2.637-.735 3.43-1.688.847-1.008 1.21-2.246 1.053-3.35Z" />
                            </svg>
                            Sign in with Apple
                        </button>
                    </div>

                    {/* Toggle */}
                    <div className="text-center text-sm font-medium text-slate-700">
                        {isLogin ? "Don't have an account? " : "Have an account? "}
                        <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700 focus:outline-none"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Signup' : 'Sign In'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Column - Image */}
            <div className="hidden lg:block lg:w-1/2 relative bg-slate-50">
                <img 
                    src="https://images.unsplash.com/photo-1541334057883-91185012dc72?q=80&w=1200&auto=format&fit=crop" 
                    alt="Monstera Leaves" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Subtle overlay to soften image if strictly necessary, but mockup seems to use a clean bright image */}
                <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
            </div>
        </div>
    );
};

export default AuthPage;
