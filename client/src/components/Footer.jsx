import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#3c5a38] text-green-100 py-12 border-t border-[#2e452a]">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="mb-8 md:mb-0">
                    <div className="text-2xl font-extrabold text-white mb-4 flex items-center">
                        resume<span className="text-green-300">.</span>
                    </div>
                    <p className="text-sm text-green-50">
                        Build professional resumes in minutes with our AI-powered builder.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Product</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/templates" className="hover:text-white transition-colors">Templates</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Examples</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Resources</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Connect</h4>
                    <div className="flex space-x-4 text-green-50">
                        <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-12 pt-8 border-t border-[#466a41] text-center text-sm text-green-100">
                &copy; {new Date().getFullYear()} resume. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
