import React from 'react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-green-200 pt-16">
            <section className="py-24 bg-slate-50 border-b border-slate-200">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
                            How it works
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">About the Project</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Our platform helps you build the perfect resume by streamlining the process into three simple steps.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">1</div>
                            <h3 className="font-bold text-slate-900 mb-3">Template Selection</h3>
                            <p className="text-slate-600 text-sm">Select from our growing library of ATS-friendly templates specifically designed by HR professionals to pass screening bots.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">2</div>
                            <h3 className="font-bold text-slate-900 mb-3">AI Completion</h3>
                            <p className="text-slate-600 text-sm">Enter your raw experience details and let our AI engine instantly enhance your content, matching it to your target Job Description.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">3</div>
                            <h3 className="font-bold text-slate-900 mb-3">Export & Manage</h3>
                            <p className="text-slate-600 text-sm">Download your polished resume as a high-quality PDF in seconds, or save it to your wishlist to easily edit and reuse later.</p>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-10 text-center text-white mt-12 shadow-xl border border-slate-800">
                        <h3 className="text-2xl font-bold mb-4">Contact Details</h3>
                        <p className="mb-8 text-slate-300">Have questions, feedback, or need support? We're here to help.</p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
                            <a href="mailto:support@resumeai.com" className="flex items-center gap-3 hover:text-green-400 transition-colors">
                                <div className="p-3 bg-slate-800 rounded-xl text-green-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
                                <span>support@resumeai.com</span>
                            </a>
                            <a href="tel:1800RESUME" className="flex items-center gap-3 hover:text-green-400 transition-colors">
                                <div className="p-3 bg-slate-800 rounded-xl text-green-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></div>
                                <span>1-800-RESUME</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
