import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TemplateSelection from './pages/TemplateSelection';
import Editor from './pages/Editor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

import { NavbarProvider } from './context/NavbarContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavbarProvider>
          <Toaster position="top-center" />
          <div className="flex flex-col min-h-screen bg-slate-900 text-white">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/templates" element={<TemplateSelection />} />
                <Route path="/editor" element={<Editor />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </NavbarProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
