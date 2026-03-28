import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    
    // If not authenticated, redirect to the login page immediately.
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise, render the protected component.
    return children;
};

export default ProtectedRoute;
