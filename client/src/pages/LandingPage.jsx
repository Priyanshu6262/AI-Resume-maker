import { Link } from 'react-router-dom';
import { Play, CheckCircle, Key, ShieldCheck, Download, Star, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-green-200">


            {/* Hero Section */}
            <section className="relative pt-12 pb-20 overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex justify-center items-center gap-3 mb-8">
                        <div className="flex -space-x-3">
                            <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=1" alt="User" />
                            <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=2" alt="User" />
                            <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=3" alt="User" />
                            <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=4" alt="User" />
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="flex text-green-500">
                                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} className="fill-current" />)}
                            </div>
                            <span className="text-xs text-slate-600 font-medium mt-0.5">Used by 10,000+ users</span>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 max-w-4xl mx-auto leading-tight">
                        Land your dream job with <br className="hidden md:block"/>
                        <span className="text-green-600">AI-powered</span> resumes.
                    </h1>
                    
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                        Create, edit and download professional resumes with <br className="hidden md:block"/> AI-powered assistance.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link 
                            to={user ? "/templates" : "/login"} 
                            className="w-full sm:w-auto px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold flex items-center justify-center gap-2"
                        >
                            Get started 
                            <span>→</span>
                        </Link>
                        <button className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-full font-semibold flex items-center justify-center gap-2">
                            <Play size={18} />
                            Try demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Trusted Brands */}
            <section className="py-10 border-t border-slate-100 bg-slate-50/50">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm font-medium text-slate-500 mb-8 tracking-wide">Trusting by leading brands, including</p>
                    <div className="flex flex-wrap justify-center items-center gap-12">
                        <span className="text-xl font-bold font-serif">Instagram</span>
                        <span className="text-xl font-bold font-sans">Framer</span>
                        <span className="text-xl font-bold">Microsoft</span>
                        <span className="text-xl font-bold italic">HUAWEI</span>
                        <span className="text-xl font-bold tracking-tight">Walmart</span>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-6">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        Testimonials
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Don't just take our words</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto mb-16">
                        Hear what our users say about us. We're always looking for ways to improve.
                        If you have a positive experience with us, leave a review.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: "Avery Johnson", handle: "@averywrites", text: "ResumeAI made undercutting all of our competitors an absolute breeze. The AI suggestions are highly relevant." },
                            { name: "Briar Martin", handle: "@neilstellar", text: "I've never had an easier time building a professional resume. Landed my dream job thanks to the clean templates." },
                            { name: "Jordan Lee", handle: "@jordan_dev", text: "The formatting is flawless and the ATS compatibility warning saved me multiple times. Highly recommend to everyone." }
                        ].map((t, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-left">
                                <div className="flex items-center gap-3 mb-4">
                                    <img src={`https://i.pravatar.cc/100?img=${index+10}`} alt={t.name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <div className="flex items-center gap-1 font-bold text-slate-900 text-sm">
                                            {t.name} <CheckCircle size={14} className="text-green-500 fill-green-500/20" />
                                        </div>
                                        <div className="text-xs text-slate-500">{t.handle}</div>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {t.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
