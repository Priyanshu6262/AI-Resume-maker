import React from 'react';
import { Key, ShieldCheck, Download, Edit3, LayoutTemplate, Cloud, Sparkles, Layout } from 'lucide-react';

const FeaturesPage = () => {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-green-200">
            {/* Hero Section */}
            <section className="pt-16 pb-20 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-green-400/10 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-6">
                        Complete Feature Set
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                        Everything you need to <span className="text-green-600">stand out.</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Resume.ai provides an end-to-end toolkit for building, managing, and perfecting your professional presence. From AI generation to pixel-perfect exports, we have you covered.
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        
                        {/* Feature 1 */}
                        <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
                            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Sparkles size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">AI Content Generation</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Provide a Job Description, and our AI will rewrite your summary and professional experience bullet points to perfectly match what recruiters are looking for.
                            </p>
                        </div>



                        {/* Feature 3 */}
                        <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
                            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <LayoutTemplate size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Targeted Templates</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Access an exclusive library of 15+ templates tailored to specific careers like Software Developer, Data Analyst, HR, Sales, and general roles.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
                            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Edit3 size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Rich Text Toolbar</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Fully customize every section with our dedicated Rich Text toolbar. Adjust fonts, font sizes, colors, and apply bold/italic stylings exactly where needed.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
                            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Layout size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time A4 Preview</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Edit your details on the left and see the exact, pixel-perfect physical layout update live on the right. What you see is precisely what prints.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
                            <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Cloud size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Cloud Saves & Wishlist</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Securely save your drafts to the cloud so you can edit anywhere. Add your favorite templates to a wishlist for quick access later.
                            </p>
                        </div>

                        {/* Feature 7 */}
                        <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group lg:col-span-3 lg:w-2/3 mx-auto flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                            <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <Download size={40} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">High-Fidelity PDF Export</h3>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Our custom rendering engine exports your resume into a flawless, ATS-friendly PDF. Links are clickable, text is searchable, and the design remains perfectly intact.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default FeaturesPage;
