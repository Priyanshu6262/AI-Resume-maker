import React from 'react';
import { Key, ShieldCheck, Download } from 'lucide-react';

const FeaturesPage = () => {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-green-200 pt-16">
            <section className="py-24 bg-white border-b border-slate-200">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
                            Core Features
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why choose our project?</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Our resume builder comes packed with exclusive features to help you stand out.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-100 rounded-3xl -z-10 translate-x-4 translate-y-4"></div>
                            <img 
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                alt="People working" 
                                className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
                            />
                        </div>
                        <div className="space-y-8">
                            <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex items-start gap-4">
                                <div className="mt-1 bg-green-100 p-2 rounded-lg text-green-600">
                                    <Key size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Tailored AI Generation</h3>
                                    <p className="text-slate-600 text-sm">
                                        Input a job description and our built-in AI will automatically generate perfectly customized professional summaries and bullet point descriptions.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="p-6 flex items-start gap-4 border border-slate-100 rounded-2xl bg-white shadow-sm">
                                <div className="mt-1 bg-slate-100 p-2 rounded-lg text-slate-600">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Job-Specific Templates</h3>
                                    <p className="text-slate-600 text-sm">
                                        Access beautifully crafted design templates built specifically for roles like Software Developer, Data Analyst, HR, and Sales.
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 flex items-start gap-4 border border-slate-100 rounded-2xl bg-white shadow-sm">
                                <div className="mt-1 bg-slate-100 p-2 rounded-lg text-slate-600">
                                    <Download size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">High-Fidelity PDF Export</h3>
                                    <p className="text-slate-600 text-sm">
                                        Instantly export your final resume to a perfectly formatted PDF that seamlessly passes standard corporate Applicant Tracking Systems (ATS).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FeaturesPage;
