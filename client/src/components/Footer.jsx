import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-50 text-slate-600 py-12 border-t border-slate-200">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="mb-8 md:mb-0">
                    <div className="text-2xl font-extrabold text-slate-900 mb-4 flex items-center">
                        resume<span className="text-green-600">.</span>
                    </div>
                    <p className="text-sm text-slate-500">
                        Build professional resumes in minutes with our AI-powered builder.
                    </p>
                </div>
                <div>
                    <h4 className="text-slate-900 font-bold mb-4">Product</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/templates" className="hover:text-green-600 transition-colors">Templates</a></li>
                        <li><a href="#" className="hover:text-green-600 transition-colors">Examples</a></li>
                        <li><a href="#" className="hover:text-green-600 transition-colors">Pricing</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-slate-900 font-bold mb-4">Resources</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-green-600 transition-colors">Blog</a></li>
                        <li><a href="#" className="hover:text-green-600 transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-green-600 transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-slate-900 font-bold mb-4">Connect</h4>
                    <div className="flex space-x-4 text-slate-400">
                        <a href="#" className="hover:text-green-600 transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-green-600 transition-colors"><Github size={20} /></a>
                        <a href="#" className="hover:text-green-600 transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
                &copy; {new Date().getFullYear()} resume. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
