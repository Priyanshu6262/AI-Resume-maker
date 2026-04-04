import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import AuthPage from './pages/AuthPage';
import TemplateSelection from './pages/TemplateSelection';
import Editor from './pages/Editor';
import SavedResumes from './pages/SavedResumes';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

import { NavbarProvider } from './context/NavbarContext';
import { AuthProvider } from './context/AuthContext';

// This component handles the requirement to redirect to Home on every page reload/initial load.
const InitialRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, []); // Run only once on initial mount (reload)

  return null;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavbarProvider>
          <InitialRedirect />
          <Toaster position="top-center" />
          <div className="flex flex-col min-h-screen bg-slate-900 text-white">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<AuthPage />} />
                <Route path="/templates" element={<ProtectedRoute><TemplateSelection /></ProtectedRoute>} />
                <Route path="/editor" element={<ProtectedRoute><Editor /></ProtectedRoute>} />
                <Route path="/saved-resumes" element={<ProtectedRoute><SavedResumes /></ProtectedRoute>} />
                <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
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
