import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="mb-8 md:mb-0">
                    <h3 className="text-xl font-bold text-white mb-4">ResumeAI</h3>
                    <p className="text-sm">
                        Build professional resumes in minutes with our AI-powered builder.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Product</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/templates" className="hover:text-purple-400 transition-colors">Templates</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors">Examples</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors">Pricing</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Resources</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Connect</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-12 pt-8 border-t border-slate-900 text-center text-sm">
                &copy; {new Date().getFullYear()} ResumeAI. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
