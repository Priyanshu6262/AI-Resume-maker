import React from 'react';
import { CheckCircle, Zap, Shield, Sparkles, TrendingUp, Target } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-green-200 pt-16">
            
            {/* Section 1: About Resume.ai */}
            <section className="py-24 bg-white border-b border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                                Revolutionizing the way you build your <span className="text-green-600">career.</span>
                            </h1>
                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                Resume.ai is more than just a resume builder. It is an intelligent career assistant designed to help professionals at all levels craft compelling, ATS-optimized resumes that stand out in today's highly competitive job market.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                By combining cutting-edge artificial intelligence with beautiful, industry-standard design templates, we eliminate the guesswork and stress from resume writing. Our mission is to empower you to present your best professional self and land your dream job with confidence.
                            </p>
                        </div>
                        <div className="w-full lg:w-1/2 relative group">
                            {/* Abstract decorative elements */}
                            <div className="absolute inset-0 bg-green-500/10 rounded-3xl transform rotate-3 scale-105 blur-lg transition-transform group-hover:rotate-6 duration-500"></div>
                            <img 
                                src="/about_resume_ai.png" 
                                alt="Modern Workspace with Resume" 
                                className="relative rounded-3xl shadow-2xl border border-slate-200/50 w-full object-cover aspect-[4/3] transition-transform duration-500 group-hover:-translate-y-2"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Advantages / Benefits */}
            <section className="py-24 bg-slate-50 border-b border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
                            Why Choose Us
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Resume.ai Advantage</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Experience a seamless, powerful, and intelligent way to accelerate your career growth.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Lightning Fast</h3>
                            <p className="text-slate-600 leading-relaxed">Create a professional, ready-to-send resume in minutes, not hours. Our streamlined editor keeps you completely focused on what matters.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                                <Target size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">ATS-Optimized</h3>
                            <p className="text-slate-600 leading-relaxed">Our templates are strictly validated to pass modern Applicant Tracking Systems so your application actually reaches human eyes.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                                <Sparkles size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">AI Content Enhancement</h3>
                            <p className="text-slate-600 leading-relaxed">Stuck on words? Our AI turns simple bullet points into impactful, action-driven achievements tailored entirely to your role.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                                <TrendingUp size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Higher Call-back Rates</h3>
                            <p className="text-slate-600 leading-relaxed">Users report significantly higher interview request rates after switching to our professionally crafted designs and content formatting.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Secure & Private</h3>
                            <p className="text-slate-600 leading-relaxed">Your career data is yours. We use enterprise-grade security to ensure your personal information is stored safely and never sold.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                                <CheckCircle size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Premium Export</h3>
                            <p className="text-slate-600 leading-relaxed">Export your final resume as a high-fidelity PDF instantly, with links embedded and perfect pixel scaling across all devices.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: How it Works */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2 relative group">
                            <div className="absolute inset-0 bg-blue-500/5 rounded-3xl transform -rotate-2 scale-105 blur-xl transition-transform group-hover:-rotate-4 duration-500"></div>
                           <img 
                                src="/how_it_works.png" 
                                alt="How the AI magic works" 
                                className="relative rounded-3xl shadow-xl border border-slate-200/50 w-full object-cover aspect-[4/3] transition-transform duration-500 group-hover:-translate-y-2"
                            />
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                                The Process
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                                How Resume.ai works its magic
                            </h2>

                            <div className="space-y-10">
                                <div className="flex gap-5">
                                    <div className="flex-shrink-0 w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-md transform -rotate-3">1</div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-2">Upload or Start Fresh</h4>
                                        <p className="text-slate-600 leading-relaxed">Upload your old resume to have it automatically parsed and mapped into our system, or start entirely from scratch using our rich text editor.</p>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="flex-shrink-0 w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-md transform rotate-3">2</div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-2">AI-Powered Iteration</h4>
                                        <p className="text-slate-600 leading-relaxed">Input a target job description and let the AI generate a tailored summary, refine your bullet points, and highlight relevant skills. Watch your resume evolve in real-time.</p>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="flex-shrink-0 w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-md transform -rotate-6">3</div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-2">Preview & Export</h4>
                                        <p className="text-slate-600 leading-relaxed">Toggle between our curated templates with a single click. When you're satisfied, download your pixel-perfect PDF securely and send it off!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
