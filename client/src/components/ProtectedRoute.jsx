import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    // While checking the authentication state, return null (or a spinner) to avoid premature redirects.
    if (loading) {
        return null;
    }

    // If not authenticated, redirect to the home page immediately.
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Otherwise, render the protected component.
    return children;
};

export default ProtectedRoute;
